// // ✅ Updated UserPanel with Redux Order Filter Slice, Thunks, and Pagination
// import React, { useState, useEffect } from "react";
// import {
//   LogOut, ShoppingCart, Package, User, Upload, Search, Filter, X,
//   Calendar, CreditCard, Truck, Menu, Mail, Phone
// } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateOrderPage, setOrderFilters } from "../redux/Slices/orderFiltersSlice";
// import { fetchFilteredOrders } from "../redux/thunks/fetchFilteredOrders";
// import Footer from "../Components/Footer";

// const UserPanel = () => {
//   const dispatch = useDispatch();
//   const { orders, userDetails } = useSelector(state => state.orders);
//   const { page, totalPages, keyword, status, date, sort } = useSelector(state => state.orderFilters);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const { user } = useSelector((state) => state);

//   const userinfo=user.user;

//   useEffect(() => {
//     dispatch(fetchFilteredOrders());
//   }, [dispatch, page, keyword, status, date, sort]);


//     const userProfile = {
//     name: userinfo.name,
//     email: userinfo.email,
//     phone: userinfo.phone,
//     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
//   };

//   const handlePageChange = (newPage) => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     dispatch(updateOrderPage(newPage));
//   };

//   const handleFilterChange = (field, value) => {
//     dispatch(setOrderFilters({ [field]: value, page: 1 }));
//   };

//   const clearFilters = () => {
//     dispatch(setOrderFilters({ keyword: "", status: "", date: "", sort: "recent", page: 1 }));
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "confirmed": return "bg-green-100 text-green-800 border-green-200";
//       case "cancelled": return "bg-red-100 text-red-800 border-red-200";
//       default: return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };


//     const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };


//     const openModal = (order) => {
//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//   };


//    const logoutFunction = () => {
//       localStorage.removeItem("lastPath");
//        localStorage.removeItem("cart");
//       localStorage.removeItem("token");
//         dispatch(clearCart());
//       dispatch(logout());
//       navigate("/")
//       toast.error("Logged Out");
//     };
  
//   // ADDED: Function to generate pagination numbers with ellipsis logic
//   const generatePaginationNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if total pages are less than max visible
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Complex logic for showing pages with ellipsis
//       if (page <= 3) {
//         // Show first 3 pages, ellipsis, and last page
//         pages.push(1, 2, 3, '...', totalPages);
//       } else if (page >= totalPages - 2) {
//         // Show first page, ellipsis, and last 3 pages
//         pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         // Show first page, ellipsis, current page with neighbors, ellipsis, last page
//         pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
//       }
//     }
    
//     return pages;
//   };


//   return (
  
  
  
  
  
//    <div className="min-h-screen bg-gray-50 flex relative">
//         {/* Mobile Menu Overlay */}
//         {showMobileMenu && (
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//             onClick={() => setShowMobileMenu(false)}
//           />
//         )}
  
//         {/* Sidebar */}
//         <aside className={`w-64 bg-white shadow-lg p-6 fixed lg:relative h-full z-50 transform transition-transform duration-300 ease-in-out ${
//           showMobileMenu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         }`}>
//           {/* User Profile Section */}
//           <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
//             <img
//               src={userProfile.avatar}
//               alt={userProfile.name}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div className="flex-1 min-w-0">
//               <h3 className="font-semibold text-gray-800 truncate">{userProfile.name}</h3>
//               <p className="text-sm text-gray-500 truncate">{userProfile.email}</p>
//             </div>
//           </div>
  
//           {/* User Details Card */}
//           <div className="bg-gray-50 rounded-lg p-4 mb-6">
//             <h4 className="font-medium text-gray-800 mb-3">Contact Info</h4>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-center gap-2">
//                 <Mail size={14} className="text-gray-400" />
//                 <span className="text-gray-600 truncate">{userProfile.email}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone size={14} className="text-gray-400" />
//                 <span className="text-gray-600">{userProfile.phone}</span>
//               </div>
//             </div>
//           </div>
          
