// // UserPanel.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { LogOut, ShoppingCart, Package, User, Upload } from "lucide-react";

// const UserPanel = () => {
//   const orders = [
//     { id: "#ORD-101", product: "iPhone 14", amount: "$999", status: "pending" },
//     { id: "#ORD-102", product: "Laptop", amount: "$1299", status: "confirmed" },
//     { id: "#ORD-103", product: "Earbuds", amount: "$249", status: "cancelled" }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-4">
//         <h2 className="text-2xl font-bold mb-6">User Panel</h2>
//         <nav className="flex flex-col gap-4 text-gray-700">
//           <Link to="/user/dashboard" className="flex items-center gap-2 hover:text-blue-600">
//             <ShoppingCart size={18} /> My Orders
//           </Link>
//           <Link to="/user/profile" className="flex items-center gap-2 hover:text-blue-600">
//             <User size={18} /> My Profile
//           </Link>
//           <Link to="/user/sell" className="flex items-center gap-2 hover:text-blue-600">
//             <Upload size={18} /> Sell Product
//           </Link>
//           <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
//             <LogOut size={18} /> Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h3 className="text-xl font-semibold mb-4">Dashboard Overview</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white p-4 rounded shadow">
//             <p className="text-gray-600">Total Orders</p>
//             <h4 className="text-xl font-bold">3</h4>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <p className="text-gray-600">Total Spend</p>
//             <h4 className="text-xl font-bold">$2,547</h4>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <p className="text-gray-600">Account Status</p>
//             <h4 className="text-xl font-bold text-green-600">Active</h4>
//           </div>
//         </div>

//         <h4 className="text-lg font-semibold mb-2">Recent Orders</h4>
//         <div className="bg-white shadow rounded">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="text-left px-4 py-2">Order ID</th>
//                 <th className="text-left px-4 py-2">Product</th>
//                 <th className="text-left px-4 py-2">Amount</th>
//                 <th className="text-left px-4 py-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map(order => (
//                 <tr key={order.id} className="border-t">
//                   <td className="px-4 py-2">{order.id}</td>
//                   <td className="px-4 py-2">{order.product}</td>
//                   <td className="px-4 py-2">{order.amount}</td>
//                   <td className="px-4 py-2">
//                     <span className={`px-2 py-1 rounded text-xs font-semibold
//                       ${order.status === "pending" && "bg-yellow-200 text-yellow-800"}
//                       ${order.status === "confirmed" && "bg-green-200 text-green-800"}
//                       ${order.status === "cancelled" && "bg-red-200 text-red-800"}
//                     `}>
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserPanel;








// import React, { useState } from "react";
// import { LogOut, ShoppingCart, Package, User, Upload, Search, Filter, X, Calendar, CreditCard, Truck, MapPin } from "lucide-react";

// const UserPanel = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("date");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const orders = [
//     {
//       id: "#ORD-101",
//       productTitle: "iPhone 14 Pro Max",
//       image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 1199,
//       discount: 200,
//       totalPrice: 999,
//       orderDate: "2025-06-15",
//       status: "pending",
//       paymentMethod: "Credit Card",
//       paymentStatus: "Paid",
//       shippingAddress: "123 Main St, New York, NY 10001",
//       estimatedDelivery: "2025-06-20",
//       trackingNumber: "TRK123456789"
//     },
//     {
//       id: "#ORD-102",
//       productTitle: "MacBook Pro 16-inch",
//       image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 1399,
//       discount: 100,
//       totalPrice: 1299,
//       orderDate: "2025-06-12",
//       status: "confirmed",
//       paymentMethod: "PayPal",
//       paymentStatus: "Paid",
//       shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
//       estimatedDelivery: "2025-06-18",
//       trackingNumber: "TRK987654321"
//     },
//     {
//       id: "#ORD-103",
//       productTitle: "AirPods Pro 2nd Gen",
//       image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
//       quantity: 2,
//       unitPrice: 149,
//       discount: 49,
//       totalPrice: 249,
//       orderDate: "2025-06-10",
//       status: "cancelled",
//       paymentMethod: "Debit Card",
//       paymentStatus: "Refunded",
//       shippingAddress: "789 Pine St, Chicago, IL 60601",
//       estimatedDelivery: "Cancelled",
//       trackingNumber: "N/A"
//     },
//     {
//       id: "#ORD-104",
//       productTitle: "Samsung Galaxy Watch 5",
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 329,
//       discount: 30,
//       totalPrice: 299,
//       orderDate: "2025-06-08",
//       status: "confirmed",
//       paymentMethod: "Credit Card",
//       paymentStatus: "Paid",
//       shippingAddress: "321 Elm St, Miami, FL 33101",
//       estimatedDelivery: "2025-06-14",
//       trackingNumber: "TRK456789123"
//     }
//   ];

