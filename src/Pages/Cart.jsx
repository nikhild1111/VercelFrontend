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
import { remove } from "../redux/Slices/CartSlice";
import { AiFillDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaShoppingBag, FaMapMarkerAlt, FaTimes, FaEye } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Modal from "react-modal";

import { useNavigate } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
   const navigate = useNavigate();
  
  // State management
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
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

  useEffect(() => {
    fetchAddresses();
  }, []);
  
  // Quantities state
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item._id] = item.quantity || 1;
      return acc;
    }, {})
  );
  
  // Discount state for each product
  const [discounts] = useState(
    cartItems.reduce((acc, item) => {
      acc[item._id] = Math.floor(Math.random() * 20) + 5; // Random discount 5-25%
      return acc;
    }, {})
  );

  // Calculations
  const totalAmount = cartItems.reduce(
    (acc, item) => {
      const quantity = quantities[item._id] || 1;
      const discount = discounts[item._id] || 0;
      const discountedPrice = item.price * (1 - discount / 100);
      return acc + discountedPrice * quantity;
    },
    0
  );
  
  const originalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * (quantities[item._id] || 1),
    0
  );
  
  const totalSavings = originalAmount - totalAmount;
  const shipping = totalAmount > 500 ? 0 : 5.9;

  // Handlers
  const handleRemove = (id) => {
    dispatch(remove(id));
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
    toast.success("Item Removed");
  };

  const handleQuantity = (id, type) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      if (type === "inc") {
        updated[id] = (updated[id] || 1) + 1;
      } else if (type === "dec" && (updated[id] || 1) > 1) {
        updated[id] = (updated[id] || 1) - 1;
      }
      return updated;
    });
  };

  // no need as we are hanlding  using address manegment 
  // const handleAddressSubmit = () => {
  //   // Validate required fields
  //   if (!addressForm.name || !addressForm.phone || !addressForm.address || !addressForm.city || !addressForm.state || !addressForm.pincode) {
  //     toast.error("Please fill all required fields");
  //     return;
  //   }
    
  //   // Handle backend request here later
  //   toast.success("Address added successfully!");
  //   setShowAddressModal(false);
  //   setAddressForm({
  //     name: "",
  //     phone: "",
  //     address: "",
  //     city: "",
  //     state: "",
  //     pincode: "",
  //     addressType: "Home"
  //   });
  // };

  const handleCheckout = () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }
    
    // Remove all items from cart
    cartItems.forEach(item => dispatch(remove(item._id)));
    toast.success("Order placed successfully!");
    setShowOrderSummary(false);
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
      {/* Navigation Bar */}
      {/* <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.location.href = "/"}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              CONTINUE SHOPPING
            </button>
            
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-gray-600">Shopping Bag ({cartItems.length})</span>
              <span className="text-gray-600">Your Wishlist (0)</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddressModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
              >
                <FaMapMarkerAlt />
                <span className="hidden sm:inline">ADD ADDRESS</span>
              </button>
              
              <button
                onClick={() => setShowOrderSummary(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      </div> */}




{/* this was the secodn oner */}
       {/* <div className="min-h-screen bg-gray-50"> */}
     
      {/* <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            
          
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200 w-full sm:w-auto"
            >
              CONTINUE SHOPPING
            </button>

        
            <div className="flex justify-between sm:justify-center items-center text-center text-gray-600 space-x-4 w-full sm:w-auto">
              <span>Shopping Bag ({cartItems.length})</span>
              <span>Your Wishlist (0)</span>
            </div>

           
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowAddressModal(true)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <FaMapMarkerAlt />
                <span className="hidden sm:inline">ADD ADDRESS</span>
              </button>

              <button
                onClick={() => setShowOrderSummary(true)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200 w-full sm:w-auto"
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
       </div> */}


<div className="bg-white shadow-sm border-b sticky top-0 z-40">
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
          onClick={() => navigate('/addresses')}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded w-[48%] md:w-auto hover:bg-gray-800 transition duration-200"
        >
          <FaMapMarkerAlt />
          <span className="text-sm font-medium">ADD ADDRESS</span> 
        </button>

        <button
          onClick={() => setShowOrderSummary(true)}
          className="bg-black text-white px-4 py-2 rounded w-[48%] md:w-auto hover:bg-gray-800 transition duration-200 text-sm font-medium"
        >
          CHECKOUT NOW
        </button>
      </div>
    </div>
  </div>