//           <nav className="flex flex-col gap-3">
//             <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
//               <ShoppingCart size={18} />
//               My Orders
//             </a>
//             <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//               <User size={18} />
//               My Profile
//             </a>
//             <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//               <Upload size={18} />
//               Sell Product
//             </a>
//             <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//               <Package size={18} />
//               Inventory
//             </a>
//             <button className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors mt-4"
//              onClick={() =>logoutFunction() }
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           </nav>
//         </aside>
  
  
//         {/* Main Content */}
//         <main className="flex-1 p-4 lg:p-6">
//           {/* Mobile Header */}
//           <div className="flex items-center justify-between mb-6 lg:hidden">
//             <button
//               onClick={() => setShowMobileMenu(true)}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <Menu size={24} />
//             </button>
//             <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
//             <div className="w-8" /> {/* Spacer for centering */}
//           </div>
  
//           {/* Desktop Header */}
//           <div className="hidden lg:block mb-8">
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
//             <p className="text-gray-600">Manage your orders and track your purchases</p>
//           </div>
  
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Total Orders</p>
//                   <h3 className="text-2xl font-bold text-gray-800">{`${userinfo.totalOrders}`}</h3>
//                 </div>
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <ShoppingCart className="text-blue-600" size={24} />
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Total Spent</p>
//                   <h3 className="text-2xl font-bold text-gray-800"> {`${userinfo.totalSpends}`}</h3>
//                 </div>
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <CreditCard className="text-green-600" size={24} />
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
//                   <h3 className="text-2xl font-bold text-yellow-600">1</h3>
//                 </div>
//                 <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                   <Package className="text-yellow-600" size={24} />
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Account Status</p>
//                   <h3 className="text-2xl font-bold text-green-600">Active</h3>
//                 </div>
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <User className="text-green-600" size={24} />
//                 </div>
//               </div>
//             </div>
//           </div>
  
  
//      {/* Search and Filter Section */}
//         <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
//           <div className="flex flex-col gap-4">
//             {/* Search Bar */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search orders by product name..."
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => handleFilterChange("keyword", e.target.value)}
//               />
//             </div>
            
//             {/* Filters Row */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {/* Date Filter */}
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="date"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={dateFilter}
//                   onChange={(e) => handleFilterChange("date", e.target.value)}
//                 />
//               </div>

//               {/* Status Filter */}
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <select
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
//                   value={statusFilter}
//                   onChange={(e) => handleFilterChange("status", e.target.value)}
//                 >
//                   <option value="">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>

//               {/* Sort By */}
//               <div className="relative">
//                 <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <select
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
//                   value={sortBy}
//                   onChange={(e) => handleFilterChange("sort", e.target.value)}
//                 >
//                   <option value="recent">Sort by Recent</option>
//                   <option value="status">Sort by Status</option>
//                 </select>
//               </div>

//               {/* Clear Filters */}
//               <button
//               onClick={clearFilters}
//                 className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>

  
  
  
  
  
  
  


//        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//   {orders.map((order) => {
//  const transformed = {
//   id: order._id,
//   productTitle: order.productId?.title || order.title,
//   quantity: order.count,
//   image: order.productId?.image || '/default.jpg',
//   status: order.orderStatus,
//   orderDate: order.createdAt,
//   unitPrice: order.productId?.price || order.price,
//   discount: order.discount,
//   totalPrice: order.totalAmount,

//   // new fields for modal
//   paymentMethod: order.paymentInfo?.method || "N/A",
//   paymentStatus: order.paymentInfo?.status || "Unpaid",
//   shippingAddress: order.shippingAddress
//     ? `${order.shippingAddress.address}, ${order.shippingAddress.city} - ${order.shippingAddress.pincode}`
//     : "Not available",
//   estimatedDelivery: order.createdAt
//     ? formatDate(new Date(new Date(order.createdAt).getTime() + 6 * 24 * 60 * 60 * 1000))
//     : "TBD",
//   trackingNumber: order.shippingAddress
//     ? `${order.shippingAddress.city}, ${order.shippingAddress.pincode}`
//     : "Unavailable",
// };

