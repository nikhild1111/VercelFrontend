import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Menu,
  X,
  Store,
  TrendingUp,
  Bell,
  Search,
  Filter,
  Download,
  Settings,
  LogOut
} from 'lucide-react';
import { Calendar, CreditCard, Truck } from 'lucide-react';
import { FaCalendar, FaCreditCard, FaTruck } from 'react-icons/fa';
import Modal from '../Admincoponents/Modal';

import OrderDetailsModal from '../Admincoponents/OrderDetailsModal';
import UserDetailsModal from '../Admincoponents/UserDetailsModal';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PaymentStatusModal from "../PaymentStatusModal"; // Adjust path if needed



import { updateOrderPage, setOrderFilters } from "../../redux/Slices/orderFiltersSlice";
import adminfetchFilteredOrders from "../../redux/thunks/adminfetchFilteredOrders";
import { fetchFilteredOrders } from "../../redux/thunks/fetchFilteredOrders";

// import Footer from "../Footer";

const RenderDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { page, totalPages, keyword, status, date, sort } = useSelector(state => state.orderFilters);

  const {
    totalOrders,
    totalRevenue,
    orderCount,
    pendingCount,
    userCount,
    orders
  } = useSelector((state) => state.adminorders);

  const dashboardStats = {
    totalOrders,
    totalRevenue,
    orderCount,
    pendingOrders: pendingCount,
    totalUsers: userCount,
  };

console.log(orders)


   useEffect(() => {
      dispatch(adminfetchFilteredOrders());
      dispatch(fetchFilteredOrders());
    }, [dispatch, page, keyword, status, date, sort]);

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(updateOrderPage(newPage));
  };
