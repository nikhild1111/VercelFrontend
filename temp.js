

import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, User, Home, Menu, X } from "lucide-react";

// Mock components for navigation (replace with your actual routing)
const Link = ({ to, children, onClick }) => (
  <div onClick={onClick} style={{ cursor: 'pointer' }}>
    {children}
  </div>
);

// Mock toast for notifications
const toast = {
  success: (message) => console.log('Success:', message),
  error: (message) => console.log('Error:', message)
};

// Mock Redux hooks
const useSelector = (selector) => {
  return selector({
    user: {
      isLoggedIn: true,
      user: {
        name: 'Nikhil Domade',
        email: 'nikhil@gmail.com',
        role: 'admin' // Change to 'user' to test regular user
      }
    },
    Cart: [1, 2, 3] // Mock cart items
  });
};

const useDispatch = () => {
  return (action) => console.log('Dispatch:', action);
};

const logout = () => ({ type: 'LOGOUT' });

const Navbar = (props) => {
  const { user, Cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  let isLogin = user.isLoggedIn;
  const userData = user.user; // Get user data from Redux store

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const profileRef = useRef(null);

  // Categories for the bottom bar
  const categories = [
    { name: 'Smartphones', value: 'smartphones' },
    { name: 'Electronics', value: 'electronics' },
    { name: 'Jewelry', value: 'jewelery' },
    { name: "Men's Clothing", value: 'men-clothing' },
    { name: "Women's Clothing", value: 'women-clothing' },
    { name: 'Food', value: 'food' },
    { name: 'Beauty', value: 'beauty' },
    { name: "Kids' Clothing", value: 'kids-clothing' },
    { name: 'Footwear', value: 'footwear' }
  ];

  // Handle click outside profile popup to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    console.log("Searching:", searchTerm, "Category:", selectedCategory);
    toast.success(`Searching for "${searchTerm}" in ${selectedCategory || 'All'}`);
  };

  const logoutFunction = () => {
    // Don't logout if user is admin
    if (userData?.role === 'admin') {
      toast.error("Admin cannot logout from this session");
      return;
    }
    
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Logged Out Successfully");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='w-full bg-gray-900 shadow-lg text-white'>
      {/* Main Navbar */}
      <div className='flex items-center justify-between px-4 py-3 max-w-7xl mx-auto'>
        {/* Left Side: Logo */}
        <div className='flex items-center gap-3'>
          <Link to="/">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold hidden sm:block">ShopEase</span>
            </div>
          </Link>
          
          {/* Admin Button - Only show for admin users */}
          {isLogin && userData?.role === 'admin' && (
            <Link to="/Admin">
              <button className='hidden md:block bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md text-sm'>
                Admin Panel
              </button>
            </Link>
          )}
        </div>

        {/* Middle: Search Bar - Hidden on mobile, shown in mobile menu */}
        <div className="hidden md:flex items-center bg-white rounded-lg overflow-hidden w-full max-w-2xl mx-4 shadow-md">
          <select
            className="text-sm text-gray-700 bg-gray-50 py-3 px-4 border-r border-gray-200 outline-none min-w-fit"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            <option value="men">Men's Fashion</option>
            <option value="women">Women's Fashion</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="smartphones">Smartphones</option>
          </select>
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow px-4 py-3 text-gray-700 text-sm outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center gap-2"
          >
            <Search size={16} />
          </button>
        </div>

        {/* Right Side */}
        <div className='flex items-center space-x-2 md:space-x-4'>
          {!isLogin ? (
            <>
              <Link to="/Login">
                <button className='bg-gradient-to-r from-green-600 to-green-700 py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm md:text-base'>
                  Login
                </button>
              </Link>
              <Link to="/Signup">
                <button className='bg-gradient-to-r from-blue-600 to-blue-700 py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm md:text-base'>
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/Home">
                  <button className='flex items-center gap-2 bg-gray-800 py-2 px-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-all duration-200'>
                    <Home size={16} />
                    Home
                  </button>
                </Link>

                <Link to="/cart">
                  <div className='relative p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 cursor-pointer'>
                    <ShoppingCart size={20} />
                    {Cart.length > 0 && (
                      <span className='absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white font-bold'>
                        {Cart.length}
                      </span>
                    )}
                  </div>
                </Link>
              </div>

              {/* Profile Button + Popup */}
              <div className="relative" ref={profileRef}>
                <button
                  className='w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full text-gray-700 flex items-center justify-center hover:from-gray-300 hover:to-gray-400 transition-all duration-200 shadow-md'
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <User size={16} />
                </button>

                {showProfile && (
                  <div className='absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-4 text-gray-800 z-50 border border-gray-100'>
                    <div className="border-b border-gray-200 pb-3 mb-3">
                      <p className="font-semibold text-lg text-gray-900">
                        {userData?.name || userData?.firstName || 'User Name'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {userData?.email || 'user@example.com'}
                      </p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        userData?.role === 'admin' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        Role: {userData?.role || 'User'}
                      </span>
                    </div>
                    
                    {/* Mobile-only options */}
                    <div className="md:hidden space-y-2 mb-3 border-b border-gray-200 pb-3">
                      <Link to="/Home" onClick={() => setShowProfile(false)}>
                        <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                          <Home size={16} />
                          Home
                        </button>
                      </Link>
                      <Link to="/cart" onClick={() => setShowProfile(false)}>
                        <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                          <ShoppingCart size={16} />
                          Cart {Cart.length > 0 && `(${Cart.length})`}
                        </button>
                      </Link>
                      {userData?.role === 'admin' && (
                        <Link to="/Admin" onClick={() => setShowProfile(false)}>
                          <button className="w-full text-left py-2 px-3 text-blue-700 hover:bg-blue-50 rounded-lg">
                            Admin Panel
                          </button>
                        </Link>
                      )}
                    </div>
                    
                    <button
                      onClick={logoutFunction}
                      className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      {userData?.role === 'admin' ? 'Switch Account' : 'Logout'}
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-all duration-200"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileMenu && isLogin && (
        <div className="md:hidden px-4 pb-3 bg-gray-800">
          <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-md">
            <select
              className="text-sm text-gray-700 bg-gray-50 py-2 px-3 border-r border-gray-200 outline-none"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">All</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="electronics">Electronics</option>
            </select>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow px-3 py-2 text-gray-700 text-sm outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-white"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Category Bar */}
      <div className="w-full bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto py-2 px-4 space-x-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex-shrink-0 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 whitespace-nowrap"
                onClick={() => {
                  setSelectedCategory(category.value);
                  toast.success(`Selected ${category.name}`);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-600 {
          scrollbar-color: #4b5563 #374151;
        }
        .scrollbar-track-gray-800 {
          background: #1f2937;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Navbar;