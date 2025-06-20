

// import React, { useState, useRef, useEffect } from 'react';
// import { Search, ShoppingCart, User, Home, Menu, X } from "lucide-react";

// // Mock components for navigation (replace with your actual routing)
// const Link = ({ to, children, onClick }) => (
//   <div onClick={onClick} style={{ cursor: 'pointer' }}>
//     {children}
//   </div>
// );

// // Mock toast for notifications
// const toast = {
//   success: (message) => console.log('Success:', message),
//   error: (message) => console.log('Error:', message)
// };

// // Mock Redux hooks
// const useSelector = (selector) => {
//   return selector({
//     user: {
//       isLoggedIn: true,
//       user: {
//         name: 'Nikhil Domade',
//         email: 'nikhil@gmail.com',
//         role: 'admin' // Change to 'user' to test regular user
//       }
//     },
//     Cart: [1, 2, 3] // Mock cart items
//   });
// };

// const useDispatch = () => {
//   return (action) => console.log('Dispatch:', action);
// };

// const logout = () => ({ type: 'LOGOUT' });

// const Navbar = (props) => {
//   const { user, Cart } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   let isLogin = user.isLoggedIn;
//   const userData = user.user; // Get user data from Redux store

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showProfile, setShowProfile] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   const profileRef = useRef(null);

//   // Categories for the bottom bar
//   const categories = [
//     { name: 'Smartphones', value: 'smartphones' },
//     { name: 'Electronics', value: 'electronics' },
//     { name: 'Jewelry', value: 'jewelery' },
//     { name: "Men's Clothing", value: 'men-clothing' },
//     { name: "Women's Clothing", value: 'women-clothing' },
//     { name: 'Food', value: 'food' },
//     { name: 'Beauty', value: 'beauty' },
//     { name: "Kids' Clothing", value: 'kids-clothing' },
//     { name: 'Footwear', value: 'footwear' }
//   ];