//     return (
//       <div
//         key={transformed.id}
//         className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//         onClick={() => openModal(transformed)}
//       >
//         <div className="p-6">
//           <div className="flex items-start gap-4 mb-4">
//             <img
//               src={transformed.image}
//               alt={transformed.productTitle}
//               className="w-16 h-16 object-cover rounded-lg"
//             />
//             <div className="flex-1 min-w-0">
//               <h3 className="font-semibold text-gray-800 truncate mb-1">
//                 {transformed.productTitle}
//               </h3>
//               <p className="text-sm text-gray-500 mb-2">
//                 Qty: {transformed.quantity}
//               </p>
//               <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(transformed.status)}`}>
//                 {transformed.status.charAt(0).toUpperCase() + transformed.status.slice(1)}
//               </span>
//             </div>
//           </div>

//           <div className="border-t border-gray-100 pt-4">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm text-gray-500">Order Date:</span>
//               <span className="text-sm font-medium text-gray-800">
//                 {formatDate(transformed.orderDate)}
//               </span>
//             </div>

//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm text-gray-500">Unit Price:</span>
//               <span className="text-sm text-gray-800">${transformed.unitPrice}</span>
//             </div>

//             {transformed.discount > 0 && (
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-gray-500">Discount:</span>
//                 <span className="text-sm text-green-600">-${transformed.discount}</span>
//               </div>
//             )}

//             <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//               <span className="text-lg font-bold text-gray-800">Total:</span>
//               <span className="text-lg font-bold text-blue-600">${transformed.totalPrice}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   })}
// </div>

  
//       {orders.length === 0 && (
//             <div className="text-center py-12">
//               <Package className="mx-auto text-gray-400 mb-4" size={48} />
//               <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
//               <p className="text-gray-500">Try adjusting your search criteria</p>
//             </div>
//           )}
  
  
  
  
  
  
//         {/* Order Details Modal */}
//         {showModal && selectedOrder && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
//                 <button
//                   onClick={closeModal}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
              
//               <div className="p-6">
//                 {/* Product Info */}
//                 <div className="flex items-start gap-6 mb-6">
//                   <img
//                     src={selectedOrder.image}
//                     alt={selectedOrder.productTitle}
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                       {selectedOrder.productTitle}
//                     </h3>
//                     <p className="text-gray-600 mb-2">Order ID: {selectedOrder.id}</p>
//                     <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
//                       {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>
  
//                 {/* Order Summary */}
//                 <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                   <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Quantity:</span>
//                       <span className="font-medium">{selectedOrder.quantity}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Unit Price:</span>
//                       <span className="font-medium">${selectedOrder.unitPrice}</span>
//                     </div>
//                     {selectedOrder.discount > 0 && (
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Discount:</span>
//                         <span className="font-medium text-green-600">-${selectedOrder.discount}</span>
//                       </div>
//                     )}
//                     <div className="border-t border-gray-200 pt-2 mt-2">
//                       <div className="flex justify-between">
//                         <span className="text-lg font-bold text-gray-800">Total:</span>
//                         <span className="text-lg font-bold text-blue-600">${selectedOrder.totalPrice}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
  
//                 {/* Payment & Shipping Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                       <CreditCard size={18} />
//                       Payment Information
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Method:</span>
//                         <span className="font-medium">{selectedOrder.paymentMethod}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Status:</span>
//                         <span className="font-medium text-green-600">{selectedOrder.paymentStatus}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Date:</span>
//                         <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
//                       </div>
//                     </div>
//                   </div>
  
//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                       <Truck size={18} />
//                       Shipping Information
//                     </h4>
//                     <div className="space-y-2 text-sm">
//                       <div>
//                         <span className="text-gray-600 block mb-1">Address:</span>
//                         <span className="font-medium">{selectedOrder.shippingAddress}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Estimated Delivery:</span>
//                         <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Tracking:</span>
//                         <span className="font-medium">{selectedOrder.trackingNumber}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };
  
//   export default UserPanel;
  






  
  
  
  
  
//   <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Sidebar + Header Here (unchanged) */}