//   const filteredOrders = orders
//     .filter(order => 
//       order.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortBy === "date") {
//         return new Date(b.orderDate) - new Date(a.orderDate);
//       }
//       return a.status.localeCompare(b.status);
//     });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "confirmed":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg p-6">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//             <User className="text-white" size={20} />
//           </div>
//           <h2 className="text-xl font-bold text-gray-800">User Panel</h2>
//         </div>
        
//         <nav className="flex flex-col gap-3">
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
//             <ShoppingCart size={18} />
//             My Orders
//           </a>
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//             <User size={18} />
//             My Profile
//           </a>
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//             <Upload size={18} />
//             Sell Product
//           </a>
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//             <Package size={18} />
//             Inventory
//           </a>
//           <button className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors mt-4">
//             <LogOut size={18} />
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
//           <p className="text-gray-600">Manage your orders and track your purchases</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total Orders</p>
//                 <h3 className="text-2xl font-bold text-gray-800">4</h3>
//               </div>
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <ShoppingCart className="text-blue-600" size={24} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total Spent</p>
//                 <h3 className="text-2xl font-bold text-gray-800">$2,846</h3>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <CreditCard className="text-green-600" size={24} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
//                 <h3 className="text-2xl font-bold text-yellow-600">1</h3>
//               </div>
//               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                 <Package className="text-yellow-600" size={24} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Account Status</p>
//                 <h3 className="text-2xl font-bold text-green-600">Active</h3>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <User className="text-green-600" size={24} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search orders by product name..."
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <select
//                 className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="date">Sort by Date</option>
//                 <option value="status">Sort by Status</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Orders Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredOrders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//               onClick={() => openModal(order)}
//             >
//               <div className="p-6">
//                 <div className="flex items-start gap-4 mb-4">
//                   <img
//                     src={order.image}
//                     alt={order.productTitle}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-800 truncate mb-1">
//                       {order.productTitle}
//                     </h3>
//                     <p className="text-sm text-gray-500 mb-2">
//                       Qty: {order.quantity}
//                     </p>
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
//                       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="border-t border-gray-100 pt-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">Order Date:</span>
//                     <span className="text-sm font-medium text-gray-800">
//                       {formatDate(order.orderDate)}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">Unit Price:</span>
//                     <span className="text-sm text-gray-800">${order.unitPrice}</span>
//                   </div>
                  
//                   {order.discount > 0 && (
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm text-gray-500">Discount:</span>
//                       <span className="text-sm text-green-600">-${order.discount}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                     <span className="text-lg font-bold text-gray-800">Total:</span>
//                     <span className="text-lg font-bold text-blue-600">${order.totalPrice}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredOrders.length === 0 && (
//           <div className="text-center py-12">
//             <Package className="mx-auto text-gray-400 mb-4" size={48} />
//             <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
//             <p className="text-gray-500">Try adjusting your search criteria</p>
//           </div>
//         )}
//       </main>

//       {/* Order Details Modal */}
//       {showModal && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
//               <button
//                 onClick={closeModal}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-6">
//               {/* Product Info */}
//               <div className="flex items-start gap-6 mb-6">
//                 <img
//                   src={selectedOrder.image}
//                   alt={selectedOrder.productTitle}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     {selectedOrder.productTitle}
//                   </h3>
//                   <p className="text-gray-600 mb-2">Order ID: {selectedOrder.id}</p>
//                   <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
//                     {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
//                   </span>
//                 </div>
//               </div>