//   // Handle click outside profile popup to close it
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowProfile(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = () => {
//     console.log("Searching:", searchTerm, "Category:", selectedCategory);
//     toast.success(`Searching for "${searchTerm}" in ${selectedCategory || 'All'}`);
//   };

//   const logoutFunction = () => {
//     // Don't logout if user is admin
//     if (userData?.role === 'admin') {
//       toast.error("Admin cannot logout from this session");
//       return;
//     }
    
//     localStorage.removeItem("token");
//     dispatch(logout());
//     toast.success("Logged Out Successfully");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div className='w-full bg-gray-900 shadow-lg text-white'>
//       {/* Main Navbar */}
//       <div className='flex items-center justify-between px-4 py-3 max-w-7xl mx-auto'>
//         {/* Left Side: Logo */}
//         <div className='flex items-center gap-3'>
//           <Link to="/">
//             <div className="flex items-center">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
//                 <span className="text-white font-bold text-lg">S</span>
//               </div>
//               <span className="text-xl font-bold hidden sm:block">ShopEase</span>
//             </div>
//           </Link>
          
//           {/* Admin Button - Only show for admin users */}
//           {isLogin && userData?.role === 'admin' && (
//             <Link to="/Admin">
//               <button className='hidden md:block bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md text-sm'>
//                 Admin Panel
//               </button>
//             </Link>
//           )}
//         </div>

//         {/* Middle: Search Bar - Hidden on mobile, shown in mobile menu */}
//         <div className="hidden md:flex items-center bg-white rounded-lg overflow-hidden w-full max-w-2xl mx-4 shadow-md">
//           <select
//             className="text-sm text-gray-700 bg-gray-50 py-3 px-4 border-r border-gray-200 outline-none min-w-fit"
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             value={selectedCategory}
//           >
//             <option value="">All Categories</option>
//             <option value="men">Men's Fashion</option>
//             <option value="women">Women's Fashion</option>
//             <option value="electronics">Electronics</option>
//             <option value="jewelery">Jewelry</option>
//             <option value="smartphones">Smartphones</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Search for products, brands and more..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="flex-grow px-4 py-3 text-gray-700 text-sm outline-none"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center gap-2"
//           >
//             <Search size={16} />
//           </button>
//         </div>

//         {/* Right Side */}
//         <div className='flex items-center space-x-2 md:space-x-4'>
//           {!isLogin ? (
//             <>
//               <Link to="/Login">
//                 <button className='bg-gradient-to-r from-green-600 to-green-700 py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm md:text-base'>
//                   Login
//                 </button>
//               </Link>
//               <Link to="/Signup">
//                 <button className='bg-gradient-to-r from-blue-600 to-blue-700 py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm md:text-base'>
//                   Sign Up
//                 </button>
//               </Link>
//             </>
//           ) : (
//             <>
//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center space-x-4">
//                 <Link to="/Home">
//                   <button className='flex items-center gap-2 bg-gray-800 py-2 px-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-all duration-200'>
//                     <Home size={16} />
//                     Home
//                   </button>
//                 </Link>

//                 <Link to="/cart">
//                   <div className='relative p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 cursor-pointer'>
//                     <ShoppingCart size={20} />
//                     {Cart.length > 0 && (
//                       <span className='absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white font-bold'>
//                         {Cart.length}
//                       </span>
//                     )}
//                   </div>
//                 </Link>
//               </div>

//               {/* Profile Button + Popup */}
//               <div className="relative" ref={profileRef}>
//                 <button
//                   className='w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full text-gray-700 flex items-center justify-center hover:from-gray-300 hover:to-gray-400 transition-all duration-200 shadow-md'
//                   onClick={() => setShowProfile(!showProfile)}
//                 >
//                   <User size={16} />
//                 </button>

//                 {showProfile && (
//                   <div className='absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-4 text-gray-800 z-50 border border-gray-100'>
//                     <div className="border-b border-gray-200 pb-3 mb-3">
//                       <p className="font-semibold text-lg text-gray-900">
//                         {userData?.name || userData?.firstName || 'User Name'}
//                       </p>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {userData?.email || 'user@example.com'}
//                       </p>
//                       <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
//                         userData?.role === 'admin' 
//                           ? 'bg-blue-100 text-blue-800' 
//                           : 'bg-green-100 text-green-800'
//                       }`}>
//                         Role: {userData?.role || 'User'}
//                       </span>
//                     </div>
                    
//                     {/* Mobile-only options */}
//                     <div className="md:hidden space-y-2 mb-3 border-b border-gray-200 pb-3">
//                       <Link to="/Home" onClick={() => setShowProfile(false)}>
//                         <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
//                           <Home size={16} />
//                           Home
//                         </button>
//                       </Link>
//                       <Link to="/cart" onClick={() => setShowProfile(false)}>
//                         <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
//                           <ShoppingCart size={16} />
//                           Cart {Cart.length > 0 && `(${Cart.length})`}
//                         </button>
//                       </Link>
//                       {userData?.role === 'admin' && (
//                         <Link to="/Admin" onClick={() => setShowProfile(false)}>
//                           <button className="w-full text-left py-2 px-3 text-blue-700 hover:bg-blue-50 rounded-lg">
//                             Admin Panel
//                           </button>
//                         </Link>
//                       )}
//                     </div>
                    
//                     <button
//                       onClick={logoutFunction}
//                       className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                     >
//                       {userData?.role === 'admin' ? 'Switch Account' : 'Logout'}
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-all duration-200"
//                 onClick={() => setShowMobileMenu(!showMobileMenu)}
//               >
//                 {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Mobile Search Bar */}
//       {showMobileMenu && isLogin && (
//         <div className="md:hidden px-4 pb-3 bg-gray-800">
//           <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-md">
//             <select
//               className="text-sm text-gray-700 bg-gray-50 py-2 px-3 border-r border-gray-200 outline-none"
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               value={selectedCategory}
//             >
//               <option value="">All</option>
//               <option value="men">Men</option>
//               <option value="women">Women</option>
//               <option value="electronics">Electronics</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="flex-grow px-3 py-2 text-gray-700 text-sm outline-none"
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-white"
//             >
//               <Search size={16} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Category Bar */}
//       <div className="w-full bg-gray-800 border-t border-gray-700">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex overflow-x-auto py-2 px-4 space-x-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//             {categories.map((category, index) => (
//               <button
//                 key={index}
//                 className="flex-shrink-0 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 whitespace-nowrap"
//                 onClick={() => {
//                   setSelectedCategory(category.value);
//                   toast.success(`Selected ${category.name}`);
//                 }}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .scrollbar-thin {
//           scrollbar-width: thin;
//         }
//         .scrollbar-thumb-gray-600 {
//           scrollbar-color: #4b5563 #374151;
//         }
//         .scrollbar-track-gray-800 {
//           background: #1f2937;
//         }
//         /* Hide scrollbar for Chrome, Safari and Opera */
//         .overflow-x-auto::-webkit-scrollbar {
//           display: none;
//         }
//         /* Hide scrollbar for IE, Edge and Firefox */
//         .overflow-x-auto {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Navbar;



// ✅ 1. Frontend: Place Order Request (React)
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../redux/slices/cartSlice";

// const PlaceOrder = () => {
//   const cart = useSelector(state => state.cart);
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.auth.user); // assuming you're storing user

//   const placeOrder = async () => {
//     try {
//       const orderData = {
//         userId: user._id,
//         items: cart.items.map(item => ({
//           productId: item._id,
//           count: item.count,
//           price: item.price,
//           title: item.title,
// 
//         })),
//         shippingAddress: {
//           fullName: user.name,
//           address: "Rainbow Colony, Kothrud",
//           city: "Pune",
//           state: "MH",
//           pincode: "411038",
//           phone: user.phone,
//         },
//         totalPrice: cart.totalPrice,
//       };

//       const res = await axios.post("/api/orders", orderData);
//       if (res.status === 200 || res.status === 201) {
//         dispatch(clearCart());
//         alert("✅ Order Placed Successfully!");
//       }
//     } catch (error) {
//       console.error("❌ Error placing order:", error.response?.data || error.message);
//       alert("Order failed. Please try again.");
//     }
//   };

//   return (
//     <button onClick={placeOrder} className="px-4 py-2 bg-blue-600 text-white rounded">
//       Place Order
//     </button>
//   );
// };


// ✅ 2. Backend: Order Schema (models/Order.js)
// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   items: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       title: String,
//       quantity: Number,
//       price: Number,
//     },
//   ],
//   shippingAddress: {
//     fullName: String,
//     address: String,
//     city: String,
//     state: String,
//     pincode: String,
//     phone: Number,
//   },
//   totalPrice: Number,
//   status: {
//     type: String,
//     enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
//     default: "Pending",
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);


