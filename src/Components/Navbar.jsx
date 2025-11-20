
// //clude 3

// import React, { useState, useRef, useEffect } from 'react';
// import { PackageSearch } from "lucide-react";
// import './Navbar.css'; // 👈 Importing the CSS file
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from "react-icons/fa";
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import { setFilters,resetFilters } from "../redux/Slices/filtersSlice";
// import { clearCart } from "../redux/Slices/CartSlice"; // adjust the path if needed

// import { fetchFilteredProducts } from "../redux/thunks/filterProductsThunk";

// import { loginSuccess, logout } from '../redux/Slices/userSlice.js';
// import { Search, ShoppingCart, User, Home, Menu, X, Filter, Settings } from "lucide-react";



// const Navbar = () => {
//   const { user } = useSelector((state) => state);
//   const { totalItems } = useSelector((state) => state.Cart);

//   const dispatch = useDispatch();

  

//   const isLogin = user.isLoggedIn;
//   const userinfo = user.user;
//   const navigate = useNavigate();

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const [showProfile, setShowProfile] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
// const [showFilterModal, setShowFilterModal] = useState(false);
//   const [priceRange, setPriceRange] = useState(10);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedRating, setSelectedRating] = useState(false);
// const [minDiscount, setMinDiscount] = useState("");
//   const profileRef = useRef(null);
//   const menuRef = useRef(null);
//   const mobileMenuRef = useRef(null);
// // Yes — if you send an empty or default req.body like this:
// // {
// //   "keyword": "",
// //   "type": "",
// //   "priceRange": 10000,
// //   "brands": [],
// //   "page": 1
// // }
// //  What this means:
// // keyword: "" → No search filter.

// // type: "" → No category filter.

// // brands: [] → No brand filtering.

// // priceRange: 10000 → Likely includes all products (unless some cost more).

// // page: 1 → You’re asking for the first page of results.

// // ✅ So yes, if your backend is written correctly, this will fetch all products, paginated starting from page 1.

//   const categories = [
//     {name:'All' ,value:''},
//     { name: 'Smartphones', value: 'smartphones' },
//     { name: 'Electronics', value: 'electronics' },
//     { name: 'Jewelry', value: 'jewelery' },
//     { name: "Men's Clothing", value: 'men-clothing' },
//     { name: "Women's Clothing", value: 'women-clothing' },
//     { name: 'Food', value: 'food' },
//     { name: 'Beauty', value: 'beauty' },
//     { name: "Kids' Clothing", value: 'kids-clothing' },
//     { name: 'Footwear', value: 'footwear' },
//     { name: 'Kids', value: 'kids' }
//   ];