//               {/* Order Summary */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Quantity:</span>
//                     <span className="font-medium">{selectedOrder.quantity}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Unit Price:</span>
//                     <span className="font-medium">${selectedOrder.unitPrice}</span>
//                   </div>
//                   {selectedOrder.discount > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Discount:</span>
//                       <span className="font-medium text-green-600">-${selectedOrder.discount}</span>
//                     </div>
//                   )}
//                   <div className="border-t border-gray-200 pt-2 mt-2">
//                     <div className="flex justify-between">
//                       <span className="text-lg font-bold text-gray-800">Total:</span>
//                       <span className="text-lg font-bold text-blue-600">${selectedOrder.totalPrice}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment & Shipping Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <CreditCard size={18} />
//                     Payment Information
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Method:</span>
//                       <span className="font-medium">{selectedOrder.paymentMethod}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Status:</span>
//                       <span className="font-medium text-green-600">{selectedOrder.paymentStatus}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Date:</span>
//                       <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <Truck size={18} />
//                     Shipping Information
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <div>
//                       <span className="text-gray-600 block mb-1">Address:</span>
//                       <span className="font-medium">{selectedOrder.shippingAddress}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Estimated Delivery:</span>
//                       <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Tracking:</span>
//                       <span className="font-medium">{selectedOrder.trackingNumber}</span>
//                     </div>
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

// export default UserPanel;









//this is the real one 

// import React, { useState } from "react";
// import { LogOut, ShoppingCart, Package, User, Upload, Search, Filter, X, Calendar, CreditCard, Truck, MapPin, Menu, Mail, Phone } from "lucide-react";
// import Footer from "../Components/Footer";

// const UserPanel = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("recent");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   // User profile data (this would come from your API/context)
//   const userProfile = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+1 (555) 123-4567",
//     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
//   };

//   const orders = [
//     {
//       id: "#ORD-101",
//       productTitle: "iPhone 14 Pro Max",
//       image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 1199,
//       discount: 200,
//       totalPrice: 999,
//       orderDate: "2025-06-15",
//       status: "pending",
//       paymentMethod: "Credit Card",
//       paymentStatus: "Paid",
//       shippingAddress: "123 Main St, New York, NY 10001",
//       estimatedDelivery: "2025-06-20",
//       trackingNumber: "TRK123456789"
//     },
//     {
//       id: "#ORD-102",
//       productTitle: "MacBook Pro 16-inch",
//       image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 1399,
//       discount: 100,
//       totalPrice: 1299,
//       orderDate: "2025-06-12",
//       status: "confirmed",
//       paymentMethod: "PayPal",
//       paymentStatus: "Paid",
//       shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
//       estimatedDelivery: "2025-06-18",
//       trackingNumber: "TRK987654321"
//     },
//     {
//       id: "#ORD-103",
//       productTitle: "AirPods Pro 2nd Gen",
//       image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
//       quantity: 2,
//       unitPrice: 149,
//       discount: 49,
//       totalPrice: 249,
//       orderDate: "2025-06-10",
//       status: "cancelled",
//       paymentMethod: "Debit Card",
//       paymentStatus: "Refunded",
//       shippingAddress: "789 Pine St, Chicago, IL 60601",
//       estimatedDelivery: "Cancelled",
//       trackingNumber: "N/A"
//     },
//     {
//       id: "#ORD-104",
//       productTitle: "Samsung Galaxy Watch 5",
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 329,
//       discount: 30,
//       totalPrice: 299,
//       orderDate: "2025-06-08",
//       status: "confirmed",
//       paymentMethod: "Credit Card",
//       paymentStatus: "Paid",
//       shippingAddress: "321 Elm St, Miami, FL 33101",
//       estimatedDelivery: "2025-06-14",
//       trackingNumber: "TRK456789123"
//     }
//   ];

//   const filteredOrders = orders
//     .filter(order => {
//       const matchesSearch = order.productTitle.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = statusFilter === "all" || order.status === statusFilter;
//       const matchesDate = !dateFilter || order.orderDate === dateFilter;
//       return matchesSearch && matchesStatus && matchesDate;
//     })
//     .sort((a, b) => {
//       if (sortBy === "recent") {
//         return new Date(b.orderDate) - new Date(a.orderDate);
//       }
//       return a.status.localeCompare(b.status);
//     });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "confirmed":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex relative">
//       {/* Mobile Menu Overlay */}
//       {showMobileMenu && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setShowMobileMenu(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`w-64 bg-white shadow-lg p-6 fixed lg:relative h-full z-50 transform transition-transform duration-300 ease-in-out ${
//         showMobileMenu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//       }`}>
//         {/* User Profile Section */}
//         <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
//           <img
//             src={userProfile.avatar}
//             alt={userProfile.name}
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-gray-800 truncate">{userProfile.name}</h3>
//             <p className="text-sm text-gray-500 truncate">{userProfile.email}</p>
//           </div>
//         </div>

