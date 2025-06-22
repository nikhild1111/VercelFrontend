import React, { useState, useEffect } from 'react';
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

import Dashboard from './Admincoponents/Dashboard';
import Orders from './Admincoponents/Orders';
import UserManagement from './Admincoponents/UserManagement';
import Products from './Admincoponents/Products';
import Vendors from './Admincoponents/Vendors';
import Analytics from './Admincoponents/Analytics';
import SettingsPage from './Admincoponents/Settings';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateOrderPage, setOrderFilters } from "../redux/Slices/orderFiltersSlice";
import adminfetchFilteredOrders from "../redux/thunks/adminfetchFilteredOrders";
import { clearCart } from "../redux/Slices/CartSlice";
import { logout } from "../redux/Slices/userSlice";




const AdminDashboard = () => {  
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
  totalOrders,
  totalRevenue,
  orderCount,
  pendingCount,
  userCount,
  orders
} = useSelector((state) => state.adminorders);

  const { page, totalPages, keyword, status, date, sort } = useSelector(state => state.orderFilters);

const dashboardStats = {
  totalOrders,
  totalRevenue,
  orderCount,
  pendingOrders: pendingCount,
  totalUsers: userCount,
};




 
 useEffect(() => {
    dispatch(adminfetchFilteredOrders());
  }, [dispatch, page, keyword, status, date, sort]);


  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(updateOrderPage(newPage));
  };

  
  
  // Function to generate pagination numbers with ellipsis logic
  const generatePaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex logic for showing pages with ellipsis
      if (page <= 3) {
        // Show first 3 pages, ellipsis, and last page
        pages.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first page, ellipsis, current page with neighbors, ellipsis, last page
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    
    return pages;
  };


 const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'vendors', label: 'Vendors', icon: Store },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'logout', label: 'Logout', icon: LogOut } // ✅ New logout item
];






const renderContent = () => {
  switch (activeSection) {
    case 'dashboard':
      return <Dashboard />;

    case 'orders':
      return <Orders />;

    case 'products':
      return <Products />;

    case 'users':
      return <UserManagement />;

    case 'vendors':
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Vendors section coming soon...</p>
        </div>
      );

    case 'analytics':
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Analytics section coming soon...</p>
        </div>
      );

    case 'settings':
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Settings section coming soon...</p>
        </div>
      );

    case 'logout':
       
     localStorage.removeItem("lastPath");
     localStorage.removeItem("cart");
     localStorage.removeItem("token");
     dispatch(clearCart());
     dispatch(logout());
     navigate("/");
     toast.error("Logged Out");
   
   
    default:
      return <Dashboard />;
  }
};

     return (
       <div className="flex h-screen bg-gray-50">
         {/* Sidebar */}
         <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
         } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
           <div className="flex items-center justify-between h-16 px-6 border-b">
             <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
             <button
               onClick={() => setSidebarOpen(false)}
               className="lg:hidden text-gray-400 hover:text-gray-600"
             >
               <X className="w-6 h-6" />
             </button>
           </div>
           <nav className="mt-6">
             {sidebarItems.map((item) => {
               const Icon = item.icon;
               return (
                 <button
                   key={item.id}
                   onClick={() => {
                     setActiveSection(item.id);
                     setSidebarOpen(false);
                   }}
                   className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                     activeSection === item.id ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : 'text-gray-700'
                   }`}
                 >
                   <Icon className="w-5 h-5 mr-3" />
                   {item.label}
                 </button>
               );
             })}
           </nav>
         </div>
   
     
         <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
       
           <header className="bg-white shadow-sm border-b px-6 py-4">
             <div className="flex items-center justify-between">
               <button
                 onClick={() => setSidebarOpen(true)}
                 className="lg:hidden text-gray-400 hover:text-gray-600"
               >
                 <Menu className="w-6 h-6" />
               </button>
               <div className="flex items-center space-x-4">
                 <button className="relative p-2 text-gray-400 hover:text-gray-600">
                   <Bell className="w-6 h-6" />
                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                 </button>
                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                   <span className="text-white text-sm font-medium">A</span>
                 </div>
               </div>
             </div>
           </header>
   
      
           <main className="flex-1 overflow-x-hidden overflow-y-auto px-3 py-6">
            <div>
              {renderContent()}
              </div> 

<div>

  {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-4 mt-14">
            {/* Pagination Controls */}
            <div className="flex items-center justify-center space-x-2 bg-gray-800 px-4 py-3 rounded-lg shadow-lg">
              {/* Previous Button */}
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className={`
                  px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium
                  transition-all duration-300 ease-in-out
                  ${page === 1 
                    ? 'text-gray-500 cursor-not-allowed opacity-50' 
                    : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
                  }
                `}
              >
                <span className="block sm:hidden text-lg">{'<'}</span>
                <span className="hidden sm:block">Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1 mx-1 sm:mx-2">
                {generatePaginationNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-2 py-1 text-gray-400 text-sm sm:text-base"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`
                        w-9 h-9 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base font-semibold
                        transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
                        ${page === pageNum
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/50 scale-105' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                      `}
                    >
                      {pageNum}
                    </button>
                  )
                ))}
              </div>

              {/* Last Page Quick Jump */}
              {totalPages > 600 && !generatePaginationNumbers().includes(totalPages) && (
                <>
                  <span className="px-2 py-1 text-gray-400 text-sm sm:text-base">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out
                             text-gray-300 hover:bg-gray-700 hover:text-white transform hover:scale-105 active:scale-95"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next Button */}
              <button
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className={`
                  px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-300 ease-in-out
                  ${page === totalPages 
                    ? 'text-gray-500 cursor-not-allowed opacity-50' 
                    : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
                  }
                `}
              >
                <span className="block sm:hidden text-lg">{'>'}</span>
                <span className="hidden sm:block">Next</span>
              </button>
            </div>

            {/* Page info indicator */}
            <div className="flex justify-center">
              <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                Showing page {page} of {totalPages}
              </div>
            </div>
          </div>
        )}

      
</div>
           </main>
         </div>

 {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;

