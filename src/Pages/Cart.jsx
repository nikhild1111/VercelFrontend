// import React, { useEffect, useState } from 'react'
// import { useSelector,useDispatch } from 'react-redux'
// import Cartitem from '../Components/Cartitem';
// import { Link } from "react-router-dom";
// import { NavLink } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { clearCart } from "../redux/Slices/CartSlice";

// const Cart = () => {
// const { Cart } = useSelector((state) => state);
// const dispatch = useDispatch();
// console.log("Printing Cart");
// // console.log(Cart);
// const [totalAmount, setTotalAmount] = useState(0);
// useEffect(() => {
//   setTotalAmount(Cart.reduce((acc, curr) => acc + curr.price, 0)); 
// }, [Cart]);

// const payment=()=>{
//   setTimeout(() => {
//     toast.success("Congrats youer payment is successfull");
//     dispatch(clearCart());
//   }, 4000);

// }



// return (
//   <div >
//     {Cart.length > 0 ? (
//         <div className="flex flex-row flex-wrap p-2">
//           {Cart.map((item, index) => {
//             return <Cartitem key={item._id} item={item} itemIndex={index} />;
//           })}
//           <div className='flex flex-col item-center justify-between md:hover:scale-110 transition duration-300 ease-in gap-3 mt-10 ml-5 rounded-xl outline h-[376px] w-[370px]'>
//           <div className="flex flex-col p-5 gap-5 my-14  h-[100%] justify-between">
//           <div className="flex flex-col gap-5 ">
//           <div className="font-semibold text-xl text-green-800 ">Your Cart</div>
//             <div className="font-semibold text-5xl text-green-700  -mt-5">Summary</div>
//             <p className="text-xl">
//               <span className="text-gray-700 font-semibold text-xl">Total Items: {Cart.length}</span>
//             </p>
//             <p className="text-xl font-bold"><span className="text-gray-700 font-semibold">Total Amount:</span> ${totalAmount}</p>
//             <button onClick={payment} className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl">CheckOut Now</button>
//           </div>
//           </div>
//         </div>
//         </div>
//     ) : (
//       <div className="min-h-[80vh] flex flex-col items-center justify-center">
//         <h1 className="text-gray-700 font-semibold text-xl mb-2">
//           Your cart is empty!
//         </h1>
//         <Link to={"/Home"}>
//           <button className="uppercase bg-green-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold hover:text-green-700 p-3 px-10 tracking-wider">
//             Shop Now
//           </button>
//         </Link>
//       </div>
//     )}
//   </div>
// );
// };

// export default Cart;




import axios from "axios";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaShoppingBag, FaMapMarkerAlt, FaTimes, FaEye } from "react-icons/fa";
import { Plus, Edit, Trash2, MapPin, Phone, Building } from 'lucide-react';
import { toast } from "react-hot-toast";
import Modal from "react-modal";
import PaymentStatusModal from '../Components/StatusModalLoading';
import { fetchFilteredOrders } from "../redux/thunks/fetchFilteredOrders";
import { syncCartToBackend } from "../redux/thunks/cartThunks"; // your thunk

import { updateUserStats } from "../redux/Slices/userSlice";

import {
  remove,
  increaseCount,
  decreaseCount,
  clearCart,
} from '../redux/Slices/CartSlice';


import { useNavigate } from "react-router-dom";
Modal.setAppElement('#root'); // ✅ Do this outside the component
const Cart = () => {
 
  const dispatch = useDispatch();
   const navigate = useNavigate();
     const { user } = useSelector((state) => state);
     const isLogin = user.isLoggedIn;
    const { items: cartItems, totalItems, totalPrice } = useSelector((state) => state.Cart);
 
  
  // State management
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [pruductcount,setproductcount]=useState(1);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shippingAddressid, setSelectedAddressid] = useState("");
const [showConfirmationModal, setShowConfirmationModal] = useState(false);
const [confirmationMessage, setConfirmationMessage] = useState("Confirming your payment...");




const [addresses, setAddresses] = useState([]); // Replace savedAddresses
  const [loading, setLoading] = useState(false);
  
   const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/addresses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAddresses(response.data.addresses || []);
    } catch (error) {
      toast.error("No Address Found");
    } finally {
      setLoading(false);
    }
  };


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