//         {/* User Details Card */}
//         <div className="bg-gray-50 rounded-lg p-4 mb-6">
//           <h4 className="font-medium text-gray-800 mb-3">Contact Info</h4>
//           <div className="space-y-2 text-sm">
//             <div className="flex items-center gap-2">
//               <Mail size={14} className="text-gray-400" />
//               <span className="text-gray-600 truncate">{userProfile.email}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Phone size={14} className="text-gray-400" />
//               <span className="text-gray-600">{userProfile.phone}</span>
//             </div>
//           </div>
//         </div>
        
//         <nav className="flex flex-col gap-3">
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
//             <ShoppingCart size={18} />
//             My Orders
//           </a>
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//             <User size={18} />
//             My Profile
//           </a>
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//             <Upload size={18} />
//             Sell Product
//           </a>
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//             <Package size={18} />
//             Inventory
//           </a>
//           <button className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors mt-4">
//             <LogOut size={18} />
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 lg:p-6">
//         {/* Mobile Header */}
//         <div className="flex items-center justify-between mb-6 lg:hidden">
//           <button
//             onClick={() => setShowMobileMenu(true)}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <Menu size={24} />
//           </button>
//           <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
//           <div className="w-8" /> {/* Spacer for centering */}
//         </div>

//         {/* Desktop Header */}
//         <div className="hidden lg:block mb-8">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
//           <p className="text-gray-600">Manage your orders and track your purchases</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total Orders</p>
//                 <h3 className="text-2xl font-bold text-gray-800">4</h3>
//               </div>
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <ShoppingCart className="text-blue-600" size={24} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Total Spent</p>
//                 <h3 className="text-2xl font-bold text-gray-800">$2,846</h3>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <CreditCard className="text-green-600" size={24} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
//                 <h3 className="text-2xl font-bold text-yellow-600">1</h3>
//               </div>
//               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                 <Package className="text-yellow-600" size={24} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Account Status</p>
//                 <h3 className="text-2xl font-bold text-green-600">Active</h3>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <User className="text-green-600" size={24} />
//               </div>
//             </div>
//           </div>
//         </div>




//         {/* Search and Filter Section */}
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
//                 onChange={(e) => setSearchTerm(e.target.value)}
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
//                   onChange={(e) => setDateFilter(e.target.value)}
//                 />
//               </div>

//               {/* Status Filter */}
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                 <select
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
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
//                   onChange={(e) => setSortBy(e.target.value)}
//                 >
//                   <option value="recent">Sort by Recent</option>
//                   <option value="status">Sort by Status</option>
//                 </select>
//               </div>

//               {/* Clear Filters */}
//               <button
//                 onClick={() => {
//                   setSearchTerm("");
//                   setStatusFilter("all");
//                   setDateFilter("");
//                   setSortBy("recent");
//                 }}
//                 className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>







//         {/* Orders Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredOrders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//               onClick={() => openModal(order)}
//             >
//               <div className="p-6">
//                 <div className="flex items-start gap-4 mb-4">
//                   <img
//                     src={order.image}
//                     alt={order.productTitle}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-800 truncate mb-1">
//                       {order.productTitle}
//                     </h3>
//                     <p className="text-sm text-gray-500 mb-2">
//                       Qty: {order.quantity}
//                     </p>
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
//                       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="border-t border-gray-100 pt-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">Order Date:</span>
//                     <span className="text-sm font-medium text-gray-800">
//                       {formatDate(order.orderDate)}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">Unit Price:</span>
//                     <span className="text-sm text-gray-800">${order.unitPrice}</span>
//                   </div>
                  
//                   {order.discount > 0 && (
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm text-gray-500">Discount:</span>
//                       <span className="text-sm text-green-600">-${order.discount}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                     <span className="text-lg font-bold text-gray-800">Total:</span>
//                     <span className="text-lg font-bold text-blue-600">${order.totalPrice}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

            
//           ))}
              