// ✅ 3. Backend: API Route (routes/orderRoutes.js)

// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Product = require("../models/Product");

// // POST /api/orders
// router.post("/", async (req, res) => {
//   try {
//     const { userId, items, shippingAddress, totalPrice } = req.body;

//     // 1. Update stock for each product
//     for (const item of items) {
//       const product = await Product.findById(item.productId);

//       if (!product) {
//         return res.status(404).json({ message: `Product not found: ${item.productId}` });
//       }

//       if (product.quantity < item.quantity) {
//         return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
//       }

//       product.quantity -= item.quantity;
//       await product.save();
//     }

//     // 2. Save order
//     const newOrder = new Order({
//       userId,
//       items,
//       shippingAddress,
//       totalPrice,
//     });

//     await newOrder.save();

//     res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     console.error("Order error:", error);
//     res.status(500).json({ message: "Something went wrong", error });
//   }
// });

// module.exports = router;



// ✅ 4. Backend: Register Route in server.js or app.js
// const express = require("express");
// const app = express();
// app.use(express.json());

// const orderRoutes = require("./routes/orderRoutes");
// app.use("/api/orders", orderRoutes);


















// ===========================
// 1. BACKEND - Order Model (orders.js)
// ===========================

// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//   name: String,
//   count: { type: Number, required: true },
//   price: { type: Number, required: true },
//   discount: { type: Number, default: 0 },
//   shipping: { type: Number, default: 0 },
//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "on-the-way", "cancelled"],
//     default: "pending",
//   },
//   shippingAddress: {
//     fullName: String,
//     address: String,
//     city: String,
//     pincode: String,
//     phone: String,
//   },
//   orderStatus: {
//     type: String,
//     enum: ["pending", "confirmed", "shipped", "cancelled"],
//     default: "pending",
//   },
//   totalAmount: { type: Number, required: true },
//   paymentInfo: {
//     paymentGroupId: String, // common ID for all orders in one payment
//     method: {
//       type: String,
//       enum: ["Cash on Delivery", "Credit Card", "Debit Card", "UPI", "Net Banking"],
//     },
//     status: {
//       type: String,
//       enum: ["pending", "paid", "failed", "refunded"],
//       default: "pending",
//     },
//     transactionId: String,
//     paymentDate: Date,
//     razorpayOrderId: String,
//     razorpayPaymentId: String,
//     razorpaySignature: String,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);