//       <div className="p-4">
//         {/* Filters */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={keyword}
//               onChange={(e) => handleFilterChange("keyword", e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500"
//             />
//           </div>
//           <div className="relative">
//             <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => handleFilterChange("date", e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500"
//             />
//           </div>
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <select
//               value={status}
//               onChange={(e) => handleFilterChange("status", e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:ring-blue-500"
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="confirmed">Confirmed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>
//           <select
//             value={sort}
//             onChange={(e) => handleFilterChange("sort", e.target.value)}
//             className="pl-3 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500"
//           >
//             <option value="recent">Sort by Recent</option>
//             <option value="status">Sort by Status</option>
//           </select>
//         </div>
//         <button onClick={clearFilters} className="mb-4 text-sm text-blue-600 hover:underline">Clear All Filters</button>















































//         {/* Orders Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               onClick={() => { setSelectedOrder(order); setShowModal(true); }}
//               className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md"
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <img src={order.image} alt={order.productTitle} className="w-16 h-16 object-cover rounded" />
//                 <div>
//                   <h4 className="font-semibold text-gray-800">{order.productTitle}</h4>
//                   <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
//                   <span className={`text-xs mt-1 inline-block px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>{order.status}</span>
//                 </div>
//               </div>
//               <div className="text-sm text-gray-500">Order Date: {formatDate(order.orderDate)}</div>
//               <div className="text-lg font-bold text-blue-600 mt-2">Total: ${order.totalPrice}</div>
//             </div>
//           ))}
//         </div>

//         {orders.length === 0 && (
//           <div className="text-center py-12">
//             <Package className="mx-auto text-gray-400 mb-4" size={48} />
//             <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
//             <p className="text-gray-500">Try adjusting your search criteria</p>
//           </div>
//         )}








//       {/* Previous Button */}
//     <button
//       disabled={page === 1}
//       onClick={() => handlePageChange(page - 1)}
//       className={`
//         px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium
//         transition-all duration-300 ease-in-out
//         ${page === 1 
//           ? 'text-gray-500 cursor-not-allowed opacity-50' 
//           : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
//         }
//       `}
//     >
//       <span className="block sm:hidden text-lg">{'<'}</span>
//       <span className="hidden sm:block">Previous</span>
//     </button>

//     {/* Page Numbers */}
//     <div className="flex items-center space-x-1 mx-1 sm:mx-2">
//       {generatePaginationNumbers().map((pageNum, index) => (
//         pageNum === '...' ? (
//           <span
//             key={`ellipsis-${index}`}
//             className="px-2 py-1 text-gray-400 text-sm sm:text-base"
//           >
//             ...
//           </span>
//         ) : (
//           <button
//             key={pageNum}
//             onClick={() => handlePageChange(pageNum)}
//             className={`
//               w-9 h-9 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base font-semibold
//               transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
//               ${page === pageNum
//                 ? 'bg-red-600 text-white shadow-md shadow-red-600/50 scale-105' 
//                 : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//               }
//             `}
//           >
//             {pageNum}
//           </button>
//         )
//       ))}
//     </div>

//     {/* Last Page Quick Jump */}
//     {totalPages > 600 && !generatePaginationNumbers().includes(totalPages) && (
//       <>
//         <span className="px-2 py-1 text-gray-400 text-sm sm:text-base">...</span>
//         <button
//           onClick={() => handlePageChange(totalPages)}
//           className="w-9 h-9 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out
//                    text-gray-300 hover:bg-gray-700 hover:text-white transform hover:scale-105 active:scale-95"
//         >
//           {totalPages}
//         </button>
//       </>
//     )}

//     {/* Next Button */}
//     <button
//       disabled={page === totalPages}
//       onClick={() => handlePageChange(page + 1)}
//       className={`
//         px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-300 ease-in-out
//         ${page === totalPages 
//           ? 'text-gray-500 cursor-not-allowed opacity-50' 
//           : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
//         }
//       `}
//     >
//       <span className="block sm:hidden text-lg">{'>'}</span>
//       <span className="hidden sm:block">Next</span>
//     </button>
// </div>

//           {/* ADDED: Page info indicator */}
//           <div className="flex justify-center mb-8">
//             <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
//               Showing page {page} of {totalPages}
//             </div>
//           </div>


//       {/* Footer */}
//       <Footer />

//       {/* Modal (reuse your existing modal JSX) */}
//     </div>
//   );
// };

// export default UserPanel;