//         </div>







//         {filteredOrders.length === 0 && (
//           <div className="text-center py-12">
//             <Package className="mx-auto text-gray-400 mb-4" size={48} />
//             <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
//             <p className="text-gray-500">Try adjusting your search criteria</p>
//           </div>
//         )}
//       </main>

//       {/* Order Details Modal */}
//       {showModal && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
//               <button
//                 onClick={closeModal}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-6">
//               {/* Product Info */}
//               <div className="flex items-start gap-6 mb-6">
//                 <img
//                   src={selectedOrder.image}
//                   alt={selectedOrder.productTitle}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     {selectedOrder.productTitle}
//                   </h3>
//                   <p className="text-gray-600 mb-2">Order ID: {selectedOrder.id}</p>
//                   <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
//                     {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
//                   </span>
//                 </div>
//               </div>

//               {/* Order Summary */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Quantity:</span>
//                     <span className="font-medium">{selectedOrder.quantity}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Unit Price:</span>
//                     <span className="font-medium">${selectedOrder.unitPrice}</span>
//                   </div>
//                   {selectedOrder.discount > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Discount:</span>
//                       <span className="font-medium text-green-600">-${selectedOrder.discount}</span>
//                     </div>
//                   )}
//                   <div className="border-t border-gray-200 pt-2 mt-2">
//                     <div className="flex justify-between">
//                       <span className="text-lg font-bold text-gray-800">Total:</span>
//                       <span className="text-lg font-bold text-blue-600">${selectedOrder.totalPrice}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment & Shipping Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <CreditCard size={18} />
//                     Payment Information
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Method:</span>
//                       <span className="font-medium">{selectedOrder.paymentMethod}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Status:</span>
//                       <span className="font-medium text-green-600">{selectedOrder.paymentStatus}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Date:</span>
//                       <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <Truck size={18} />
//                     Shipping Information
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <div>
//                       <span className="text-gray-600 block mb-1">Address:</span>
//                       <span className="font-medium">{selectedOrder.shippingAddress}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Estimated Delivery:</span>
//                       <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Tracking:</span>
//                       <span className="font-medium">{selectedOrder.trackingNumber}</span>
//                     </div>
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

// export default UserPanel;








// import React, { useState } from "react";
// import { LogOut, ShoppingCart, Package, User, Upload, Search, Filter, X, Calendar, CreditCard, Truck, MapPin, Menu, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";
// import Footer from "../Components/Footer";

// const UserPanel = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("recent");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ordersPerPage] = useState(6); // Number of orders per page

//   // User profile data (this would come from your API/context)
//   const userProfile = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+1 (555) 123-4567",
//     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
//   };