</div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Products Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {cartItems.map((item) => {
                const quantity = quantities[item._id] || 1;
                const discount = discounts[item._id] || 0;
                const discountedPrice = item.price * (1 - discount / 100);
                
                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition duration-200"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
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
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.description && item.description.length > 100
                            ? item.description.substring(0, 100) + "..."
                            : item.description}
                        </p>
                        
                        {/* Price Section */}
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
                        
                        {/* Quantity and Actions */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => handleQuantity(item._id, "dec")}
                                className="p-2 hover:bg-gray-100 transition duration-200"
                                disabled={quantity <= 1}
                              >
                                <AiOutlineMinus className={quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                              </button>
                              <span className="px-3 py-2 min-w-[3rem] text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() => handleQuantity(item._id, "inc")}
                                className="p-2 hover:bg-gray-100 transition duration-200"
                              >
                                <AiOutlinePlus className="text-gray-600" />
                              </button>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="text-red-500 hover:text-red-700 p-2 transition duration-200"
                          >
                            <AiFillDelete className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>


// chant gpt 

//                   <div
//   key={item._id}
//   className="bg-white rounded-xl shadow-md border p-5 hover:shadow-lg transition duration-300 w-full"
// >
//   <div className="flex flex-col sm:flex-row gap-6">
//     {/* Product Image */}
//     <div
//       className="relative w-full sm:w-36 h-36 flex-shrink-0 cursor-pointer group"
//       onClick={() => openProductModal(item)}
//     >
//       <img
//         src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
//         alt={item.title}
//         className="w-full h-full object-cover rounded-lg"
//         onError={(e) => {
//           e.target.src = "https://via.placeholder.com/150?text=No+Image";
//           e.target.onerror = null;
//         }}
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-200 rounded-lg flex items-center justify-center">
//         <FaEye className="text-white opacity-0 group-hover:opacity-100 text-xl" />
//       </div>
//     </div>

//     {/* Product Details */}
//     <div className="flex-1 min-w-0 flex flex-col justify-between">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900 truncate">
//           {item.title}
//         </h3>
//         <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//           {item.description && item.description.length > 100
//             ? item.description.substring(0, 100) + "..."
//             : item.description}
//         </p>

//         {/* Price Section */}
//         <div className="mt-2">
//           <div className="flex items-center space-x-2">
//             <span className="text-lg font-bold text-green-600">
//               ₹{discountedPrice.toFixed(2)}
//             </span>
//             {discount > 0 && (
//               <>
//                 <span className="text-sm text-gray-500 line-through">
//                   ₹{item.price}
//                 </span>
//                 <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                   {discount}% OFF
//                 </span>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Quantity and Actions */}
//       <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
//         <div>
//           <div className="flex items-center border rounded-lg">
//             <button
//               onClick={() => handleQuantity(item._id, "dec")}
//               className="p-2 hover:bg-gray-100 transition duration-200"
//               disabled={quantities[item._id] <= 1}
//             >
//               <AiOutlineMinus className={quantities[item._id] <= 1 ? "text-gray-300" : "text-gray-600"} />
//             </button>
//             <span className="px-3 py-2 min-w-[3rem] text-center">
//               {quantities[item._id] || 1}
//             </span>
//             <button
//               onClick={() => handleQuantity(item._id, "inc")}
//               className="p-2 hover:bg-gray-100 transition duration-200"
//             >
//               <AiOutlinePlus className="text-gray-600" />
//             </button>
//           </div>
//           <div className="text-xs text-gray-500 mt-1">
//             Stock: <span className="text-black font-medium">{item.stock || "N/A"}</span>
//           </div>
//         </div>

//         <button
//           onClick={() => handleRemove(item._id)}
//           className="text-red-500 hover:text-red-700 p-2 transition duration-200"
//         >
//           <AiFillDelete className="text-xl" />
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

                );
              })}
            </div>
          </div>

          {/* Order Summary - Desktop Only */}
          <div className="hidden lg:block w-80 sticky top-24 self-start">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-bold mb-4">ORDER SUMMARY</h3>
              
              {/* Address Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>

 {/* <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Select Delivery Address</label>
      {loading ? (
        <p className="text-gray-500">Loading addresses...</p>
      ) : (
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
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
    </div> */}



     <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Delivery Address
      </label>
      {loading ? (
        <p className="text-gray-500">Loading addresses...</p>
      ) : (
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
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

                {/* <select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Address</option>
                  {savedAddresses.map((addr) => (
                    <option key={addr._id} value={addr._id}>
                      {addr.addressType} - {addr.address.substring(0, 30)}...
                    </option>
                  ))}
                </select> */}
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Total Items:</span>
                  <span>{cartItems.length}</span>
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
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* curently we are naviage tot he address manegament component  */}

      {/* Add Address Modal
      <Modal
        isOpen={showAddressModal}
        onRequestClose={() => setShowAddressModal(false)}
        className="bg-white rounded-lg shadow-xl max-w-md mx-auto mt-20 max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Add New Address</h3>
            <button
              onClick={() => setShowAddressModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={addressForm.name}
                onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={addressForm.phone}
                onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                required
                rows="3"
                value={addressForm.address}
                onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.pincode}
                  onChange={(e) => setAddressForm({...addressForm, pincode: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Type
                </label>
                <select
                  value={addressForm.addressType}
                  onChange={(e) => setAddressForm({...addressForm, addressType: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleAddressSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Save Address
            </button>
          </div>
        </div>
      </Modal> */}

      {/* Order Summary Modal - Mobile */}
      <Modal
        isOpen={showOrderSummary}
        onRequestClose={() => setShowOrderSummary(false)}
        className="bg-white rounded-lg shadow-xl max-w-md mx-auto mt-10 max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4"
      >
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
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
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
              <span>{cartItems.length}</span>
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
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            CONFIRM & PAY
          </button>
        </div>
      </Modal>

      {/* Product Detail Modal */}
      {/* <Modal
        isOpen={showProductModal}
        onRequestClose={() => setShowProductModal(false)}
        className="bg-white rounded-lg shadow-xl max-w-2xl mx-auto mt-10 max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4"
      >
        {selectedProduct && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Product Details</h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${selectedProduct.image}`}
                  alt={selectedProduct.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
              
              <div className="md:w-1/2">
                <h4 className="text-xl font-semibold mb-2">{selectedProduct.title}</h4>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      ${(selectedProduct.price * (1 - (discounts[selectedProduct._id] || 0) / 100)).toFixed(2)}
                    </span>
                    {discounts[selectedProduct._id] > 0 && (
                      <>
                        <span className="text-lg text-gray-500 line-through">
                          ${selectedProduct.price}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          {discounts[selectedProduct._id]}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantity(selectedProduct._id, "dec")}
                      className="p-2 hover:bg-gray-100 transition duration-200"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">
                      {quantities[selectedProduct._id] || 1}
                    </span>
                    <button
                      onClick={() => handleQuantity(selectedProduct._id, "inc")}
                      className="p-2 hover:bg-gray-100 transition duration-200"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleRemove(selectedProduct._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal> */}







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
                onClick={() => handleQuantity(selectedProduct._id, "dec")}
                className="p-2 hover:bg-gray-100 transition duration-200"
              >
                <AiOutlineMinus />
              </button>
              <span className="px-4 py-2 min-w-[3rem] text-center">
                {quantities[selectedProduct._id] || 1}
              </span>
              <button
                onClick={() => handleQuantity(selectedProduct._id, "inc")}
                className="p-2 hover:bg-gray-100 transition duration-200"
              >
                <AiOutlinePlus />
              </button>
            </div>

            <span className="text-sm text-gray-600">
              Stock Available: <span className="font-medium text-black">{selectedProduct.stock || "N/A"}</span>
            </span>

            <button
               onClick={() => {
    handleRemove(selectedProduct._id);
    setShowProductModal(false);
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