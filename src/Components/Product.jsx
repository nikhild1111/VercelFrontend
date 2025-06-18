// import React from 'react'
// import toast from 'react-hot-toast';
// import {add,remove} from '../redux/Slices/CartSlice';
// import { useDispatch, useSelector } from 'react-redux'
// import { CartSlice } from '../redux/Slices/CartSlice';
// import { loginSuccess, logout} from '../redux/Slices/userSlice.js'; 
// const Product = (props) => {

//   const { user,Cart} = useSelector((state) => state);
//  const dispatch=useDispatch();
//   let isLogin=user.isLoggedIn;
//   let post=props.post;
//   const addToCart=()=>{
//     if(isLogin){
//       dispatch(add(post));
//       toast.success("Item added to Cart ");
//     }else{
//       toast.success("Please Log in First ");
//     }
  
//   }
//   const removeFromCart=()=>{
//     if(isLogin){
//       dispatch(remove(post.id));
//       toast.error("Item remove from Cart ");
//     }
//     else{
//       toast.success("Please Log in first ");
//     }   
//   }
//   return (
//     <div className='flex flex-col item-center justify-between md:hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl outline h-[376px]'>
//       <div><p className='text-gray-700 font-bold text-lg truncate w-40 mt-1 mx-auto'>{post.title}</p></div>
//       <div>
//         <p className='w-40 text-gray-500 font-normal text-[10px] mx-auto'>{post.description.split(" ").slice(0,10).join(" ")+"..."}</p>
//       </div>
//       <div className='h-[180px]'>
//       <img src={`${process.env.REACT_APP_BACKEND_URL}${post.image}`} className='h-full w-full' />      </div>
// <div className='flex justify-between gap-12 items-center w-full mt-5'>
//         <div>
//             <p className='text-green-600 font-semibold'>${post.price}</p>
//         </div>
//         {
//           Cart.some((p)=>p.id==post.id)?(<button className='text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in' onClick={removeFromCart}>Remove Item</button>):(<button className='text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in' onClick={addToCart}>Add Item</button>)
//         }

// </div>
//     </div>
//   )
// }

// export default Product

// ***********************
// 
// this was we have creted and its a best onq
// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { add, remove } from '../redux/Slices/CartSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import Modal from 'react-modal';

// const Product = (props) => {
//   const { user, Cart } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const isLogin = user.isLoggedIn;
//   const post = props.post;

// Modal.setAppElement('#root');
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const addToCart = () => {
//     if (isLogin) {
//       dispatch(add(post));
//       toast.success("Item added to Cart");
//     } else {
//       toast.error("Please log in first");
//     }
//   };

//   const removeFromCart = () => {
//     if (isLogin) {
//       dispatch(remove(post._id));
//       toast.error("Item removed from Cart");
//     } else {
//       toast.error("Please log in first");
//     }
//   };

//   return (
//     <>
//       <div
//         className='flex flex-col items-start justify-between hover:shadow-lg shadow-md border border-gray-500 transition duration-300 ease-in gap-3 p-3 mt-10 mx-auto rounded-xl xs:h-[416px] md:hover:scale-110  xs:w-[322px] h-[360px]  w-[280px] cursor-pointer bg-white'
//         onClick={() => setModalIsOpen(true)}
//       >
//         <p className='text-gray-800 font-bold text-[16px] w-full pl-1 truncate'>{post.title}</p>

//         {/* Image Container with Improved Responsiveness
//         <div className='h-[250px] w-full overflow-hidden border border-gray-300 rounded-md flex justify-center items-center bg-white'>
//           <img
//             src={`${process.env.REACT_APP_BACKEND_URL}${post.image}`}
//             alt='Product'
//             className='object-contain w-auto h-[100px] sm:h-[130px] md:h-[150px]'
//           />
//         </div> */}
//         {/* Image Container with Improved Responsiveness */}
// <div className='h-[240px] w-full overflow-hidden border border-gray-200 rounded-md flex justify-center items-center bg-white xs:h-[270px]'>
//   <img
//     src={`${process.env.REACT_APP_BACKEND_URL}${post.image}`}
//     alt='Product'
//     className='object-contain w-auto h-[160px] sm:h-[180px] md:h-[200px] xs:h-[230px]'
//   />
// </div>


//         <p className='text-gray-500 text-[12px] w-full pl-1 line-clamp-2'>
//           {post.description.split(" ").slice(0, 25).join(" ")}...
//         </p>

//         <div className='flex justify-between items-center w-full mt-2 px-1'>
//           <p className='text-green-600 font-semibold text-[14px]'>${post.price}</p>
//           {Cart.some((p) => p._id === post._id) ? (
//             <button
//               className='text-gray-700 border border-gray-700 rounded-full text-[10px] p-1 px-2 hover:bg-gray-700 hover:text-white transition duration-300 ease-in'
//               onClick={(e) => {
//                 e.stopPropagation();
//                 removeFromCart();
//               }}
//             >
//               Remove
//             </button>
//           ) : (
//             <button
//               className='text-gray-700 border border-gray-700 rounded-full text-[10px] p-1 px-2 hover:bg-gray-700 hover:text-white transition duration-300 ease-in'
//               onClick={(e) => {
//                 e.stopPropagation();
//                 addToCart();
//               }}
//             >
//               Add
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Modal for Full Product View */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         className="bg-white p-6 rounded-xl shadow-2xl w-[95%] md:w-[860px] max-h-[90vh] overflow-auto mx-auto mt-10 outline-none border border-gray-300 transition-all duration-500 ease-in-out"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//       >
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Image Box */}
//           <div className="flex-1 flex items-center justify-center border border-gray-200 rounded-md bg-gray-50 p-4">
//             <img
//               src={`${process.env.REACT_APP_BACKEND_URL}${post.image}`}
//               alt="Product"
//               className="object-contain w-full h-[220px] sm:h-[250px] md:h-[300px] lg:h-[380px]"
//             />
//           </div>