//   const orders = [
//     {
//       id: "#ORD-101",
//       productTitle: "iPhone 14 Pro Max",
//       image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 1199,
//       discount: 200,
//       totalPrice: 999,
//       orderDate: "2025-06-15",
//       status: "pending",
//       paymentMethod: "Credit Card",
//       paymentStatus: "Paid",
//       shippingAddress: "123 Main St, New York, NY 10001",
//       estimatedDelivery: "2025-06-20",
//       trackingNumber: "TRK123456789"
//     },
//     {
//       id: "#ORD-102",
//       productTitle: "MacBook Pro 16-inch",
//       image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 1399,
//       discount: 100,
//       totalPrice: 1299,
//       orderDate: "2025-06-12",
//       status: "confirmed",
//       paymentMethod: "PayPal",
//       paymentStatus: "Paid",
//       shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
//       estimatedDelivery: "2025-06-18",
//       trackingNumber: "TRK987654321"
//     },
//     {
//       id: "#ORD-103",
//       productTitle: "AirPods Pro 2nd Gen",
//       image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop",
//       quantity: 2,
//       unitPrice: 149,
//       discount: 49,
//       totalPrice: 249,
//       orderDate: "2025-06-10",
//       status: "cancelled",
//       paymentMethod: "Debit Card",
//       paymentStatus: "Refunded",
//       shippingAddress: "789 Pine St, Chicago, IL 60601",
//       estimatedDelivery: "Cancelled",
//       trackingNumber: "N/A"
//     },
//     {
//       id: "#ORD-104",
//       productTitle: "Samsung Galaxy Watch 5",
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 329,
//       discount: 30,
//       totalPrice: 299,
//       orderDate: "2025-06-08",
//       status: "confirmed",
//       paymentMethod: "Credit Card",
//       paymentStatus: "Paid",
//       shippingAddress: "321 Elm St, Miami, FL 33101",
//       estimatedDelivery: "2025-06-14",
//       trackingNumber: "TRK456789123"
//     },
//     {
//       id: "#ORD-105",
//       productTitle: "Sony WH-1000XM4 Headphones",
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 349,
//       discount: 50,
//       totalPrice: 299,
//       orderDate: "2025-06-05",
//       status: "confirmed",
//       paymentMethod: "Credit Card",
//       paymentStatus: "Paid",
//       shippingAddress: "654 Cedar Ave, Seattle, WA 98101",
//       estimatedDelivery: "2025-06-11",
//       trackingNumber: "TRK789123456"
//     },
//     {
//       id: "#ORD-106",
//       productTitle: "iPad Air 5th Gen",
//       image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 599,
//       discount: 0,
//       totalPrice: 599,
//       orderDate: "2025-06-03",
//       status: "pending",
//       paymentMethod: "PayPal",
//       paymentStatus: "Paid",
//       shippingAddress: "987 Maple St, Austin, TX 78701",
//       estimatedDelivery: "2025-06-25",
//       trackingNumber: "TRK321654987"
//     },
//     {
//       id: "#ORD-107",
//       productTitle: "Nintendo Switch OLED",
//       image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 349,
//       discount: 0,
//       totalPrice: 349,
//       orderDate: "2025-06-01",
//       status: "confirmed",
//       paymentMethod: "Debit Card",
//       paymentStatus: "Paid",
//       shippingAddress: "147 Birch Ln, Denver, CO 80201",
//       estimatedDelivery: "2025-06-07",
//       trackingNumber: "TRK147258369"
//     },
//     {
//       id: "#ORD-108",
//       productTitle: "Apple Watch Series 9",
//       image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=300&h=300&fit=crop",
//       quantity: 1,
//       unitPrice: 399,
//       discount: 0,
//       totalPrice: 399,
//       orderDate: "2025-05-28",
//       status: "cancelled",
//       paymentMethod: "Credit Card",
//       paymentStatus: "Refunded",
//       shippingAddress: "258 Spruce Dr, Phoenix, AZ 85001",
//       estimatedDelivery: "Cancelled",
//       trackingNumber: "N/A"
//     }
//   ];

//   const filteredOrders = orders
//     .filter(order => {
//       const matchesSearch = order.productTitle.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = statusFilter === "all" || order.status === statusFilter;
//       const matchesDate = !dateFilter || order.orderDate === dateFilter;
//       return matchesSearch && matchesStatus && matchesDate;
//     })
//     .sort((a, b) => {
//       if (sortBy === "recent") {
//         return new Date(b.orderDate) - new Date(a.orderDate);
//       }
//       return a.status.localeCompare(b.status);
//     });

//   // Pagination logic
//   const totalOrders = filteredOrders.length;
//   const totalPages = Math.ceil(totalOrders / ordersPerPage);
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//   // Reset to first page when filters change
//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, dateFilter, sortBy]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const renderPaginationButtons = () => {
//     const buttons = [];
//     const maxVisiblePages = 5;
    
//     // Previous button
//     buttons.push(
//       <button
//         key="prev"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`px-3 py-2 rounded-lg font-medium transition-colors ${
//           currentPage === 1
//             ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//             : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
//         }`}
//       >
//         <ChevronLeft size={16} />
//       </button>
//     );

//     // Calculate page range
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     // First page and ellipsis
//     if (startPage > 1) {
//       buttons.push(
//         <button
//           key={1}
//           onClick={() => handlePageChange(1)}
//           className="px-3 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors"
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         buttons.push(<span key="ellipsis1" className="px-2 text-gray-500">...</span>);
//       }
//     }