// // ===========================
// // 2. BACKEND - Order Controller (orderController.js)
// // ===========================

// const Order = require('../models/Order');
// const User = require('../models/User');
// const Product = require('../models/Product');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const { v4: uuidv4 } = require('uuid');

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Razorpay Order
// const createRazorpayOrder = async (req, res) => {
//   try {
//     const { cartItems, shippingAddress, totalAmount } = req.body;
//     const userId = req.user.id;

//     // Validate cart items
//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ message: 'Cart is empty' });
//     }

//     // Create Razorpay order
//     const options = {
//       amount: totalAmount * 100, // Convert to paise
//       currency: 'INR',
//       receipt: `order_${Date.now()}`,
//       payment_capture: 1
//     };

//     const razorpayOrder = await razorpay.orders.create(options);
    
//     // Generate payment group ID for all orders in this transaction
//     const paymentGroupId = uuidv4();

//     // Create pending orders for each cart item
//     const orderPromises = cartItems.map(async (item) => {
//       const product = await Product.findById(item.productId);
//       if (!product) {
//         throw new Error(`Product not found: ${item.productId}`);
//       }

//       const order = new Order({
//         userId,
//         productId: item.productId,
//         name: product.name,
//         count: item.count,
//         price: item.price,
//         discount: item.discount || 0,
//         shipping: item.shipping || 0,
//         shippingAddress,
//         totalAmount: (item.price - (item.discount || 0)) * item.count + (item.shipping || 0),
//         paymentInfo: {
//           paymentGroupId,
//           method: 'UPI', // Will be updated based on actual payment method
//           status: 'pending',
//           razorpayOrderId: razorpayOrder.id,
//         }
//       });

//       return order.save();
//     });

//     const orders = await Promise.all(orderPromises);

//     res.status(200).json({
//       success: true,
//       razorpayOrder,
//       orders: orders.map(order => order._id),
//       paymentGroupId
//     });

//   } catch (error) {
//     console.error('Error creating Razorpay order:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// // Verify Razorpay Payment
// const verifyRazorpayPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentGroupId } = req.body;

//     // Verify signature
//     const sign = razorpay_order_id + '|' + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest('hex');

//     if (razorpay_signature !== expectedSign) {
//       return res.status(400).json({ message: 'Invalid payment signature' });
//     }