//           {/* Content Area */}
//           <div className="flex-1 flex flex-col gap-4">
//             <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
//             <p className="text-gray-600 text-[15px]">{post.description}</p>
//             <p className="text-green-600 text-lg font-semibold">₹{post.price}</p>
//             <p className="text-gray-500 text-sm">Stock Available: {post.quantity || 'N/A'}</p>

//             {/* Modal Buttons */}
//             <div className="flex flex-wrap items-center gap-4 mt-2">
//               {Cart.some((p) => p._id === post._id) ? (
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
//                   onClick={removeFromCart}
//                 >
//                   Remove from Cart
//                 </button>
//               ) : (
//                 <button
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
//                   onClick={addToCart}
//                 >
//                   Add to Cart
//                 </button>
//               )}

//               <button
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-300"
//                 onClick={() => setModalIsOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default Product;



import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { add, remove } from '../redux/Slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { syncCartToBackend } from "../redux/thunks/cartThunks"; // your thunk

const Product = ({ post }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.Cart.items); // ✅ Corrected from Cart
  const isLogin = useSelector((state) => state.user.isLoggedIn); // ✅ Clean access to isLoggedIn
  const [modalIsOpen, setModalIsOpen] = useState(false);

  Modal.setAppElement('#root');

  const addToCart = () => {
    // if (isLogin) {
      dispatch(add(post));
      dispatch(syncCartToBackend());
    //   toast.success("Item added to Cart");
    // } else {
    //   toast.error("Please log in first");
    // }
  };

  const removeFromCart = () => {
    // if (isLogin) { temprero remove 
      dispatch(remove(post._id));
        dispatch(syncCartToBackend());
      toast.error("Item removed from Cart");
    // } else {
      // toast.error("Please log in first");
    // }
  };

  const isInCart = Array.isArray(cartItems) && cartItems.some((item) => item._id === post._id);

  return (
    <>
      <div
        className='flex flex-col items-start justify-between hover:shadow-lg shadow-md border border-gray-500 transition duration-300 ease-in gap-3 p-3 mt-10 mx-auto rounded-xl xs:h-[416px] md:hover:scale-110 xs:w-[322px] h-[360px] w-[280px] cursor-pointer bg-white'
        onClick={() => setModalIsOpen(true)}
      >
        <p className='text-gray-800 font-bold text-[16px] w-full pl-1 truncate'>{post.title}</p>

        <div className='h-[240px] w-full overflow-hidden border border-gray-200 rounded-md flex justify-center items-center bg-white xs:h-[270px]'>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${post.image}`}
            alt='Product'
            className='object-contain w-auto h-[160px] sm:h-[180px] md:h-[200px] xs:h-[230px]'
          />
        </div>

        <p className='text-gray-500 text-[12px] w-full pl-1 line-clamp-2'>
          {post.description.split(" ").slice(0, 25).join(" ")}...
        </p>

        <div className='flex justify-between items-center w-full mt-2 px-1'>
          <p className='text-green-600 font-semibold text-[14px]'>${post.price}</p>
          {isInCart ? (
            <button
              className='text-gray-700 border border-gray-700 rounded-full text-[10px] p-1 px-2 hover:bg-gray-700 hover:text-white transition duration-300 ease-in'
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart();
              }}
            >
              Remove
            </button>
          ) : (
            <button
              className='text-gray-700 border border-gray-700 rounded-full text-[10px] p-1 px-2 hover:bg-gray-700 hover:text-white transition duration-300 ease-in'
              onClick={(e) => {
                e.stopPropagation();
                addToCart();
              }}
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Modal for Full Product View */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-xl shadow-2xl w-[95%] md:w-[860px] max-h-[90vh] overflow-auto mx-auto mt-10 outline-none border border-gray-300 transition-all duration-500 ease-in-out"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Box */}
          <div className="flex-1 flex items-center justify-center border border-gray-200 rounded-md bg-gray-50 p-4">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${post.image}`}
              alt="Product"
              className="object-contain w-full h-[220px] sm:h-[250px] md:h-[300px] lg:h-[380px]"
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
            <p className="text-gray-600 text-[15px]">{post.description}</p>
            <p className="text-green-600 text-lg font-semibold">₹{post.price}</p>
            <p className="text-gray-500 text-sm">Stock Available: {post.quantity || 'N/A'}</p>

            {/* Modal Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              {isInCart ? (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
                  onClick={removeFromCart}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              )}

              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-300"
                onClick={() => setModalIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Product;