//     // Page numbers
//     for (let i = startPage; i <= endPage; i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`px-3 py-2 rounded-lg font-medium transition-colors ${
//             currentPage === i
//               ? 'bg-blue-600 text-white'
//               : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     // Last page and ellipsis
//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         buttons.push(<span key="ellipsis2" className="px-2 text-gray-500">...</span>);
//       }
//       buttons.push(
//         <button
//           key={totalPages}
//           onClick={() => handlePageChange(totalPages)}
//           className="px-3 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors"
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     // Next button
//     buttons.push(
//       <button
//         key="next"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`px-3 py-2 rounded-lg font-medium transition-colors ${
//           currentPage === totalPages
//             ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//             : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
//         }`}
//       >
//         <ChevronRight size={16} />
//       </button>
//     );

//     return buttons;
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "confirmed":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex relative">
//       {/* Mobile Menu Overlay */}
//       {showMobileMenu && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setShowMobileMenu(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`w-64 bg-white shadow-lg p-6 fixed lg:relative h-full z-50 transform transition-transform duration-300 ease-in-out ${
//         showMobileMenu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//       }`}>
//         {/* User Profile Section */}
//         <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
//           <img
//             src={userProfile.avatar}
//             alt={userProfile.name}
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-gray-800 truncate">{userProfile.name}</h3>
//             <p className="text-sm text-gray-500 truncate">{userProfile.email}</p>
//           </div>
//         </div>

//         {/* User Details Card */}
//         <div className="bg-gray-50 rounded-lg p-4 mb-6">
//           <h4 className="font-medium text-gray-800 mb-3">Contact Info</h4>
//           <div className="space-y-2 text-sm">
//             <div className="flex items-center gap-2">
//               <Mail size={14} className="text-gray-400" />
//               <span className="text-gray-600 truncate">{userProfile.email}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Phone size={14} className="text-gray-400" />
//               <span className="text-gray-600">{userProfile.phone}</span>
//             </div>
//           </div>
//         </div>
        
//         <nav className="flex flex-col gap-3">
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
//             <ShoppingCart size={18} />
//             My Orders
//           </a>
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//             <User size={18} />
//             My Profile
//           </a>
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//             <Upload size={18} />
//             Sell Product
//           </a>
//           <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
//             <Package size={18} />
//             Inventory
//           </a>
//           <button className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors mt-4">
//             <LogOut size={18} />
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 lg:p-6">
//         {/* Mobile Header */}
//         <div className="flex items-center justify-between mb-6 lg:hidden">
//           <button
//             onClick={() => setShowMobileMenu(true)}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <Menu size={24} />
//           </button>
//           <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
//           <div className="w-8" /> {/* Spacer for centering */}
//         </div>