console.log(orders);

  // ⛳ View Orders Handler
  const handleViewOrders = () => {
    toast.success("🛒 View Orders - Coming Soon!");
    // later: navigate(`/admin/orders?userId=${selectedUser._id}`)
  };

  // 📩 Send Message Handler
  const handleSendMessage = () => {
    toast.success("📨 Send Message - Coming Soon!");
    // later: open messaging modal / chat UI
  };


    const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-900  font-semibold text-lg">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );


  const handleFilterChange = (field, value) => {
    dispatch(setOrderFilters({ [field]: value, page: 1 }));
  };

  const clearFilters = () => {
    dispatch(setOrderFilters({ keyword: "", status: "", date: "", sort: "recent", page: 1 }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const generatePaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }

    return pages;
  };


const updateOrderStatus = async (orderId, newStatus, currentStatus) => {
  if (newStatus === currentStatus) {
    toast.info("No change. Status already set.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    // 🌀 Show loading modal with message
    setLoadingMessage("Updating order status...");
    setShowConfirmationModal(true);

    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/admin/update-status/${orderId}`,
      { orderStatus: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(res.data.message || "Status updated successfully.");
   dispatch(adminfetchFilteredOrders());
    dispatch(fetchFilteredOrders());
            setLoadingMessage("Status updated successfully.");
       setTimeout(() => {
        setShowConfirmationModal(false);
      }, 2000);
  } catch (err) {
    const message = err.response?.data?.message || "Update failed. Please try again.";
        setLoadingMessage("Update failed. Please try again.");
          setTimeout(() => {
        setShowConfirmationModal(false);
      }, 2000);
    toast.error(message);
  } finally {
    // ✅ Always hide modal
    setLoadingMessage("Status updated successfully.");
      setTimeout(() => {
        setShowConfirmationModal(false);
      }, 2000);
  }
};


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex space-x-3">
          {/* <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button> */}
        </div>
      </div>
{/* <PaymentStatusModal isOpen={!!loadingMessage} message={loadingMessage} /> */}


<PaymentStatusModal message={loadingMessage} isOpen={showConfirmationModal} />


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts}
          icon={Package}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Revenue"
          value={`$${dashboardStats.totalRevenue?.toLocaleString() || 0}`}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.orderCount}
          icon={ShoppingCart}
          color="bg-purple-500"
        />
        <StatCard
          title="Pending Orders"
          value={dashboardStats.pendingOrders}
          icon={Clock}
          color="bg-orange-500"
        />
      </div>

        <div>
              {/* Search and Filter Section */}
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-400 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders by product name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={keyword}
                onChange={(e) => handleFilterChange("keyword", e.target.value)}
              />
            </div>
            
            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
                  value={status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="shipped">shipped</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
                  value={sort}
                  onChange={(e) => handleFilterChange("sort", e.target.value)}
                >
                  <option value="recent">Sort by Recent</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        </div>


<div className="bg-white rounded-xl shadow-sm border border-gray-400 mb-6">
  <div className="p-6 border-b">
    <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
  </div>

  {/* ✅ Scrollable table wrapper for small screens */}
  <div className="w-full overflow-x-auto">
    <table className="min-w-[1000px] w-full text-base">
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Order ID</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Customer</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Product</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Date</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Amount</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Status</th>
          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-6 py-5 text-gray-900 font-medium whitespace-nowrap text-center max-w-[250px] font-semibold">{order._id}</td>
              <td className="px-6 py-5 whitespace-nowrap truncate max-w-[200px]">
                <button
                  onClick={() => {
                    setSelectedUser({
                      name: order.userId.name,
                      email: order.userId.email,
                      phone: order.userId.phone,
                      joinDate: new Date(order.createdAt).toLocaleDateString(),
                      orders: order.userId.totalOrders,
                      totalSpent: order.userId.totalSpends
                    });
                    setShowUserModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 font-semibold truncate"
                >
                  {order.userId.name}
                </button>
              </td>
              <td className="px-6 py-5 whitespace-nowrap truncate max-w-[200px]">
                <button
                  onClick={() => {
                    setSelectedOrder({
                      id: order._id,
                      productTitle: order.title,
                      image: order.productId.image,
                      quantity: order.count,
                      unitPrice: order.price,
                      discount: order.discount,
                      totalPrice: order.totalAmount,
                      status: order.orderStatus,
                      paymentMethod: order.paymentInfo?.method || 'N/A',
                      paymentStatus: order.paymentInfo?.status || 'N/A',
                      orderDate: order.createdAt,
                      shippingAddress: `${order.shippingAddress?.address}, ${order.shippingAddress?.city}, ${order.shippingAddress?.pincode}`,
                      estimatedDelivery: new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                      trackingNumber: `TRK${order._id.toString().slice(-8).toUpperCase()}`
                    });
                    setShowModal(true);
                  }}
                  className="text-blue-600 hover:underline font-semibold text-[15px] truncate"
                >
                  {order.title}
                </button>
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-gray-900 font-semibold">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-5 whitespace-nowrap text-gray-900 font-semibold">₹{order.totalAmount}</td>
              <td className="px-6 py-5 whitespace-nowrap">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                  order.orderStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                  order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {order.orderStatus}
                </span>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <select
                  value={order.orderStatus}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value,order.orderStatus)}
                  className="border rounded-md px-3 py-1 text-sm font-medium focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="py-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M9 3v18m6-18v18m-3 0h3m-3 0H9" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">No orders found</h3>
                <p className="text-gray-500">Please Adjust search first</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>




      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">

                {Array.isArray(orders) && orders.length > 0 ? (
                    <div>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedUser({


                          name: order.userId.name,
                          email: order.userId.email,
                          phone: order.userId.phone,
                          joinDate: new Date(order.createdAt).toLocaleDateString(),
                          orders: order.userId.totalOrders,
                          totalSpent: order.userId.totalSpends
                        });
                        setShowUserModal(true);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {order.userId.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedOrder({
                          id: order._id,
                          productTitle: order.title,
                          image: order.productId.image,
                          quantity: order.count,
                          unitPrice: order.price,
                          discount: order.discount,
                          totalPrice: order.totalAmount,
                          status: order.orderStatus,
                          paymentMethod: order.paymentInfo?.method || 'N/A',
                          paymentStatus: order.paymentInfo?.status || 'N/A',
                          orderDate: order.createdAt,
                          shippingAddress: `${order.shippingAddress?.address}, ${order.shippingAddress?.city}, ${order.shippingAddress?.pincode}`,
                          estimatedDelivery: new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                          trackingNumber: `TRK${order._id.toString().slice(-8).toUpperCase()}`
                        });
                        setShowModal(true);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {order.title}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.orderStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                      order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              </div>
) : (
  <div className="text-center py-12">
    <Package className="mx-auto text-gray-400 mb-4" size={48} />
    <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
    <p className="text-gray-500">Please buy some product first</p>
  </div>
)}
          </tbody>
          </table>
        </div>
      </div> */}


<UserDetailsModal
  isOpen={showUserModal}
  onClose={() => setShowUserModal(false)}
  selectedUser={selectedUser}
  handleViewOrders={handleViewOrders}
  handleSendMessage={handleSendMessage}
/>

 

{showModal && selectedOrder && (
  <OrderDetailsModal
    showModal={showModal}
    selectedOrder={selectedOrder}
    closeModal={() => setShowModal(false)}
    formatDate={formatDate}
    getStatusColor={getStatusColor}
  />
)}




    </div>
  );
};

export default RenderDashboard;