//     // Update all orders with this payment group ID
//     const updateResult = await Order.updateMany(
//       { 'paymentInfo.paymentGroupId': paymentGroupId },
//       {
//         $set: {
//           'paymentInfo.status': 'paid',
//           'paymentInfo.razorpayPaymentId': razorpay_payment_id,
//           'paymentInfo.razorpaySignature': razorpay_signature,
//           'paymentInfo.paymentDate': new Date(),
//           'paymentInfo.transactionId': razorpay_payment_id,
//           'status': 'confirmed',
//           'orderStatus': 'confirmed'
//         }
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Payment verified successfully',
//       ordersUpdated: updateResult.modifiedCount
//     });

//   } catch (error) {
//     console.error('Error verifying payment:', error);
//     res.status(500).json({ message: 'Payment verification failed', error: error.message });
//   }
// };

// // Handle Payment Failure
// const handlePaymentFailure = async (req, res) => {
//   try {
//     const { paymentGroupId, error } = req.body;

//     // Update all orders with this payment group ID to failed
//     await Order.updateMany(
//       { 'paymentInfo.paymentGroupId': paymentGroupId },
//       {
//         $set: {
//           'paymentInfo.status': 'failed',
//           'status': 'cancelled',
//           'orderStatus': 'cancelled'
//         }
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Payment failure handled'
//     });

//   } catch (error) {
//     console.error('Error handling payment failure:', error);
//     res.status(500).json({ message: 'Error handling payment failure', error: error.message });
//   }
// };

// // Get User Orders
// const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const orders = await Order.find({ userId })
//       .populate('productId', 'name images category')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const totalOrders = await Order.countDocuments({ userId });

//     res.status(200).json({
//       success: true,
//       orders,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(totalOrders / limit),
//         totalOrders,
//         hasNext: page < Math.ceil(totalOrders / limit),
//         hasPrev: page > 1
//       }
//     });

//   } catch (error) {
//     console.error('Error fetching user orders:', error);
//     res.status(500).json({ message: 'Error fetching orders', error: error.message });
//   }
// };

// // Get Single Order
// const getOrderById = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const userId = req.user.id;