//         {/* Desktop Header */}
//         <div className="hidden lg:block mb-8">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
//           <p className="text-gray-600">Manage your orders and track your purchases</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
//           <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm text-gray-500 mb-1">Total Orders</p>
//                 <h3 className="text-lg lg:text-2xl font-bold text-gray-800">{totalOrders}</h3>
//               </div>
//               <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <ShoppingCart className="text-blue-600" size={16} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm text-gray-500 mb-1">Total Spent</p>
//                 <h3 className="text-lg lg:text-2xl font-bold text-gray-800">$4,893</h3>
//               </div>
//               <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <CreditCard className="text-green-600" size={16} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm text-gray-500 mb-1">Pending</p>
//                 <h3 className="text-lg lg:text-2xl font-bold text-yellow-600">
//                   {orders.filter(o => o.status === 'pending').length}
//                 </h3>
//               </div>
//               <div className="w-8 h-8 lg:w-12 lg:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                 <Package className="text-yellow-600" size={16} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs lg:text-sm text-gray-500 mb-1">Account Status</p>
//                 <h3 className="text-lg lg:text-2xl font-bold text-green-600">Active</h3>
//               </div>
//               <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <User className="text-green-600" size={16} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
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
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             {/* Filters Row */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4">
//               {/* Date Filter */}
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//                 <input
//                   type="date"
//                   className="w-full pl-9 pr-3 py-2.5 lg:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={dateFilter}
//                   onChange={(e) => setDateFilter(e.target.value)}
//                 />
//               </div>

//               {/* Status Filter */}
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//                 <select
//                   className="w-full pl-9 pr-3 py-2.5 lg:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>

//               {/* Sort By */}
//               <div className="relative">
//                 <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//                 <select
//                   className="w-full pl-9 pr-3 py-2.5 lg:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                 >
//                   <option value="recent">Sort by Recent</option>
//                   <option value="status">Sort by Status</option>
//                 </select>
//               </div>

//               {/* Clear Filters */}
//               <div className="sm:col-span-2 lg:col-span-1">
//                 <button
//                   onClick={() => {
//                     setSearchTerm("");
//                     setStatusFilter("all");
//                     setDateFilter("");
//                     setSortBy("recent");
//                   }}
//                   className="w-full px-3 py-2.5 lg:py-3 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
//                 >
//                   Clear Filters
//                 </button>
//               </div>

//               {/* Results Count - Hidden on mobile */}
//               <div className="hidden xl:flex items-center justify-center">
//                 <span className="text-sm text-gray-600 font-medium">
//                   {totalOrders} {totalOrders === 1 ? 'order' : 'orders'} found
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Orders Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredOrders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//               onClick={() => openModal(order)}
//             >
//               <div className="p-6">
//                 <div className="flex items-start gap-4 mb-4">
//                   <img
//                     src={order.image}
//                     alt={order.productTitle}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-800 truncate mb-1">
//                       {order.productTitle}
//                     </h3>
//                     <p className="text-sm text-gray-500 mb-2">
//                       Qty: {order.quantity}
//                     </p>
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
//                       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="border-t border-gray-100 pt-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">Order Date:</span>
//                     <span className="text-sm font-medium text-gray-800">
//                       {formatDate(order.orderDate)}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-gray-500">Unit Price:</span>
//                     <span className="text-sm text-gray-800">${order.unitPrice}</span>
//                   </div>
                  
//                   {order.discount > 0 && (
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm text-gray-500">Discount:</span>
//                       <span className="text-sm text-green-600">-${order.discount}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                     <span className="text-lg font-bold text-gray-800">Total:</span>
//                     <span className="text-lg font-bold text-blue-600">${order.totalPrice}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredOrders.length === 0 && (
//           <div className="text-center py-12">
//             <Package className="mx-auto text-gray-400 mb-4" size={48} />
//             <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
//             <p className="text-gray-500">Try adjusting your search criteria</p>
//           </div>
//         )}
//       </main>

//       {/* Order Details Modal */}
//       {showModal && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
//               <button
//                 onClick={closeModal}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-6">
//               {/* Product Info */}
//               <div className="flex items-start gap-6 mb-6">
//                 <img
//                   src={selectedOrder.image}
//                   alt={selectedOrder.productTitle}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     {selectedOrder.productTitle}
//                   </h3>
//                   <p className="text-gray-600 mb-2">Order ID: {selectedOrder.id}</p>
//                   <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
//                     {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
//                   </span>
//                 </div>
//               </div>

//               {/* Order Summary */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Quantity:</span>
//                     <span className="font-medium">{selectedOrder.quantity}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Unit Price:</span>
//                     <span className="font-medium">${selectedOrder.unitPrice}</span>
//                   </div>
//                   {selectedOrder.discount > 0 && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Discount:</span>
//                       <span className="font-medium text-green-600">-${selectedOrder.discount}</span>
//                     </div>
//                   )}
//                   <div className="border-t border-gray-200 pt-2 mt-2">
//                     <div className="flex justify-between">
//                       <span className="text-lg font-bold text-gray-800">Total:</span>
//                       <span className="text-lg font-bold text-blue-600">${selectedOrder.totalPrice}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment & Shipping Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <CreditCard size={18} />
//                     Payment Information
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Method:</span>
//                       <span className="font-medium">{selectedOrder.paymentMethod}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Status:</span>
//                       <span className="font-medium text-green-600">{selectedOrder.paymentStatus}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Date:</span>
//                       <span className="font-medium">{formatDate(selectedOrder.orderDate)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                     <Truck size={18} />
//                     Shipping Information
//                   </h4>
//                   <div className="space-y-2 text-sm">
//                     <div>
//                       <span className="text-gray-600 block mb-1">Address:</span>
//                       <span className="font-medium">{selectedOrder.shippingAddress}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Estimated Delivery:</span>
//                       <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Tracking:</span>
//                       <span className="font-medium">{selectedOrder.trackingNumber}</span>
//                     </div>
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

// export default UserPanel;