//   const brands = ['Nike', 'Adidas', 'Zara', 'Puma', 'Apple', 'Samsung'];
//   const colors = ['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow'];
//   const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowProfile(false);
//       }
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowMenu(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         setShowMobileMenu(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
// console.log(totalItems);

//  }, []);


// const handleSearch = () => {
//   if (!searchTerm.trim()) return; // Avoid empty searches

//   dispatch(resetFilters()); // Reset all filters first

//   dispatch(setFilters({ keyword: searchTerm.trim(), page: 1 })); // Set keyword & reset page to 1

//   dispatch(fetchFilteredProducts()); // Trigger API call with current Redux state

//   setSearchTerm(""); // Clear search input after search
// toast.success("your Data");
//   navigate("/home"); // Redirect to products page if needed
// };


//   //**** this fusntion must be used */
//   const handleCategoryClick = (category) => {
//   dispatch(resetFilters()); // Resets to default
//  dispatch(setFilters({ type: category.value,page:1}));// Only set category
// dispatch(fetchFilteredProducts());
// toast.success("your Data");
// navigate('/home');

// };
//   const logoutFunction = () => {
//     localStorage.removeItem("lastPath");
//      localStorage.removeItem("cart");
//     localStorage.removeItem("token");
//       dispatch(clearCart());
//     dispatch(logout());
//     navigate("/")
//     toast.error("Logged Out");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleBrandChange = (brand) => {
//     setSelectedBrands(prev => 
//       prev.includes(brand) 
//         ? prev.filter(b => b !== brand)
//         : [...prev, brand]
//     );
//   };

// const applyFilters = () => {
//   dispatch(setFilters({
//     priceRange: parseInt(priceRange), // slider value
//     type: selectedCategory || null,   // category from dropdown
//     // brands: selectedBrands.length > 0 ? selectedBrands : null, // checkbox list
//     minDiscount: minDiscount ? parseInt(minDiscount) : null,   // discount input
//   }));

//   dispatch(fetchFilteredProducts()); // ✅ Trigger fetch with new filters

//   toast.success("Filters applied successfully!");
//   setShowFilterModal(false);
// };

//   const resetFilters2 = () => {
//   setPriceRange(1000);
//   setSelectedCategory("");
//   setSelectedBrands([]);
//   setMinDiscount("");

    
//   dispatch(resetFilters()); // Resets to default
//    setShowFilterModal(false);
//   toast.success("Filters reset successfully!");
//       dispatch(fetchFilteredProducts());
       
//   };

//   const handleHomePage = async () => {
//     // Optional: Reset filters if you have such an action

//     dispatch(resetFilters()); // 🧹 Reset filters (you should define this if not done)
      
//          toast.success("Landing Page");
//     //  window.scrollTo({ top: 0, behavior: "smooth" }); // 3. Smooth scrol
//     await dispatch(fetchFilteredProducts()); // 🔄 Fetch all products
//     navigate("/"); // 🧭 Navigate to home
//   };

//   return (
//     <div className='w-full bg-richblack-900 shadow-lg text-white sticky top-0 z-40'>
//       {/* Main Navbar */}
//       <div className='flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 max-w-screen-2xl mx-auto'>
        
//         {/* Logo */}
//         <div className='flex items-center gap-2 flex-shrink-0'>
//           <button onClick={handleHomePage} className="focus:outline-none">
//             <img 
//               src="/logo.png" 
//               alt="logo" 
//               className='w-[100px] h-[40px] sm:w-[120px] sm:h-[48px] lg:w-[130px] lg:h-[53px] object-contain' 
//               loading='lazy' 
//             />
//         </button>
//         </div>


// <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm flex-1 mx-2 md:mx-6 lg:mx-8 max-w-full sm:max-w-xl lg:max-w-2xl h-[40px] border border-gray-300">
//   <div className="flex-grow min-w-0">
//     <input
//       type="text"
//       placeholder="Search products..."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//       className="w-full px-2 sm:px-4 text-black text-sm sm:text-base outline-none bg-transparent truncate placeholder:text-gray-400"
//     />
//   </div>
//   <button
//     onClick={handleSearch}
//     className="bg-orange-400 h-full px-3 sm:px-4 flex items-center justify-center text-white hover:bg-gray-900 transition"
//   >
//     <Search size={18} />
//   </button>
// </div>




//         {/* Right side controls */}
//         <div className='flex items-center space-x-2 lg:space-x-4'>


//           <div className="hidden xl:flex items-center space-x-3">
//   {/* Home Button for large screens */}
//   <button
//     onClick={handleHomePage}
//     className="bg-richblack-800 py-2 px-3 rounded-lg border border-richblack-700 hover:bg-richblack-700 transition-colors"
//   >
//     <Home size={20} />
//   </button>

//   {/* Cart Button */}
//   <button
//     onClick={() => {
//       // if (isLogin) {
//         navigate("/cart");
//       // } else {
//         // toast.error("Please login first");
//       // }
//     }}
//     className="relative p-2 hover:bg-richblack-800 rounded-lg transition-colors"
//   >
//     <ShoppingCart size={24} />
//     {totalItems > 0 && (
//       <span className='absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white font-bold'>
//         {totalItems}
//       </span>
//     )}
//   </button>
// </div>
          
// {!isLogin && (
//   <>
//     <Link to="/Login">
//       <button className='bg-richblack-800 py-2 px-4 rounded-lg border border-richblack-700 hover:bg-green-600 hover:border-green-700 transition-all duration-200'>
//         Login
//       </button>
//     </Link>
//     {/* <Link to="/Signup">
//       <button className='bg-richblack-800 py-2 px-4 rounded-lg border border-richblack-700 hover:bg-green-600 hover:border-green-700 transition-all duration-200'>
//         Signup
//       </button>
//     </Link> */}
//   </>
// )}


//           {/* Logged in user controls */}
//           {isLogin && (
//             <>
//                {/* Profile Dropdown */}
//               <div className="relative" ref={profileRef}>
//                 <button
//                   className='w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full text-white flex items-center justify-center hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg'
//                   onClick={() => setShowProfile(!showProfile)}
//                 >
//                   <User size={18} className="lg:w-5 lg:h-5" />
//                 </button>

//                 {/* Profile dropdown */}
//                 {showProfile && (
//                   <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white text-black p-5 rounded-xl shadow-2xl z-50 border">
//                     <h2 className="text-lg font-bold mb-3 text-gray-800">Welcome Back!</h2>
//                     <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                       <p className="font-semibold text-lg text-gray-800">{userinfo.name}</p>
//                       <p className="text-sm text-gray-600">{userinfo.email}</p>
//                       <p className="text-sm text-orange-600 mt-1 capitalize">Role: {userinfo.role}</p>
//                     </div>
//                     <button
//                       onClick={logoutFunction}
//                       className="w-full py-3 text-red-600 font-semibold hover:bg-red-50 hover:text-red-700 rounded-lg transition-all border border-red-200"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     {/* Desktop Category Bar */}
// <div className="w-full bg-gray-800 border-t border-gray-700">
//   <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
//     <div className="flex items-center justify-between py-2">
//       {/* Category Scroll - Hidden on small screens */}
    
// <div className="hidden xl:flex overflow-x-auto space-x-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 flex-1">
//   {categories.map((category, index) => (
//     <button
//       key={index}
//       className="flex-shrink-0 px-3 py-2 xl:px-4 xl:py-2 text-sm xl:text-base text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 whitespace-nowrap font-medium"
//       onClick={() => handleCategoryClick(category)}
//     >
//       {category.name}
//     </button>
//   ))}
// </div>

//    {/* LEFT SIDE: Home & Cart (visible only on small screens) */}
//    <div className="flex xl:hidden items-center space-x-2 sm:space-x-3">
//       {/* Home Icon */}
//       <button
//         onClick={() => navigate("/")}
//         className="p-2 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 transition"
//         title="Home"
//       >
//         <Home size={20} className="text-white" />
//       </button>

//       {/* Product Icon */}
//       <button
//         onClick={() => navigate("/home")}
//         className="p-2 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 transition"
//         title="Products"
//       >
//         <PackageSearch size={20} className="text-white" />
//       </button>

//       {/* Cart Icon */}
//       <button
//         onClick={() => navigate("/cart")}
//         className="relative p-2 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 transition"
//         title="Cart"
//       >
//         <ShoppingCart size={20} className="text-white" />
//         {totalItems > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse font-bold">
//             {totalItems}
//           </span>
//         )}
//       </button>
//     </div>

//       {/* Right side - Filter + More buttons */}
//       <div className="flex space-x-2 ml-4 relative items-center">
//       {/* Filter Button */}
// <button
//   onClick={() =>{ setShowFilterModal(true)

//      console.log('Filter modal opened');}
//   }
//   className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
// >
  
//   <Filter size={20} className="text-green-400" />
//   <span className="hidden lg:inline text-sm">Filter</span>
// </button>
// {showFilterModal && (
//   <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center px-2 sm:px-4">
//     <div className="bg-white rounded-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">

//       {/* Header */}
//       <div className="text-black p-4 rounded-t-xl flex justify-between items-center">
//         <h3 className="text-lg font-bold">Filter Products</h3>
//         <button onClick={() => setShowFilterModal(false)} className="hover:text-gray-200">
//           <X size={22} />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="p-5 space-y-6">

//         {/* Price Range */}
//         <div>
//           <label className="text-sm font-semibold text-gray-700">Price Range</label>
//           <input
//             type="range"
//             min="0"
//             max="1000"
//             value={priceRange}
//             onChange={(e) => setPriceRange(e.target.value)}
//             className="w-full mt-2 appearance-none h-2 bg-green-200 rounded-lg cursor-pointer"
//           />
//           <div className="flex justify-between text-xs text-gray-600 mt-1">
//             <span>₹0</span>
//             <span className="font-semibold text-green-600">₹{priceRange}</span>
//             <span>₹1000+</span>
//           </div>
//         </div>

//         {/* Category */}
//         <div>
//           <label className="text-sm font-semibold text-gray-700">Category</label>
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="text-black  w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat.value} value={cat.value}>{cat.name}</option>
//             ))}
//           </select>
//         </div>

//         {/* Brands */}
//         <div>
//           <label className="text-sm font-semibold text-gray-700">Brands</label>
//           <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto mt-2">
//             {brands.map((brand) => (
//               <label key={brand} className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition">
//                 <input
//                   type="checkbox"
//                   checked={selectedBrands.includes(brand)}
//                   onChange={() => handleBrandChange(brand)}
//                   className="text-green-600 focus:ring-green-500"
//                 />
//                 {brand}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Discount */}
// {/* Minimum Discount */}
// <div>
//   <label className="text-sm font-semibold text-gray-700">Minimum Discount</label>
//   <select
//     value={minDiscount}
//     onChange={(e) => setMinDiscount(e.target.value)}
//     className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
//   >
//     <option value="">Any</option>
//     <option value="10">10% or more</option>
//     <option value="20">20% or more</option>
//     <option value="30">30% or more</option>
//     <option value="50">50% or more</option>
//   </select>
// </div>

//       </div>

//       {/* Footer */}
//       <div className="bg-gray-100 px-5 py-4 flex gap-3 rounded-b-xl border-t border-gray-200">
//         <button
//           onClick={resetFilters2}
//           className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition"
//         >
//           Reset
//         </button>
//         <button
//           onClick={applyFilters}
//           className="flex-1 py-2 bg-gray-900 text-white rounded-lg hover:bg-green-700 transition"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//         {/* More Button */}
//         <div ref={menuRef} className="relative">
//           <button
//             onClick={() =>
//               {
//     if (isLogin) {
//       setShowMenu((prev) => !prev)
//     } else {
//       toast.error("Please login first");
//     }
//   }}
//               className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 right-0"
//           >
//             <Menu size={20} />
//             <span className="hidden lg:inline text-sm">More</span>
//           </button>
//           {/* Dropdown */}
//           {showMenu && (
//             <div className="absolute right-0 mt-2 w-80 lg:w-96 bg-white text-black p-6 rounded-xl shadow-2xl z-50 space-y-4 border">
//               {isLogin && (
//                 <div>
//              {userinfo?.role === "Admin" ? (
//   <>
//     <Link to="/Admin">
//       <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium relative z-[9999] mb-2">
//         Admin Panel
//       </button>
//     </Link>

//     <Link to="/userpanel">
//       <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium relative z-[9999]">
//         User Panel
//       </button>
//     </Link>
//   </>
// ) : (
//   <Link to="/userpanel">
//     <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium relative z-[9999]">
//       User Panel
//     </button>
//   </Link>
// )}

//                 </div>
//               )}

//               <button
//                 onClick={() => toast.success("Settings coming soon")}
//                 className="w-full text-left text-gray-700 hover:bg-gray-100 p-3 rounded-lg border-t transition-colors flex items-center space-x-2"
//               >
//                 <Settings size={20} />
//                 <span>Settings</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState, useRef, useEffect } from 'react';
import { PackageSearch } from "lucide-react";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setFilters, resetFilters } from "../redux/Slices/filtersSlice";
import { clearCart } from "../redux/Slices/CartSlice";
import { fetchFilteredProducts } from "../redux/thunks/filterProductsThunk";
import { loginSuccess, logout } from '../redux/Slices/userSlice.js';
import { Search, ShoppingCart, User, Home, Menu, X, Filter, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state);
  const { totalItems } = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  
  const isLogin = user.isLoggedIn;
  const userinfo = user.user;
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceRange, setPriceRange] = useState(10);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minDiscount, setMinDiscount] = useState("");
  
  const authDropdownRef = useRef(null);

  const categories = [
    {name:'All', value:''},
    { name: 'Smartphones', value: 'smartphones' },
    { name: 'Electronics', value: 'electronics' },
    { name: 'Jewelry', value: 'jewelery' },
    { name: "Men's Clothing", value: 'men-clothing' },
    { name: "Women's Clothing", value: 'women-clothing' },
    { name: 'Food', value: 'food' },
    { name: 'Beauty', value: 'beauty' },
    { name: "Kids' Clothing", value: 'kids-clothing' },
    { name: 'Footwear', value: 'footwear' },
    { name: 'Kids', value: 'kids' }
  ];

  const brands = ['Nike', 'Adidas', 'Zara', 'Puma', 'Apple', 'Samsung'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setShowAuthDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    dispatch(resetFilters());
    dispatch(setFilters({ keyword: searchTerm.trim(), page: 1 }));
    dispatch(fetchFilteredProducts());
    setSearchTerm("");
    toast.success("Search applied");
    navigate("/home");
  };

  const handleCategoryClick = (category) => {
    dispatch(resetFilters());
    dispatch(setFilters({ type: category.value, page:1}));
    dispatch(fetchFilteredProducts());
    toast.success("Category applied");
    navigate('/home');
  };

  const logoutFunction = () => {
    localStorage.removeItem("lastPath");
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    dispatch(clearCart());
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully");
    setShowAuthDropdown(false);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const applyFilters = () => {
    dispatch(setFilters({
      priceRange: parseInt(priceRange),
      type: selectedCategory || null,
      minDiscount: minDiscount ? parseInt(minDiscount) : null,
    }));
    dispatch(fetchFilteredProducts());
    toast.success("Filters applied");
    setShowFilterModal(false);
  };

  const resetFilters2 = () => {
    setPriceRange(1000);
    setSelectedCategory("");
    setSelectedBrands([]);
    setMinDiscount("");
    dispatch(resetFilters());
    setShowFilterModal(false);
    toast.success("Filters reset");
    dispatch(fetchFilteredProducts());
  };

  const handleHomePage = async () => {
    dispatch(resetFilters());
    toast.success("Home");
    await dispatch(fetchFilteredProducts());
    navigate("/");
  };

  return (
    <div className='w-full bg-richblack-900 shadow-lg text-white sticky top-0 z-40'>
      {/* Main Navbar */}
      <div className='flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 max-w-screen-2xl mx-auto'>
        
        {/* Logo */}
        <div className='flex items-center gap-2 flex-shrink-0'>
          <button onClick={handleHomePage} className="focus:outline-none">
            <img 
              src="/logo.png" 
              alt="logo" 
              className='w-[100px] h-[40px] sm:w-[120px] sm:h-[48px] lg:w-[130px] lg:h-[53px] object-contain' 
              loading='lazy' 
            />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm flex-1 mx-2 md:mx-6 lg:mx-8 max-w-full sm:max-w-xl lg:max-w-2xl h-[40px] border border-gray-300">
          <div className="flex-grow min-w-0">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-2 sm:px-4 text-black text-sm sm:text-base outline-none bg-transparent truncate placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-orange-400 h-full px-3 sm:px-4 flex items-center justify-center text-white hover:bg-orange-500 transition"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Right side controls */}
        <div className='flex items-center space-x-2 lg:space-x-4'>
          {/* Desktop - Home & Cart */}
          <div className="hidden xl:flex items-center space-x-3">
            <button
              onClick={handleHomePage}
              className="bg-richblack-800 py-2 px-3 rounded-lg border border-richblack-700 hover:bg-richblack-700 transition-colors"
            >
              <Home size={20} />
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-richblack-800 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white font-bold'>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          
          {/* Auth Dropdown - Login/Signup or User Profile */}
          <div className="relative" ref={authDropdownRef}>
            <button
              className='w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full text-white flex items-center justify-center hover:from-teal-500 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg'
              onClick={() => setShowAuthDropdown(!showAuthDropdown)}
            >
              <User size={20} />
            </button>

  
            {showAuthDropdown && (
              <div className="absolute right-[30px] mt-3 w-[160px] bg-white text-black rounded-lg shadow-2xl z-50 border border-richblack-700 overflow-hidden">
                {!isLogin ? (
                  // Not Logged In - Show Login & Signup
                  <>
                    <Link to="/Login" onClick={() => setShowAuthDropdown(false)}>
                      <button className="w-full text-left px-4 py-3 hover:bg-richblack-700 transition-colors flex items-center space-x-3 border-b border-richblack-700">
                        <User size={18} />
                        <span>Login</span>
                      </button>
                    </Link>
                    <Link to="/Signup" onClick={() => setShowAuthDropdown(false)}>
                      <button className="w-full text-left px-4 py-3 hover:bg-richblack-700 transition-colors flex items-center space-x-3">
                        <User size={18} />
                        <span>Signup</span>
                      </button>
                    </Link>
                  </>
                ) : (
                  // Logged In - Show Dashboard/Admin & Logout
                  <>
                    {userinfo?.role === "Admin" ? (
                      <Link to="/Admin" onClick={() => setShowAuthDropdown(false)}>
                        <button className="w-full text-left px-4 py-3 hover:bg-richblack-700 transition-colors flex items-center space-x-3 border-b border-richblack-700">
                          <LayoutDashboard size={18} />
                          <span>Admin Panel</span>
                        </button>
                      </Link>
                    ) : null}
                    
                    <Link to="/userpanel" onClick={() => setShowAuthDropdown(false)}>
                      <button className="w-full text-left px-4 py-3 hover:bg-richblack-700 transition-colors flex items-center space-x-3 border-b border-richblack-700">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                      </button>
                    </Link>

                    <button
                      onClick={logoutFunction}
                      className="w-full text-left px-4 py-3 hover:bg-richblack-700 transition-colors flex items-center space-x-3 text-red-400"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Category Bar */}
      <div className="w-full bg-gray-800 border-t border-gray-700">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between py-2">
            {/* Category Scroll - Desktop */}
            <div className="hidden xl:flex overflow-x-auto space-x-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 flex-1">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="flex-shrink-0 px-3 py-2 xl:px-4 xl:py-2 text-sm xl:text-base text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 whitespace-nowrap font-medium"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Mobile - Home, Products & Cart */}
            <div className="flex xl:hidden items-center space-x-2 sm:space-x-3">
              <button
                onClick={handleHomePage}
                className="p-2 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 transition"
                title="Home"
              >
                <Home size={20} className="text-white" />
              </button>

              <button
                onClick={() => navigate("/home")}
                className="p-2 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 transition"
                title="Products"
              >
                <PackageSearch size={20} className="text-white" />
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 transition"
                title="Cart"
              >
                <ShoppingCart size={20} className="text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Filter Button */}
            <div className="ml-4">
              <button
                onClick={() => setShowFilterModal(true)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Filter size={20} className="text-green-400" />
                <span className="hidden lg:inline text-sm">Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-2 sm:px-4">
          <div className="bg-white rounded-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="bg-gray-900 text-white p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-lg font-bold">Filter Products</h3>
              <button onClick={() => setShowFilterModal(false)} className="hover:text-gray-300">
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6">
              {/* Price Range */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full mt-2 appearance-none h-2 bg-green-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>₹0</span>
                  <span className="font-semibold text-green-600">₹{priceRange}</span>
                  <span>₹1000+</span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-black w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Brands */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Brands</label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto mt-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Minimum Discount */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Minimum Discount</label>
                <select
                  value={minDiscount}
                  onChange={(e) => setMinDiscount(e.target.value)}
                  className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="">Any</option>
                  <option value="10">10% or more</option>
                  <option value="20">20% or more</option>
                  <option value="30">30% or more</option>
                  <option value="50">50% or more</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-100 px-5 py-4 flex gap-3 rounded-b-xl border-t border-gray-200">
              <button
                onClick={resetFilters2}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;