//     const order = await Order.findOne({ _id: orderId, userId })
//       .populate('productId', 'name images category description')
//       .populate('userId', 'name email phone');

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json({
//       success: true,
//       order
//     });

//   } catch (error) {
//     console.error('Error fetching order:', error);
//     res.status(500).json({ message: 'Error fetching order', error: error.message });
//   }
// };

// // Cancel Order (User)
// const cancelOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const userId = req.user.id;

//     const order = await Order.findOne({ _id: orderId, userId });

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     if (order.status === 'shipped' || order.status === 'cancelled') {
//       return res.status(400).json({ message: 'Order cannot be cancelled' });
//     }

//     order.status = 'cancelled';
//     order.orderStatus = 'cancelled';
//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: 'Order cancelled successfully',
//       order
//     });

//   } catch (error) {
//     console.error('Error cancelling order:', error);
//     res.status(500).json({ message: 'Error cancelling order', error: error.message });
//   }
// };

// // ===========================
// // ADMIN FUNCTIONS
// // ===========================

// // Get All Orders (Admin)
// const getAllOrders = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;
//     const skip = (page - 1) * limit;
//     const status = req.query.status;

//     let query = {};
//     if (status) {
//       query.status = status;
//     }

//     const orders = await Order.find(query)
//       .populate('userId', 'name email phone')
//       .populate('productId', 'name images category')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const totalOrders = await Order.countDocuments(query);

//     // Get order statistics
//     const stats = await Order.aggregate([
//       {
//         $group: {
//           _id: '$status',
//           count: { $sum: 1 },
//           totalAmount: { $sum: '$totalAmount' }
//         }
//       }
//     ]);

//     res.status(200).json({
//       success: true,
//       orders,
//       stats,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(totalOrders / limit),
//         totalOrders,
//         hasNext: page < Math.ceil(totalOrders / limit),
//         hasPrev: page > 1
//       }
//     });

//   } catch (error) {
//     console.error('Error fetching all orders:', error);
//     res.status(500).json({ message: 'Error fetching orders', error: error.message });
//   }
// };

// // Update Order Status (Admin)
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status, orderStatus } = req.body;

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     if (status) order.status = status;
//     if (orderStatus) order.orderStatus = orderStatus;

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: 'Order status updated successfully',
//       order
//     });

//   } catch (error) {
//     console.error('Error updating order status:', error);
//     res.status(500).json({ message: 'Error updating order status', error: error.message });
//   }
// };

// module.exports = {
//   createRazorpayOrder,
//   verifyRazorpayPayment,
//   handlePaymentFailure,
//   getUserOrders,
//   getOrderById,
//   cancelOrder,
//   getAllOrders,
//   updateOrderStatus
// };

// // ===========================
// // 3. BACKEND - Routes (orderRoutes.js)
// // ===========================

// const express = require('express');
// const router = express.Router();
// const {
//   createRazorpayOrder,
//   verifyRazorpayPayment,
//   handlePaymentFailure,
//   getUserOrders,
//   getOrderById,
//   cancelOrder,
//   getAllOrders,
//   updateOrderStatus
// } = require('../controllers/orderController');
// const { authenticate, isAdmin } = require('../middleware/auth');

// // User Routes
// router.post('/create-razorpay-order', authenticate, createRazorpayOrder);
// router.post('/verify-payment', authenticate, verifyRazorpayPayment);
// router.post('/payment-failure', authenticate, handlePaymentFailure);
// router.get('/my-orders', authenticate, getUserOrders);
// router.get('/order/:orderId', authenticate, getOrderById);
// router.put('/cancel/:orderId', authenticate, cancelOrder);

// // Admin Routes
// router.get('/admin/all-orders', authenticate, isAdmin, getAllOrders);
// router.put('/admin/update-status/:orderId', authenticate, isAdmin, updateOrderStatus);

// module.exports = router;

// // ===========================
// // 4. FRONTEND - Checkout Component (React)
// // ===========================

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingAddress, setShippingAddress] = useState({
//     fullName: '',
//     address: '',
//     city: '',
//     pincode: '',
//     phone: ''
//   });
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   useEffect(() => {
//     // Load cart items from localStorage or API
//     loadCartItems();
//     loadRazorpayScript();
//   }, []);

//   const loadCartItems = () => {
//     // Get cart items from localStorage or API call
//     const items = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCartItems(items);
//     calculateTotal(items);
//   };

//   const calculateTotal = (items) => {
//     const total = items.reduce((sum, item) => {
//       return sum + ((item.price - (item.discount || 0)) * item.count) + (item.shipping || 0);
//     }, 0);
//     setTotalAmount(total);
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleAddressChange = (e) => {
//     setShippingAddress({
//       ...shippingAddress,
//       [e.target.name]: e.target.value
//     });
//   };

//   const validateAddress = () => {
//     const { fullName, address, city, pincode, phone } = shippingAddress;
//     return fullName && address && city && pincode && phone;
//   };

//   const handleCheckout = async () => {
//     if (!validateAddress()) {
//       alert('Please fill in all shipping address fields');
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert('Your cart is empty');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create Razorpay order
//       const response = await axios.post('/api/orders/create-razorpay-order', {
//         cartItems,
//         shippingAddress,
//         totalAmount
//       }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       const { razorpayOrder, paymentGroupId } = response.data;

//       // Open Razorpay checkout
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         name: 'Your Store Name',
//         description: 'Order Payment',
//         order_id: razorpayOrder.id,
//         handler: async function (response) {
//           await handlePaymentSuccess(response, paymentGroupId);
//         },
//         prefill: {
//           name: shippingAddress.fullName,
//           email: '', // Add user email
//           contact: shippingAddress.phone
//         },
//         theme: {
//           color: '#3399cc'
//         },
//         modal: {
//           ondismiss: function() {
//             handlePaymentFailure(paymentGroupId, 'Payment cancelled by user');
//           }
//         }
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();

//     } catch (error) {
//       console.error('Error during checkout:', error);
//       alert('Error during checkout. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePaymentSuccess = async (response, paymentGroupId) => {
//     setPaymentLoading(true);

//     try {
//       const verifyResponse = await axios.post('/api/orders/verify-payment', {
//         razorpay_order_id: response.razorpay_order_id,
//         razorpay_payment_id: response.razorpay_payment_id,
//         razorpay_signature: response.razorpay_signature,
//         paymentGroupId
//       }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (verifyResponse.data.success) {
//         // Clear cart
//         localStorage.removeItem('cartItems');
//         alert('Payment successful! Your order has been placed.');
//         // Redirect to orders page
//         window.location.href = '/orders';
//       }

//     } catch (error) {
//       console.error('Payment verification failed:', error);
//       alert('Payment verification failed. Please contact support.');
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   const handlePaymentFailure = async (paymentGroupId, error) => {
//     try {
//       await axios.post('/api/orders/payment-failure', {
//         paymentGroupId,
//         error
//       }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       alert('Payment failed. Please try again.');
//     } catch (err) {
//       console.error('Error handling payment failure:', err);
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Checkout</h2>
      
//       {/* Cart Items */}
//       <div className="cart-items">
//         <h3>Order Summary</h3>
//         {cartItems.map((item, index) => (
//           <div key={index} className="cart-item">
//             <h4>{item.name}</h4>
//             <p>Quantity: {item.count}</p>
//             <p>Price: ₹{item.price}</p>
//             <p>Total: ₹{(item.price - (item.discount || 0)) * item.count}</p>
//           </div>
//         ))}
//         <div className="total">
//           <h3>Total Amount: ₹{totalAmount}</h3>
//         </div>
//       </div>

//       {/* Shipping Address */}
//       <div className="shipping-address">
//         <h3>Shipping Address</h3>
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={shippingAddress.fullName}
//           onChange={handleAddressChange}
//           required
//         />
//         <textarea
//           name="address"
//           placeholder="Address"
//           value={shippingAddress.address}
//           onChange={handleAddressChange}
//           required
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={shippingAddress.city}
//           onChange={handleAddressChange}
//           required
//         />
//         <input
//           type="text"
//           name="pincode"
//           placeholder="Pincode"
//           value={shippingAddress.pincode}
//           onChange={handleAddressChange}
//           required
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={shippingAddress.phone}
//           onChange={handleAddressChange}
//           required
//         />
//       </div>

//       {/* Checkout Button */}
//       <button 
//         onClick={handleCheckout}
//         disabled={loading || paymentLoading}
//         className="checkout-btn"
//       >
//         {loading ? 'Processing...' : paymentLoading ? 'Verifying Payment...' : 'Checkout Now'}
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;

// // ===========================
// // 5. FRONTEND - User Orders Page
// // ===========================

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({});

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async (page = 1) => {
//     try {
//       const response = await axios.get(`/api/orders/my-orders?page=${page}`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       setOrders(response.data.orders);
//       setPagination(response.data.pagination);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelOrder = async (orderId) => {
//     if (window.confirm('Are you sure you want to cancel this order?')) {
//       try {
//         await axios.put(`/api/orders/cancel/${orderId}`, {}, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         alert('Order cancelled successfully');
//         fetchOrders();
//       } catch (error) {
//         console.error('Error cancelling order:', error);
//         alert('Error cancelling order');
//       }
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="orders-container">
//       <h2>My Orders</h2>
      
//       {orders.length === 0 ? (
//         <p>No orders found</p>
//       ) : (
//         orders.map(order => (
//           <div key={order._id} className="order-card">
//             <div className="order-header">
//               <h3>Order #{order._id.slice(-8)}</h3>
//               <span className={`status ${order.status}`}>{order.status}</span>
//             </div>
            
//             <div className="order-details">
//               <p><strong>Product:</strong> {order.name}</p>
//               <p><strong>Quantity:</strong> {order.count}</p>
//               <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
//               <p><strong>Payment Status:</strong> {order.paymentInfo.status}</p>
//               <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
//             </div>

//             <div className="order-actions">
//               {order.status === 'pending' && (
//                 <button 
//                   onClick={() => handleCancelOrder(order._id)}
//                   className="cancel-btn"
//                 >
//                   Cancel Order
//                 </button>
//               )}
//             </div>
//           </div>
//         ))
//       )}

//       {/* Pagination */}
//       <div className="pagination">
//         {pagination.hasPrev && (
//           <button onClick={() => fetchOrders(pagination.currentPage - 1)}>
//             Previous
//           </button>
//         )}
//         <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
//         {pagination.hasNext && (
//           <button onClick={() => fetchOrders(pagination.currentPage + 1)}>
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserOrdersPage;

// // ===========================
// // 6. FRONTEND - Admin Orders Page
// // ===========================

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [pagination, setPagination] = useState({});

//   useEffect(() => {
//     fetchOrders();
//   }, [selectedStatus]);

//   const fetchOrders = async (page = 1) => {
//     try {
//       let url = `/api/orders/admin/all-orders?page=${page}`;
//       if (selectedStatus) {
//         url += `&status=${selectedStatus}`;
//       }

//       const response = await axios.get(url, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       setOrders(response.data.orders);
//       setStats(response.data.stats);
//       setPagination(response.data.pagination);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus, newOrderStatus) => {
//     try {
//       await axios.put(`/api/orders/admin/update-status/${orderId}`, {
//         status: newStatus,
//         orderStatus: newOrderStatus
//       }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       alert('Order status updated successfully');
//       fetchOrders();
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Error updating order status');
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="admin-orders-container">
//       <h2>Order Management</h2>

//       {/* Stats */}
//       <div className="order-stats">
//         {stats.map(stat => (
//           <div key={stat._id} className="stat-card">
//             <h3>{stat._id}</h3>
//             <p>Count: {stat.count}</p>
//             <p>Total: ₹{stat.totalAmount}</p>
//           </div>
//         ))}
//       </div>

//       {/* Filter */}
//       <div className="filters">
//         <select 
//           value={selectedStatus} 
//           onChange={(e) => setSelectedStatus(e.target.value)}
//         >
//           <option value="">All Orders</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="on-the-way">On the Way</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* Orders Table */}
//       <div className="orders-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer</th>
//               <th>Product</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Payment</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order._id}>
//                 <td>#{order._id.slice(-8)}</td>
//                 <td>{order.userId.name}</td>
//                 <td>{order.name}</td>
//                 <td>₹{order.totalAmount}</td>
//                 <td>
//                   <select 
//                     value={order.status} 
//                     onChange={(e) => updateOrderStatus(order._id, e.target.value, e.target.value)}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="confirmed">Confirmed</option>
//                     <option value="on-the-way">On the Way</option>
//                     <option value="cancelled">Cancelled</option>
//                   </select>
//                 </td>
//                 <td className={order.paymentInfo.status}>
//                   {order.paymentInfo.status}
//                 </td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <button onClick={() => console.log('View details', order._id)}>
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="pagination">
//         {pagination.hasPrev && (
//           <button onClick={() => fetchOrders(pagination.currentPage - 1)}>
//             Previous
//           </button>
//         )}
//         <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
//         {pagination.hasNext && (
//           <button onClick={() => fetchOrders(pagination.currentPage + 1)}>
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrdersPage;

// ===========================
// 7. Environment Variables (.env)
// ===========================

/*
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
*/

// ===========================
// 8. Package.json dependencies
// ===========================

/*
Backend dependencies:
npm install razorpay crypto uuid

Frontend dependencies:
npm install axios
*/