//   Why Load Razorpay Script Dynamically?
// 🧾 What Is the Razorpay Script?
// Razorpay gives a JavaScript file:
// https://checkout.razorpay.com/v1/checkout.js
// This file:
// Initializes their payment gateway
// Opens the payment popup/modal
// Manages payment options, callbacks, etc.
// You need this script before you can call new Razorpay({...}).
// 1. Avoid Loading It on Every Page
// If you load it in public/index.html:
{/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
// Then this script will be loaded:
// Even on pages where user is not doing payment
// On first load, slowing down your app
// Even for users who might never reach checkout
// ⚠️ That’s bad for performance and user experience.
// ✅ So instead, load it only when needed:

  useEffect(() => {
    fetchAddresses();
    loadRazorpayScript();
  }, []);


  useEffect(() => {
  const updated = cartItems.find(item => item._id === selectedProduct?._id);
  if (updated) {
    setSelectedProduct(updated);
  }
}, [cartItems]);

  
//   This code snippet defines a state variable called discounts, which holds a random discount value for each product in the cart.
// Let's break it down:
// Explanation:
// ✅ useState(...)
// You're using React's useState to store the discounts object.

// ✅ cartItems.reduce(...)
// You loop over each item in the cartItems array and build an object (acc) that holds a random discount for that item.

// ✅ item._id as the key:
// Each cart item's unique _id is used as the key in the discounts object.

// ✅ Math.floor(Math.random() * 20) + 5
// Generates a random integer between 5 and 24, simulating a discount percentage like 5%, 10%, etc.
// ✅ Final structure:
// The result is an object like:

// {
//   "64a6d39e4dca1b0012f3eae3": 18,
//   "64a6d3bc4dca1b0012f3eaed": 7,
//   "64a6d3cf4dca1b0012f3eaf1": 12
// }

console.log(cartItems);

  // Discount state for each product
  const [discounts] = useState(
    cartItems.reduce((acc, item) => {
      acc[item._id] = Math.floor(Math.random() * 20) + 5; // Random discount 5-25%
      return acc;
    }, {})
  );
//   Keys = product _ids
// Values = random discount percentages

  // Calculations
  const totalAmount = cartItems.reduce(
    (acc, item) => {
      const count = item.count;
      const discount = discounts[item._id] || 0;
      const discountedPrice = item.price * (1 - discount / 100);
      return acc + discountedPrice * count;
    },
    0
  );
  
  const originalAmount = totalPrice;

  const totalSavings = originalAmount - totalAmount;
  const shipping = totalAmount > 500 ? 0 : 5.9;

  const subtotal=totalAmount+shipping;

  // Handlers
  const handleRemove = (id) => {
    dispatch(remove(id));
    toast.success("Item Removed");
  };



const handleCheckout = async () => {


 const shippingAddress=addresses.find(addr => addr._id === shippingAddressid);

//  console.log(shippingAddress);

  if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone) {
    return toast.error("Please fill in the delivery address.");
  }

  if (cartItems.length === 0) {
    return toast.error("Your cart is empty.");
  }

  setLoading(true);

  try {
    // Step 1: Create Razorpay order from backend
    const { data } = await axios.post( `${process.env.REACT_APP_BACKEND_URL}/api/orders/create-razorpay-order`,
      {
      totalAmount:subtotal
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const { razorpayOrder, paymentGroupId } = data;

    // Step 2: Open Razorpay payment popup
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "My E-Commerce Store",
      description: "Order Payment",
      order_id: razorpayOrder.id,
      handler: async function (response) {
        await handlePaymentSuccess(response, paymentGroupId);
      },
      prefill: {
        name: shippingAddress.fullName,
        contact: shippingAddress.phone,
        email: user.email || '', // Optional
      },
   theme: {
    color: "#3399cc",
    hide_topbar: false,  // Optional: hides Razorpay topbar
  },
      modal: {
        ondismiss: function () {
          handlePaymentFailure(paymentGroupId, "User closed Razorpay popup.");
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (err) {
    console.error("Error during checkout:", err);
    toast.error("Checkout failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

const handlePaymentSuccess = async (response, paymentGroupId) => {
 setLoading(true);
 setLoading(true);
  setShowConfirmationModal(true);
  setConfirmationMessage("Confirming your Order...");
  setShowOrderSummary(false);
 const shippingAddress=addresses.find(addr => addr._id === shippingAddressid);

  try {
    // 1. Verify the Razorpay payment on backend
    const verify = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders/verify-payment`, {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      paymentGroupId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (verify.data.success) {
      const { method, email, contact } = verify.data;

      // 2. Create confirmed orders in backend
   const response1= await axios.post( `${process.env.REACT_APP_BACKEND_URL}/api/orders/confirm-order`, {
        cartItems,
        shippingAddress,
        totalAmount:subtotal,
        shipping,
        paymentInfo: {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          paymentGroupId,
          method: method || "UPI", // fallback if method is missing
          status: "paid"
        }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

   
    if (response1.data.success === true) {
        setConfirmationMessage("✅ Order Confirm! Clearing cart...");
 const {totalOrders,totalSpends}=response1.data;
  dispatch(updateUserStats({
 totalOrders, totalSpends,
}));
    }else{
 setConfirmationMessage("X Order creation failed.");
        setConfirmationMessage("X Order creation failed.");
      setTimeout(() => {
        setShowConfirmationModal(false);
      }, 2000);

      return ;//as no sucess then dont allow nest statement to excute 
    }



      // localStorage.removeItem("cartItems"); // or dispatch(clearCart())
        try {
    const response2 = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cart/clear`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // if using JWT auth
      },
    });

    if (response2.data.success === true) {
     
       setConfirmationMessage("All Dome successfuly! Redirecting to userpanel...");
    //  toast.success("Payment successful! Your order has been placed.");
 dispatch(clearCart());
  dispatch(fetchFilteredOrders());

      setTimeout(() => {
        setShowConfirmationModal(false);
        navigate("/userpanel");
      }, 4000);
    }else{

   setConfirmationMessage("X clear cart  failed.");
 setTimeout(() => {
        setShowConfirmationModal(false);
      }, 4000);
    }
  } catch (error) {
        setConfirmationMessage("X Failed to clear cart");
      setShowConfirmationModal(false);
    toast.error("Failed to clear cart");
  }
      
    }

  } catch (err) {
    console.error("Error in payment success flow:", err);
    // toast.error("Payment verified, but order creation failed.");

    
           setConfirmationMessage("Error in payment success flow:");
      setTimeout(() => {
        setShowConfirmationModal(false);
      }, 2000);
  } finally {
   setLoading(false);
  }
};



const handlePaymentFailure = async (paymentGroupId, error) => {
  try {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders/payment-failure`, {
      paymentGroupId,
      error
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    toast.error("Payment failed or cancelled.");
  } catch (err) {
    console.error("Failed to record payment failure:", err);
  }
};






  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <FaShoppingBag className="text-gray-300 text-6xl mb-4" />
        <h1 className="text-gray-700 font-semibold text-xl mb-2">
          Your cart is empty!
        </h1>
        <button
          onClick={() => navigate("/home")}
          className="uppercase bg-green-600 hover:bg-green-700 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold p-3 px-10 tracking-wider"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
    
<div className="bg-white shadow-sm border-b sticky top-0 z-10">
  <div className="max-w-7xl mx-auto px-4 py-3">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

      {/* CONTINUE SHOPPING – only visible on md+ */}
      <button
        onClick={() => navigate("/")}
        className="hidden md:block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
      >
        CONTINUE SHOPPING
      </button>

      {/* Shopping Bag & Wishlist – only visible on md+ */}
      <div className="hidden md:flex items-center justify-center text-gray-600 space-x-4">
        <span>Shopping Bag ({cartItems.length})</span>
        <span>Your Wishlist (0)</span>
      </div>

      {/* Action Buttons – always visible */}
      <div className="flex w-full md:w-auto justify-between items-center gap-2">

        {/* curently we will handle the address manegemnt if its no will we will coem here  */}
        {/* <button
          onClick={() => setShowAddressModal(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded w-[48%] md:w-auto hover:bg-gray-800 transition duration-200"
        >
          <FaMapMarkerAlt />
          <span className="text-sm font-medium">ADD ADDRESS</span> 
        </button> */}


         <button
           onClick={() => {
    if (isLogin) {
      navigate("/addresses");
    } else {
      toast.error("Please login first");
  }}
          }
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded w-[48%] md:w-auto hover:bg-gray-800 transition duration-200"
        >
          <FaMapMarkerAlt />
          <span className="text-sm font-medium">ADD ADDRESS</span> 
        </button>

        <button
           onClick={() => {
    // if (isLogin) {
     setShowOrderSummary(true);
  //   } else {
  //     toast.error("Please login first");
  // }
  }
  }

          className="bg-black text-white px-4 py-2 rounded w-[48%] md:w-auto hover:bg-gray-800 transition duration-200 text-sm font-medium"
        >
          CHECKOUT NOW
        </button>
      </div>
    </div>
  </div>
</div>

{/* *********************imp imp imp dont remove it  */}

{/* first by clude */}
      
      {/* <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
         
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {cartItems.map((item) => {
                const discount = discounts[item._id] || 0;
                const discountedPrice = item.price * (1 - discount / 100);
                
                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition duration-200"
                  >
                    <div className="flex gap-4">
                    
                      <div 
                        className="relative w-32 h-32 flex-shrink-0 cursor-pointer group"
                        onClick={() => openProductModal(item)}
                      >
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-200 rounded-lg flex items-center justify-center">
                          <FaEye className="text-white opacity-0 group-hover:opacity-100 text-xl" />
                        </div>
                      </div>
                      
                     
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.description && item.description.length > 100
                            ? item.description.substring(0, 100) + "..."
                            : item.description}
                        </p>
                        
                        
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-green-600">
                              ${discountedPrice.toFixed(2)}
                            </span>
                            {discount > 0 && (
                              <>
                                <span className="text-sm text-gray-500 line-through">
                                  ${item.price}
                                </span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  {discount}% OFF
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        
                       
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => {dispatch(decreaseCount(item._id))
                                   dispatch(syncCartToBackend());
                                }}
                                className="p-2 hover:bg-gray-100 transition duration-200"
                                disabled={item.quantity <= 1}
                              >
                                <AiOutlineMinus className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                              </button>
                              <span className="px-3 py-2 min-w-[3rem] text-center">
                                {item.count}
                              </span>
                              <button
                                onClick={() => {dispatch(increaseCount(item._id))

                                   dispatch(syncCartToBackend());
                                }}
                                className="p-2 hover:bg-gray-100 transition duration-200"
                              >
                                <AiOutlinePlus className="text-gray-600" />
                              </button>
                            </div>
                             <span className="text-sm text-gray-600">
          Stock Available: {item.quantity}
        </span>
                          </div>
                          
                          <button
                            onClick={() =>dispatch(remove(item._id))}
                            className="text-red-500 hover:text-red-700 p-2 transition duration-200"
                          >
                            <AiFillDelete className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                );
              })}
            </div>
          </div> */}



{/* chat gept */}
{/* Main Content */}
<div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Products Section */}
    <div className="flex-1">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h2>

      <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 sm:pr-2">
        {cartItems.map((item) => {
          const discount = discounts[item._id] || 0;
          const discountedPrice = item.price * (1 - discount / 100);

          return (
            <div
              key={item._id}
              className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Product Image */}
                <div
                  className="relative w-full sm:w-32 h-40 sm:h-32 flex-shrink-0 cursor-pointer group"
                  onClick={() => openProductModal(item)}
                >
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-200 rounded-lg flex items-center justify-center">
                    <FaEye className="text-white opacity-0 group-hover:opacity-100 text-xl" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0 relative">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.description?.length > 100
                      ? item.description.substring(0, 100) + "..."
                      : item.description}
                  </p>

                  {/* Price */}
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-base sm:text-lg font-bold text-green-600">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {discount > 0 && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            ${item.price}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quantity, Available, Delete */}
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                    {/* Quantity & Available */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => {
                            dispatch(decreaseCount(item._id));
                            dispatch(syncCartToBackend());
                          }}
                          className="p-2 hover:bg-gray-100 transition duration-200"
                          disabled={item.count <= 1}
                        >
                          <AiOutlineMinus
                            className={
                              item.count <= 1 ? "text-gray-300" : "text-gray-600"
                            }
                          />
                        </button>
                        <span className="px-3 py-2 min-w-[2.5rem] text-center">
                          {item.count}
                        </span>
                        <button
                          onClick={() => {
                            dispatch(increaseCount(item._id));
                            dispatch(syncCartToBackend());
                          }}
                          className="p-2 hover:bg-gray-100 transition duration-200"
                        >
                          <AiOutlinePlus className="text-gray-600" />
                        </button>
                      </div>

                      <span className="text-sm font-medium text-gray-800">
                        Available:{" "}
                        <span className="font-semibold text-black">{item.quantity}</span>
                      </span>
                    </div>

                    {/* Delete Button Right-Aligned */}
                    <button
                      onClick={() => {
                            dispatch(remove(item._id));
                            dispatch(syncCartToBackend());
                          }}
                      className="text-red-500 hover:text-red-700 p-1 transition duration-200 ml-auto"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" /> {/* ✅ Smaller icon */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  














<PaymentStatusModal message={confirmationMessage} isOpen={showConfirmationModal} />


          {/* Order Summary - Desktop Only */}
          <div className="hidden lg:block w-80 sticky top-24 self-start">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold mb-4">ORDER SUMMARY</h3>
              
              {/* Address Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>


     <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Delivery Address
      </label>
      {loading ? (
        <p className="text-gray-500">Loading addresses...</p>
      ) : (
        <select
          value={shippingAddressid}
          onChange={(e) =>{setSelectedAddressid(e.target.value);
          }

          }
          onClick={() => {
            if (addresses.length === 0) {
              navigate('/addresses');
            }
          }}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Address</option>
          {addresses.map((addr) => (
            <option key={addr._id} value={addr._id}>
              {addr.addressType} - {addr.address.substring(0, 30)}...
            </option>
          ))}
        </select>
      )}
    </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Total Items:</span>
                  {/* <span>{cartItems.length}</span> */}
                   <span> {`${totalItems}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${originalAmount.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>You Save:</span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${(totalAmount + shipping).toFixed(2)}</span>
                </div>
              </div>
              

              <button
           onClick={() => {
    if (isLogin) {
  handleCheckout();
    } else {
      toast.error("Please login first");
  }}}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Order Summary Modal - Mobile */}

      {/* model sizes chekc later */}
      
      {/* <Modal
        isOpen={showOrderSummary}
        onRequestClose={() => setShowOrderSummary(false)}
        className="bg-white rounded-lg shadow-xl max-w-md mx-auto mt-10 max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4"
      > */}

      {/* <Modal
  isOpen={showOrderSummary}
  onRequestClose={() => setShowOrderSummary(false)}
  className="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto my-6 md:my-10 max-h-[90vh] overflow-y-auto p-4 md:p-6"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-2"
> */}

<Modal
  isOpen={showOrderSummary}
  onRequestClose={() => setShowOrderSummary(false)}
  className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto mt-10 p-4"
  overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-2">

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">ORDER SUMMARY</h3>
            <button
              onClick={() => setShowOrderSummary(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Address Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Address
            </label>
            <select
              value={shippingAddressid}
              onChange={(e) => setSelectedAddressid(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Address</option>
             {addresses.map((addr) => (
  <option key={addr._id} value={addr._id}>
    {addr.addressType} - {addr.address.substring(0, 30)}...
  </option>
))}   
 </select>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Total Items:</span>
              {/* <span>{cartItems.length}</span> */}
              <span> {`${totalItems}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${originalAmount.toFixed(2)}</span>
            </div>
            {totalSavings > 0 && (
              <div className="flex justify-between text-green-600">
                <span>You Save:</span>
                <span>-${totalSavings.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${(totalAmount + shipping).toFixed(2)}</span>
            </div>
          </div>
          
          <button
                    onClick={() => {
    if (isLogin) {
        handleCheckout();
    } else {
      toast.error("Please login first");
  }}}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            CONFIRM & PAY
          </button>
        </div>
      </Modal>



<Modal
  isOpen={showProductModal}
  onRequestClose={() => setShowProductModal(false)}
  className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-auto mt-10 max-h-[90vh] overflow-y-auto"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4"
>
  {selectedProduct && (
    <div className="p-6 w-full">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Product Details</h3>
        <button
          onClick={() => setShowProductModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${selectedProduct.image}`}
            alt={selectedProduct.title}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
              e.target.onerror = null;
            }}
            className="w-full h-64 md:h-80 object-contain rounded-lg border border-gray-200"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-semibold mb-2">{selectedProduct.title}</h4>
            <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed max-h-32 overflow-y-auto">
              {selectedProduct.description}
            </p>

            {/* Price Section */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="text-2xl font-bold text-green-600">
                  ₹{(selectedProduct.price * (1 - (discounts[selectedProduct._id] || 0) / 100)).toFixed(2)}
                </span>
                {discounts[selectedProduct._id] > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{selectedProduct.price}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {discounts[selectedProduct._id]}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quantity & Stock */}
          <div className="flex items-center flex-wrap gap-4 mt-6">
            <div className="flex items-center border-2 border-gray-300 rounded-lg">
              <button
               onClick={() =>{ dispatch(decreaseCount(selectedProduct._id))
 dispatch(syncCartToBackend());
               }
               }
                className="p-2 hover:bg-gray-100 transition duration-200"
              >
                <AiOutlineMinus />
              </button>
              <span className="px-4 py-2 min-w-[3rem] text-center">
                {selectedProduct.count}
              </span>
              <button
               onClick={() =>{ dispatch(increaseCount(selectedProduct._id))
                 dispatch(syncCartToBackend());
               }} 
                className="p-2 hover:bg-gray-100 transition duration-200"
              >
                <AiOutlinePlus />
              </button>
            </div>

            <span className="text-sm text-gray-600">
              Stock Available: <span className="font-medium text-black">{selectedProduct.quantity || "N/A"}</span>
            </span>

            <button
               onClick={() => {
    dispatch(remove(selectedProduct._id));
    setShowProductModal(false);
     dispatch(syncCartToBackend());
  }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 ml-auto"
            >
              Remove from Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</Modal>
    </div>
  );
};

export default Cart;










// import React, { useState } from "react";
// import { AiFillDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
// import { FaShoppingBag, FaMapMarkerAlt, FaTimes, FaEye, FaShoppingCart } from "react-icons/fa";

// const Cart = () => {
//   // Mock cart items with stock information
//   const [cartItems, setCartItems] = useState([
//     {
//       _id: "1",
//       title: "Premium Wireless Headphones",
//       description: "High-quality wireless headphones with noise cancellation and premium sound quality for an immersive audio experience.",
//       price: 199.99,
//       image: "/api/placeholder/400/400",
//       stock: 15
//     },
//     {
//       _id: "2", 
//       title: "Smart Fitness Watch",
//       description: "Advanced fitness tracking watch with heart rate monitoring, GPS, and water resistance for all your activities.",
//       price: 299.99,
//       image: "/api/placeholder/400/400",
//       stock: 8
//     }
//   ]);
  
//   // State management
//   const [showOrderSummary, setShowOrderSummary] = useState(false);
//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [showProductModal, setShowProductModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState("");
  
//   // Address form state
//   const [addressForm, setAddressForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     addressType: "Home"
//   });
  
//   // Sample addresses
//   const [savedAddresses] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       phone: "9876543210", 
//       address: "123 Main Street, Apartment 4B",
//       city: "Mumbai",
//       state: "Maharashtra",
//       pincode: "400001",
//       addressType: "Home"
//     },
//     {
//       id: 2,
//       name: "John Doe",
//       phone: "9876543210",
//       address: "456 Office Complex, Floor 3",
//       city: "Mumbai", 
//       state: "Maharashtra",
//       pincode: "400002",
//       addressType: "Office"
//     }
//   ]);
  
//   // User selected quantities (starts at 1 for each item)
//   const [userQuantities, setUserQuantities] = useState(
//     cartItems.reduce((acc, item) => {
//       acc[item._id] = 1;
//       return acc;
//     }, {})
//   );
  
//   // Discount state for each product
//   const [discounts] = useState(
//     cartItems.reduce((acc, item) => {
//       acc[item._id] = Math.floor(Math.random() * 20) + 5; // Random discount 5-25%
//       return acc;
//     }, {})
//   );

//   // Calculations
//   const totalAmount = cartItems.reduce(
//     (acc, item) => {
//       const quantity = userQuantities[item._id] || 1;
//       const discount = discounts[item._id] || 0;
//       const discountedPrice = item.price * (1 - discount / 100);
//       return acc + discountedPrice * quantity;
//     },
//     0
//   );
  
//   const originalAmount = cartItems.reduce(
//     (acc, item) => acc + item.price * (userQuantities[item._id] || 1),
//     0
//   );
  
//   const totalSavings = originalAmount - totalAmount;
//   const shipping = totalAmount > 500 ? 0 : 5.9;

//   // Handlers
//   const handleRemove = (id) => {
//     setCartItems(prev => prev.filter(item => item._id !== id));
//     const newQuantities = { ...userQuantities };
//     delete newQuantities[id];
//     setUserQuantities(newQuantities);
//   };

//   const handleQuantity = (id, type) => {
//     const item = cartItems.find(item => item._id === id);
//     if (!item) return;
    
//     setUserQuantities((prev) => {
//       const updated = { ...prev };
//       if (type === "inc" && (updated[id] || 1) < item.stock) {
//         updated[id] = (updated[id] || 1) + 1;
//       } else if (type === "dec" && (updated[id] || 1) > 1) {
//         updated[id] = (updated[id] || 1) - 1;
//       }
//       return updated;
//     });
//   };

//   const handleAddressSubmit = () => {
//     if (!addressForm.name || !addressForm.phone || !addressForm.address || 
//         !addressForm.city || !addressForm.state || !addressForm.pincode) {
//       alert("Please fill all required fields");
//       return;
//     }
    
//     alert("Address added successfully!");
//     setShowAddressModal(false);
//     setAddressForm({
//       name: "",
//       phone: "",
//       address: "",
//       city: "",
//       state: "",
//       pincode: "",
//       addressType: "Home"
//     });
//   };

//   const handleCheckout = () => {
//     if (!selectedAddress) {
//       alert("Please select a delivery address");
//       return;
//     }
    
//     // Clear cart only after successful checkout
//     setCartItems([]);
//     setUserQuantities({});
//     alert("Order placed successfully!");
//     setShowOrderSummary(false);
//   };

//   const openProductModal = (product) => {
//     setSelectedProduct(product);
//     setShowProductModal(true);
//   };

//   const handleContinueShopping = () => {
//     // Navigate to home without clearing cart
//     window.location.href = "/";
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
//         <div className="text-center max-w-md">
//           <div className="bg-black rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
//             <FaShoppingCart className="text-white text-4xl" />
//           </div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
//             Your Cart is Empty
//           </h1>
//           <p className="text-gray-600 mb-8 text-sm md:text-base">
//             Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
//           </p>
//           <button
//             onClick={handleContinueShopping}
//             className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 md:py-4 md:px-12 rounded-lg transition duration-300 text-sm md:text-base"
//           >
//             START SHOPPING
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <div className="bg-black shadow-lg sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
//           <div className="flex justify-between items-center gap-2">
//             <button
//               onClick={handleContinueShopping}
//               className="bg-white text-black px-3 py-2 md:px-6 md:py-2 rounded-lg hover:bg-gray-100 transition duration-200 text-xs md:text-sm font-medium"
//             >
//               CONTINUE SHOPPING
//             </button>
            
//             <div className="hidden lg:flex items-center space-x-6 text-white">
//               <span>Shopping Bag ({cartItems.length})</span>
//               <span>Your Wishlist (0)</span>
//             </div>
            
//             <div className="flex items-center space-x-2 md:space-x-3">
//               <button
//                 onClick={() => setShowAddressModal(true)}
//                 className="bg-gray-800 text-white px-2 py-2 md:px-4 md:py-2 rounded-lg hover:bg-gray-700 transition duration-200 flex items-center space-x-1 md:space-x-2 text-xs md:text-sm"
//               >
//                 <FaMapMarkerAlt className="text-xs md:text-sm" />
//                 <span className="hidden sm:inline">ADDRESS</span>
//               </button>
              
//               <button
//                 onClick={() => setShowOrderSummary(true)}
//                 className="bg-white text-black px-3 py-2 md:px-6 md:py-2 rounded-lg hover:bg-gray-100 transition duration-200 text-xs md:text-sm font-medium"
//               >
//                 CHECKOUT
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8">
//         <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
//           {/* Products Section */}
//           <div className="flex-1">
//             <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-800">Shopping Cart</h2>
//             <div className="space-y-4 md:space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
//               {cartItems.map((item) => {
//                 const quantity = userQuantities[item._id] || 1;
//                 const discount = discounts[item._id] || 0;
//                 const discountedPrice = item.price * (1 - discount / 100);
                
//                 return (
//                   <div
//                     key={item._id}
//                     className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-6 hover:shadow-lg transition duration-300"
//                   >
//                     <div className="flex gap-4 md:gap-6">
//                       {/* Product Image */}
//                       <div 
//                         className="relative w-24 h-24 md:w-40 md:h-40 flex-shrink-0 cursor-pointer group"
//                         onClick={() => openProductModal(item)}
//                       >
//                         <img
//                           src={item.image}
//                           alt={item.title}
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-200 rounded-lg flex items-center justify-center">
//                           <FaEye className="text-white opacity-0 group-hover:opacity-100 text-xl" />
//                         </div>
//                       </div>
                      
//                       {/* Product Details */}
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
//                           {item.title}
//                         </h3>
//                         <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
//                           {item.description}
//                         </p>
                        
//                         {/* Stock Info */}
//                         <div className="mb-2 md:mb-3">
//                           <span className="text-xs md:text-sm text-gray-500">
//                             Stock Available: <span className="font-medium text-black">{item.stock}</span>
//                           </span>
//                         </div>
                        
//                         {/* Price Section */}
//                         <div className="mb-3 md:mb-4">
//                           <div className="flex items-center space-x-2 flex-wrap">
//                             <span className="text-lg md:text-2xl font-bold text-black">
//                               ${discountedPrice.toFixed(2)}
//                             </span>
//                             {discount > 0 && (
//                               <>
//                                 <span className="text-sm md:text-base text-gray-500 line-through">
//                                   ${item.price}
//                                 </span>
//                                 <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
//                                   {discount}% OFF
//                                 </span>
//                               </>
//                             )}
//                           </div>
//                         </div>
                        
//                         {/* Quantity and Actions */}
//                         <div className="flex items-center justify-between flex-wrap gap-2">
//                           <div className="flex items-center space-x-3">
//                             <div className="flex items-center border-2 border-gray-300 rounded-lg">
//                               <button
//                                 onClick={() => handleQuantity(item._id, "dec")}
//                                 className="p-2 md:p-3 hover:bg-gray-100 transition duration-200"
//                                 disabled={quantity <= 1}
//                               >
//                                 <AiOutlineMinus className={`text-sm md:text-base ${quantity <= 1 ? "text-gray-300" : "text-gray-600"}`} />
//                               </button>
//                               <span className="px-3 md:px-4 py-2 md:py-3 min-w-[3rem] text-center font-medium">
//                                 {quantity}
//                               </span>
//                               <button
//                                 onClick={() => handleQuantity(item._id, "inc")}
//                                 className="p-2 md:p-3 hover:bg-gray-100 transition duration-200"
//                                 disabled={quantity >= item.stock}
//                               >
//                                 <AiOutlinePlus className={`text-sm md:text-base ${quantity >= item.stock ? "text-gray-300" : "text-gray-600"}`} />
//                               </button>
//                             </div>
//                           </div>
                          
//                           <button
//                             onClick={() => handleRemove(item._id)}
//                             className="bg-black text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center space-x-2 text-xs md:text-sm"
//                           >
//                             <AiFillDelete />
//                             <span className="hidden sm:inline">Remove</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Order Summary - Desktop Only */}
//           <div className="hidden lg:block w-80 sticky top-24 self-start">
//             <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
//               <h3 className="text-2xl font-bold mb-6 text-gray-800">ORDER SUMMARY</h3>
              
//               {/* Address Selection */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Delivery Address
//                 </label>
//                 <select
//                   value={selectedAddress}
//                   onChange={(e) => setSelectedAddress(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                 >
//                   <option value="">Select Address</option>
//                   {savedAddresses.map((addr) => (
//                     <option key={addr.id} value={addr.id}>
//                       {addr.addressType} - {addr.address.substring(0, 30)}...
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between">
//                   <span>Total Items:</span>
//                   <span className="font-medium">{cartItems.length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Subtotal:</span>
//                   <span className="font-medium">${originalAmount.toFixed(2)}</span>
//                 </div>
//                 {totalSavings > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>You Save:</span>
//                     <span className="font-medium">-${totalSavings.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>Shipping:</span>
//                   <span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping}`}</span>
//                 </div>
//                 <hr className="border-t-2" />
//                 <div className="flex justify-between font-bold text-xl">
//                   <span>Total:</span>
//                   <span>${(totalAmount + shipping).toFixed(2)}</span>
//                 </div>
//               </div>
              
//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition duration-200 font-bold text-lg"
//               >
//                 CHECKOUT NOW
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add Address Modal */}
//       {showAddressModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="p-4 md:p-6">
//               <div className="flex justify-between items-center mb-4 md:mb-6">
//                 <h3 className="text-lg md:text-xl font-bold">Add New Address</h3>
//                 <button
//                   onClick={() => setShowAddressModal(false)}
//                   className="text-gray-500 hover:text-gray-700 p-2"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={addressForm.name}
//                     onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
//                     className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     required
//                     value={addressForm.phone}
//                     onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
//                     className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Address *
//                   </label>
//                   <textarea
//                     required
//                     rows="3"
//                     value={addressForm.address}
//                     onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
//                     className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       City *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={addressForm.city}
//                       onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
//                       className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       State *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={addressForm.state}
//                       onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
//                       className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Pincode *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={addressForm.pincode}
//                       onChange={(e) => setAddressForm({...addressForm, pincode: e.target.value})}
//                       className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Address Type
//                     </label>
//                     <select
//                       value={addressForm.addressType}
//                       onChange={(e) => setAddressForm({...addressForm, addressType: e.target.value})}
//                       className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                     >
//                       <option value="Home">Home</option>
//                       <option value="Office">Office</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={handleAddressSubmit}
//                   className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
//                 >
//                   Save Address
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Order Summary Modal - Mobile Only */}
//       {showOrderSummary && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
//           <div className="bg-white rounded-t-xl md:rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="p-4 md:p-6">
//               <div className="flex justify-between items-center mb-4 md:mb-6">
//                 <h3 className="text-lg md:text-xl font-bold">ORDER SUMMARY</h3>
//                 <button
//                   onClick={() => setShowOrderSummary(false)}
//                   className="text-gray-500 hover:text-gray-700 p-2"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
              
//               {/* Address Selection */}
//               <div className="mb-4 md:mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Delivery Address
//                 </label>
//                 <select
//                   value={selectedAddress}
//                   onChange={(e) => setSelectedAddress(e.target.value)}
//                   className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                 >
//                   <option value="">Select Address</option>
//                   {savedAddresses.map((addr) => (
//                     <option key={addr.id} value={addr.id}>
//                       {addr.addressType} - {addr.address.substring(0, 30)}...
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between">
//                   <span>Total Items:</span>
//                   <span className="font-medium">{cartItems.length}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Subtotal:</span>
//                   <span className="font-medium">${originalAmount.toFixed(2)}</span>
//                 </div>
//                 {totalSavings > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>You Save:</span>
//                     <span className="font-medium">-${totalSavings.toFixed(2)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span>Shipping:</span>
//                   <span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping}`}</span>
//                 </div>
//                 <hr className="border-t-2" />
//                 <div className="flex justify-between font-bold text-lg">
//                   <span>Total:</span>
//                   <span>${(totalAmount + shipping).toFixed(2)}</span>
//                 </div>
//               </div>
              
//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition duration-200 font-bold"
//               >
//                 CONFIRM & PAY
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Product Detail Modal */}
//       {showProductModal && selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="p-4 md:p-8">
//               <div className="flex justify-between items-center mb-4 md:mb-6">
//                 <h3 className="text-lg md:text-2xl font-bold">Product Details</h3>
//                 <button
//                   onClick={() => setShowProductModal(false)}
//                   className="text-gray-500 hover:text-gray-700 p-2"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
              
//               <div className="flex flex-col md:flex-row gap-6 md:gap-8">
//                 <div className="md:w-1/2">
//                   <img
//                     src={selectedProduct.image}
//                     alt={selectedProduct.title}
//                     className="w-full h-64 md:h-96 object-cover rounded-xl"
//                   />
//                 </div>
                
//                 <div className="md:w-1/2">
//                   <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{selectedProduct.title}</h4>
//                   <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">{selectedProduct.description}</p>
                  
//                   <div className="mb-3 md:mb-4">
//                     <span className="text-sm text-gray-500">
//                       Stock Available: <span className="font-medium text-black">{selectedProduct.stock}</span>
//                     </span>
//                   </div>
                  
//                   <div className="mb-4 md:mb-6">
//                     <div className="flex items-center space-x-2 flex-wrap">
//                       <span className="text-2xl md:text-3xl font-bold text-black">
//                         ${(selectedProduct.price * (1 - (discounts[selectedProduct._id] || 0) / 100)).toFixed(2)}
//                       </span>
//                       {discounts[selectedProduct._id] > 0 && (
//                         <>
//                           <span className="text-lg md:text-xl text-gray-500 line-through">
//                             ${selectedProduct.price}
//                           </span>
//                           <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
//                             {discounts[selectedProduct._id]}% OFF
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center space-x-4 flex-wrap gap-2">
//                     <div className="flex items-center border-2 border-gray-300 rounded-lg">
//                       <button
//                         onClick={() => handleQuantity(selectedProduct._id, "dec")}
//                         className="p-3 hover:bg-gray-100 transition duration-200"
//                         disabled={userQuantities[selectedProduct._id] <= 1}
//                       >
//                         <AiOutlineMinus />
//                       </button>
//                       <span className="px-4 py-3 min-w-[3rem] text-center font-medium">
//                         {userQuantities[selectedProduct._id] || 1}
//                       </span>
//                       <button
//                         onClick={() => handleQuantity(selectedProduct._id, "inc")}
//                         className="p-3 hover:bg-gray-100 transition duration-200"
//                         disabled={userQuantities[selectedProduct._id] >= selectedProduct.stock}
//                       >
//                         <AiOutlinePlus />
//                       </button>
//                     </div>
                    
//                     <button
//                       onClick={() => {
//                         handleRemove(selectedProduct._id);
//                         setShowProductModal(false);
//                       }}
//                       className="bg-black text-white px-4 py-3 md:px-6 md:py-3 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center space-x-2"
//                     >
//                       <AiFillDelete />
//                       <span>Remove from Cart</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;