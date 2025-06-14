
// import {AiFillDelete} from "react-icons/ai"
// import { useDispatch } from "react-redux";
// import { remove } from "../redux/Slices/CartSlice";
// import { toast } from "react-hot-toast";

// const CartItem = ({item, itemIndex}) => {
//   const dispatch = useDispatch();

//   const removeFromCart = () => {
//     dispatch(remove(item._id));
//     toast.success("Item Removed");
//   }

//   return (
//    < div className='p-2 space-y-10 space-x-5 w-[390px]'>
// <div className='flex flex-col item-center justify-between md:hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl outline h-[376px]'>
// <div><p className='text-gray-700 font-semibold text-lg truncate w-40 mt-1 mx-auto'>{item.title}</p></div>
// <div>
//   <p className='w-40 text-gray-400 font-normal text-[10px] mx-auto'>{item.description.split(" ").slice(0,10).join(" ")+"..."}</p>
// </div>
// <div className='h-[180px]'>
//   {/* <img src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`} className='h-full w-full'></img>    */}
//   {/* this for the render url */}
//   <img src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`} className='h-full w-full'></img>   
  
//     </div>
// <div className='flex justify-between gap-12 items-center w-full mt-5'>
//   <div>
//       <p className='text-green-600 font-semibold'>${item.price}</p>
//   </div>
//   <div className="text-red-800  bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
//             onClick={removeFromCart}>
//               <AiFillDelete/>
//             </div>

// </div>
// </div>
// </div>
//   );
// };

// export default CartItem;

// Redesigned Cart Page Component
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import Modal from "react-modal";

const Cart = () => {
  const cartItems = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [showSummary, setShowSummary] = useState(false);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item._id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * (quantities[item._id] || 1),
    0
  );
  const discount = 0;
  const shipping = 5.9;

  const handleRemove = (id) => {
    dispatch(remove(id));
    toast.success("Item Removed");
  };

  const handleQuantity = (id, type) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      if (type === "inc") updated[id] += 1;
      else if (type === "dec" && updated[id] > 1) updated[id] -= 1;
      return updated;
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <button className="bg-black text-white px-4 py-2 rounded">CONTINUE SHOPPING</button>
        <div className="text-sm">
          <span className="mr-4">Shopping Bag ({cartItems.length})</span>
          <span>Your Wishlist (0)</span>
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded md:block hidden"
          onClick={() => setShowSummary(true)}
        >
          CHECKOUT NOW
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto max-h-[600px] pr-2">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 items-center border-b p-3 mb-2 hover:shadow-lg rounded"
          >
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
              alt={item.title}
              className="w-28 h-28 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold truncate">{item.title}</h2>
              <p className="text-sm text-gray-500 truncate w-[200px]">
                {item.description.length > 60 ? item.description.slice(0, 60) + "..." : item.description}
              </p>
              <p className="text-green-600 font-bold mt-1">${item.price}</p>
              <div className="flex items-center mt-2 gap-2">
                <button onClick={() => handleQuantity(item._id, "dec")} className="px-2 border">-</button>
                <span>{quantities[item._id]}</span>
                <button onClick={() => handleQuantity(item._id, "inc")} className="px-2 border">+</button>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item._id)}
              className="text-red-600 hover:text-red-800 text-xl"
            >
              <AiFillDelete />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary (sticky on desktop) */}
      <div className="w-full md:w-[300px] md:sticky md:top-10 bg-gray-100 p-4 rounded shadow-md hidden md:block">
        <h3 className="text-xl font-semibold mb-4">ORDER SUMMARY</h3>
        <div className="space-y-2">
          <div className="flex justify-between"><span>Subtotal</span><span>${totalAmount}</span></div>
          <div className="flex justify-between"><span>Estimated Shipping</span><span>${shipping}</span></div>
          <div className="flex justify-between"><span>Shipping Discount</span><span>-${discount}</span></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>${totalAmount + shipping - discount}</span></div>
        </div>
        <button className="bg-black text-white w-full mt-4 py-2 rounded">CHECKOUT NOW</button>
      </div>

      {/* Mobile Modal Order Summary */}
      <Modal
        isOpen={showSummary}
        onRequestClose={() => setShowSummary(false)}
        className="bg-white p-4 rounded shadow-md max-w-sm mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <h3 className="text-xl font-semibold mb-4">ORDER SUMMARY</h3>
        <div className="space-y-2">
          <div className="flex justify-between"><span>Subtotal</span><span>${totalAmount}</span></div>
          <div className="flex justify-between"><span>Estimated Shipping</span><span>${shipping}</span></div>
          <div className="flex justify-between"><span>Shipping Discount</span><span>-${discount}</span></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>${totalAmount + shipping - discount}</span></div>
        </div>
        <button
          className="bg-black text-white w-full mt-4 py-2 rounded"
          onClick={() => {
            setShowSummary(false);
            toast.success("Proceeding to payment");
          }}
        >
          CONFIRM & PAY
        </button>
      </Modal>
    </div>
  );
};

export default Cart;
