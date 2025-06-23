// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from "react-icons/fa";
// import Cart from '../Pages/Cart';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// const Navbar = (props) => {
//   let isLogin=props.isLogin;
//   let setIsLoggedIn=props.setIsLoggedIn;
//   const{Cart}=useSelector((state)=>state);
//   return (
//     <div className=''>
//         <div className='flex items-center justify-between h-20 mx-auto w-full'>
//         {/* <Link to="/"> */}

//         {/* this i was hide becuse i wan to show admin panel after you done the  */}
//        {
// !isLogin &&
// <div className='md:ml-5'>
// <img src="/logo.png" alt="logo" className='w-[130px] h-[53px]' loading='lazy'>
// </img>
// </div>

//        }


// {isLogin && <Link to="/Admin">     <button  className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 text-white'
//         >
//             Admin 
//         </button>
//         </Link> }
//             <div className='flex items-center font-medium text-slate-100 mr-5 space-x-2 md:space-x-6'>


//             {!isLogin && <Link to="/Login">     <button  className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'
//         >
//             Login
//         </button>
//         </Link> }
//             {!isLogin && <Link to="/Signup">     <button  className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'
//         >
//             Signup
//         </button>
//         </Link> }
//          {isLogin &&
//         <Link to="/">
//         <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'
//         onClick={()=>{
//           localStorage.removeItem("token"); 
//             setIsLoggedIn(false);
//             toast.error("Logged Out");
//         }}
//         >
//            Log Out
//         </button>
//         </Link>
//     }
//             { isLogin &&
//         <Link to="/Home">
//         <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'
//         >
//             Home
//         </button>
//         </Link>
//     }
//              { isLogin &&   <Link to="/cart"><div className='relative'>
//                 <FaShoppingCart className='text-2xl'/>
//                 {
//                   Cart.length>0 && 
//                   <span
//                   className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white'
//                   >{Cart.length}</span>
//                 }
//                 </div></Link>}
//             </div>

//         </div>
      
//     </div>
//   )
// }

// export default Navbar

//************************ */

// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from "react-icons/fa";
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
// import { loginSuccess, logout} from '../redux/Slices/userSlice.js'; 
// import { Search, ShoppingCart, User, Home, Menu, X } from "lucide-react";


// const Navbar = (props) => {
//    const { user,Cart} = useSelector((state) => state);
//   const dispatch=useDispatch();
//    let isLogin=user.isLoggedIn;
// let userinfo=user.user;
// console.log(userinfo);

//     // console.log(user)
//   // const { isLogin, setIsLoggedIn } = props;
//   // const { Cart } = useSelector((state) => state);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showProfile, setShowProfile] = useState(false);

//   const profileRef = useRef(null);

// // Categories for the bottom bar
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
//     // Search logic goes here (filter or redirect)
//     console.log("Searching:", searchTerm, "Category:", selectedCategory);
//     toast.success(`Searching for "${searchTerm}" in ${selectedCategory || 'All'}`);
//   };

//   const logoutFunction = () => {
//     localStorage.removeItem("token");
//       dispatch(logout());
//     toast.error("Logged Out");
//   };

//   return (
//     <div className='w-full bg-richblack-900 shadow-md text-white'>
//       <div className='flex flex-row md:flex-row items-center justify-between px-4 py-3 max-w-screen-xl mx-auto'>

//         {/* Left Side: Logo or Admin */}
//         <div className='flex items-center gap-3'>
//           {/* {!isLogin && ( */}

//           <Link to="/Home">
// <button>
//  <img src="/logo.png" alt="logo" className='w-[130px] h-[53px]' loading='lazy' />
//           </button>
//               </Link>
          
           
//           {/* )} */}
//           {/* {isLogin && (
//             <Link to="/Admin">
//               <button className='bg-richblack-800 text-white py-2 px-4 rounded border border-richblack-700'>
//                 Admin
//               </button>
//             </Link>
//           )} */}
//         </div>

//         {/* Middle: Search Bar */}
//         <div className="flex items-center bg-white rounded overflow-hidden w-full md:max-w-xl my-3 md:my-0">
//           {/* <select
//             className="text-sm text-black bg-gray-100 py-2 px-3 border-r border-gray-300"
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">All</option>
//             <option value="men">Men</option>
//             <option value="women">Women</option>
//             <option value="electronics">Electronics</option>
//             <option value="jewelery">Jewellery</option>
//           </select> */}
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-grow px-3 py-2 text-black text-sm outline-none"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-orange-400 px-4 py-3 text-white hover:bg-orange-500 rounded"
//           >
//              <Search size={16} />
//           </button>
//         </div>

//         {/* Right Side */}
//         <div className='flex items-center space-x-4'>

//           {!isLogin && (
//             <>
//               <Link to="/Login">
//                 <button className='bg-richblack-800 py-2 px-3 rounded border border-richblack-700'>Login</button>
//               </Link>
//               <Link to="/Signup">
//                 <button className='bg-richblack-800 py-2 px-3 rounded border border-richblack-700'>Signup</button>
//               </Link>
//             </>
//           )}

//           {isLogin && (
//             <>
//               <Link to="/Home">
//                 <button className='bg-richblack-800 py-2 px-3 rounded border border-richblack-700'> <Home size={25} /></button>
//               </Link>

//               <Link to="/cart">
//                 <div className='relative'>
//                   {/* <FaShoppingCart className='text-2xl' /> */}
//                     <ShoppingCart size={30} />
//                   {Cart.length > 0 && (
//                     <span className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white'>
//                       {Cart.length}
//                     </span>
//                   )}
//                 </div>
//               </Link>

//               {/* Profile Button + Popup */}
                 
               
//  <div className="relative" ref={profileRef}>
//   <button
//     className='w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full text-gray-700 flex items-center justify-center hover:from-gray-300 hover:to-gray-400 transition-all duration-200 shadow-md'
//     onClick={() => setShowProfile(!showProfile)}
//   >
//     <User size={18} />
//   </button>

//   {showProfile && (
//     <div className="absolute right-0 mt-3 w-72 bg-black text-white p-5 rounded-xl shadow-2xl z-50">
//       <h2 className="text-lg font-bold mb-3">Welcome Back!</h2>
//       <div className="mb-2">
//         <p className="font-semibold text-lg">{userinfo.name}</p>
//         <p className="text-sm text-gray-300">{userinfo.email}</p>
//         <p className="text-sm text-gray-400 mt-1">Role: {userinfo.role}</p>
//       </div>

//       {/* {userinfo.role === "admin" && (
//         <Link to="/Admin">
//           <button className="w-full mt-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-semibold transition-all">
//             Admin Panel
//           </button>
//         </Link>
//       )} */}

//       <button
//         onClick={logoutFunction}
//         className="w-full mt-2 py-2 text-red-500 font-semibold hover:bg-red-100 hover:text-red-700 rounded transition-all"
//       >
//         Logout
//       </button>


//     </div>
//   )}
// </div>


//             </>
//           )}
//         </div>
//       </div>

//             {/* Category Bar */}
//       <div className="w-full bg-gray-800 border-t border-gray-700 h-[50px]">
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
//     </div>


//   );
// };

// export default Navbar;



// // clude two 
// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart } from "react-icons/fa";
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';

// import { loginSuccess, logout } from '../redux/Slices/userSlice.js';
// import { Search, ShoppingCart, User, Home, Menu } from "lucide-react";

// const Navbar = () => {
//   const { user, Cart } = useSelector((state) => state);
//   const dispatch = useDispatch();

//   const isLogin = user.isLoggedIn;
//   const userinfo = user.user;
//   const navigate = useNavigate();


//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showProfile, setShowProfile] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);


//   const profileRef = useRef(null);
//   const menuRef = useRef(null);

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

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowProfile(false);
//       }
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowMenu(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = () => {
//     // toast.success(`Searching for "${searchTerm}" in ${selectedCategory || 'All'}`);
//     let keyword=searchTerm;
//     let category=selectedCategory;
//     setSelectedCategory("");
// setSearchTerm("");
//  navigate(`/home?keyword=${keyword}&category=${category}&page=1`);

//   };

//     const handleCategoryClick = (category) => {
//     setSelectedCategory(category.value);
//     toast.success(`Selected ${category.name}`);
//     handleSearch(category.value);
//   };

//   const logoutFunction = () => {
//     localStorage.removeItem("token");
//     dispatch(logout());
//     toast.error("Logged Out");
//   };

//   return (
//     <div className='w-full bg-richblack-900 shadow-md text-white'>
//       {/* Navbar Top */}
//       <div className='flex flex-row md:flex-row items-center justify-between px-4 py-3 max-w-screen-xl mx-auto'>
//         {/* Left: Logo */}
//         <div className='flex items-center gap-3'>
//           <Link to="/Home">
//             <button>
//               <img src="/logo.png" alt="logo" className='w-[130px] h-[53px]' loading='lazy' />
//             </button>
//           </Link>
//         </div>

//         {/* Middle: Search Bar */}
//         <div className="flex items-center bg-white rounded overflow-hidden w-full md:max-w-xl my-3 md:my-0">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-grow px-3 py-2 text-black text-sm outline-none"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-orange-400 px-4 py-3 text-white hover:bg-orange-500 rounded"
//           >
//             <Search size={16} />
//           </button>
//         </div>

//         {/* Right */}
//         <div className='flex items-center space-x-4'>
//           {!isLogin && (
//             <>
//               <Link to="/Login">
//                 <button className='bg-richblack-800 py-2 px-3 rounded border border-richblack-700'>Login</button>
//               </Link>
//               <Link to="/Signup">
//                 <button className='bg-richblack-800 py-2 px-3 rounded border border-richblack-700'>Signup</button>
//               </Link>
//             </>
//           )}

//           {isLogin && (
//             <>
//               <Link to="/Home">
//                 <button className='bg-richblack-800 py-2 px-3 rounded border border-richblack-700'>
//                   <Home size={25} />
//                 </button>
//               </Link>

//               <Link to="/cart">
//                 <div className='relative'>
//                   <ShoppingCart size={30} />
//                   {Cart.length > 0 && (
//                     <span className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white'>
//                       {Cart.length}
//                     </span>
//                   )}
//                 </div>
//               </Link>

//               {/* Profile Dropdown */}
//               <div className="relative" ref={profileRef}>
//                 <button
//                   className='w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full text-gray-700 flex items-center justify-center hover:from-gray-300 hover:to-gray-400 transition-all duration-200 shadow-md'
//                   onClick={() => setShowProfile(!showProfile)}
//                 >
//                   <User size={18} />
//                 </button>

//                 {showProfile && (
//                   <div className="absolute right-0 mt-3 w-72 bg-black text-white p-5 rounded-xl shadow-2xl z-50">
//                     <h2 className="text-lg font-bold mb-3">Welcome Back!</h2>
//                     <div className="mb-2">
//                       <p className="font-semibold text-lg">{userinfo.name}</p>
//                       <p className="text-sm text-gray-300">{userinfo.email}</p>
//                       <p className="text-sm text-gray-400 mt-1">Role: {userinfo.role}</p>
//                     </div>
//                     <button
//                       onClick={logoutFunction}
//                       className="w-full mt-2 py-2 text-red-500 font-semibold hover:bg-red-100 hover:text-red-700 rounded transition-all"
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

//       {/* Category Bar */}
//       <div className="w-full bg-gray-800 border-t border-gray-700 h-[50px] flex items-center">
//         <div className="max-w-7xl w-full flex items-center mx-auto px-4">
//           {/* Category Buttons */}
//           <div className="flex overflow-x-auto py-2 space-x-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//             {categories.map((category, index) => (
//               <button
//                 key={index}
//                 className="flex-shrink-0 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 whitespace-nowrap"
//                 onClick={() => 
//                    handleCategoryClick(category)}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>

//           {/* Right: Menu Button */}
//           <div className="ml-auto relative" ref={menuRef}>
//             <button
//               className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
//               onClick={() => setShowMenu((prev) => !prev)}
//             >
//               <Menu size={20} />
//             </button>

//             {showMenu && (
//               <div className="absolute right-0 mt-2 w-80 bg-white text-black p-4 rounded-xl shadow-2xl z-50 space-y-4">
//                 {/* Role-Based Panel */}
//                 {userinfo?.role === "Admin" ? (
//                   <Link to="/Admin">
//                     <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//                       Admin Panel
//                     </button>
//                   </Link>
//                 ) : (
//                   <Link to="/UserPanel">
//                     <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//                       User Panel
//                     </button>
//                   </Link>
//                 )}

//                 {/* Sidebar Filters */}
//                 <div className="space-y-3 border-t pt-3 text-sm">
//                   <h3 className="font-semibold">Filter Options</h3>

//                   {/* Price */}
//                   <div>
//                     <label className="text-gray-600">Price Range</label>
//                     <input type="range" min="0" max="5000" className="w-full" />
//                   </div>

//                   {/* Brand */}
//                   <div>
//                     <p className="text-gray-600">Brands</p>
//                     {['Nike', 'Adidas', 'Zara', 'Puma'].map((brand) => (
//                       <label key={brand} className="block">
//                         <input type="checkbox" className="mr-2" /> {brand}
//                       </label>
//                     ))}
//                   </div>

//                   {/* Color & Size */}
//                   <div className="flex justify-between gap-2">
//                     <div className="w-1/2">
//                       <p className="text-gray-600">Color</p>
//                       <select className="w-full border rounded px-2 py-1 text-sm">
//                         <option>Red</option>
//                         <option>Blue</option>
//                         <option>Black</option>
//                       </select>
//                     </div>
//                     <div className="w-1/2">
//                       <p className="text-gray-600">Size</p>
//                       <select className="w-full border rounded px-2 py-1 text-sm">
//                         <option>M</option>
//                         <option>L</option>
//                         <option>XL</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Ratings */}
//                   <div>
//                     <label>
//                       <input type="checkbox" className="mr-2" /> 4★ & Up
//                     </label>
//                   </div>
//                 </div>

//                 {/* Settings */}
//                 <button
//                   onClick={() => toast.success("Settings coming soon")}
//                   className="w-full mt-2 text-left text-gray-700 hover:bg-gray-100 p-2 rounded border-t pt-3"
//                 >
//                   ⚙️ Settings
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

//clude 3

import React, { useState, useRef, useEffect } from 'react';
import { PackageSearch } from "lucide-react";
import './Navbar.css'; // 👈 Importing the CSS file
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setFilters,resetFilters } from "../redux/Slices/filtersSlice";
import { clearCart } from "../redux/Slices/CartSlice"; // adjust the path if needed

import { fetchFilteredProducts } from "../redux/thunks/filterProductsThunk";

import { loginSuccess, logout } from '../redux/Slices/userSlice.js';
import { Search, ShoppingCart, User, Home, Menu, X, Filter, Settings } from "lucide-react";



const Navbar = () => {
  const { user } = useSelector((state) => state);
  const { totalItems } = useSelector((state) => state.Cart);

  const dispatch = useDispatch();

  

  const isLogin = user.isLoggedIn;
  const userinfo = user.user;
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceRange, setPriceRange] = useState(10);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRating, setSelectedRating] = useState(false);
const [minDiscount, setMinDiscount] = useState("");
  const profileRef = useRef(null);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
// Yes — if you send an empty or default req.body like this:
// {
//   "keyword": "",
//   "type": "",
//   "priceRange": 10000,
//   "brands": [],
//   "page": 1
// }
//  What this means:
// keyword: "" → No search filter.

// type: "" → No category filter.

// brands: [] → No brand filtering.

// priceRange: 10000 → Likely includes all products (unless some cost more).

// page: 1 → You’re asking for the first page of results.

// ✅ So yes, if your backend is written correctly, this will fetch all products, paginated starting from page 1.

  const categories = [
    {name:'All' ,value:''},
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
  const colors = ['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
console.log(totalItems);

 }, []);


const handleSearch = () => {
  if (!searchTerm.trim()) return; // Avoid empty searches

  dispatch(resetFilters()); // Reset all filters first

  dispatch(setFilters({ keyword: searchTerm.trim(), page: 1 })); // Set keyword & reset page to 1

  dispatch(fetchFilteredProducts()); // Trigger API call with current Redux state

  setSearchTerm(""); // Clear search input after search
toast.success("your Data");
  navigate("/home"); // Redirect to products page if needed
};


  //**** this fusntion must be used */
  const handleCategoryClick = (category) => {
  dispatch(resetFilters()); // Resets to default
 dispatch(setFilters({ type: category.value,page:1}));// Only set category
dispatch(fetchFilteredProducts());
toast.success("your Data");
navigate('/home');

};
  const logoutFunction = () => {
    localStorage.removeItem("lastPath");
     localStorage.removeItem("cart");
    localStorage.removeItem("token");
      dispatch(clearCart());
    dispatch(logout());
    navigate("/")
    toast.error("Logged Out");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
    priceRange: parseInt(priceRange), // slider value
    type: selectedCategory || null,   // category from dropdown
    // brands: selectedBrands.length > 0 ? selectedBrands : null, // checkbox list
    minDiscount: minDiscount ? parseInt(minDiscount) : null,   // discount input
  }));

  dispatch(fetchFilteredProducts()); // ✅ Trigger fetch with new filters

  toast.success("Filters applied successfully!");
  setShowFilterModal(false);
};

  const resetFilters2 = () => {
  setPriceRange(1000);
  setSelectedCategory("");
  setSelectedBrands([]);
  setMinDiscount("");

    
  dispatch(resetFilters()); // Resets to default
   setShowFilterModal(false);
  toast.success("Filters reset successfully!");
      dispatch(fetchFilteredProducts());
       
  };

  const handleHomePage = async () => {
    // Optional: Reset filters if you have such an action

    dispatch(resetFilters()); // 🧹 Reset filters (you should define this if not done)
      
         toast.success("Landing Page");
    //  window.scrollTo({ top: 0, behavior: "smooth" }); // 3. Smooth scrol
    await dispatch(fetchFilteredProducts()); // 🔄 Fetch all products
    navigate("/"); // 🧭 Navigate to home
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


        
    {/* <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm flex-1 mx-2 sm:mx-4 md:mx-6 lg:mx-8 max-w-full sm:max-w-xl lg:max-w-2xl">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    className="flex-grow px-2 py-2 sm:px-4 sm:py-3 text-black text-sm sm:text-base outline-none bg-transparent"
  />
  <button
    onClick={handleSearch}
    className="bg-orange-400 px-3 py-2 sm:px-4 sm:py-3 text-white hover:bg-orange-500 transition-colors duration-200 flex items-center justify-center"
  >
    <Search size={18} />
  </button>
</div> */}

{/* <div
  className={`${
    !isLogin ? 'hidden sm:flex' : 'flex'
  } items-center bg-white rounded-lg overflow-hidden shadow-sm flex-1 mx-2  md:mx-6 lg:mx-8 max-w-full sm:max-w-xl lg:max-w-2xl h-[35px]`}
>
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    className="flex-grow px-2 py-2 sm:px-4 sm:py-3 text-black text-sm sm:text-base outline-none bg-transparent"
  />
  <button
    onClick={handleSearch}
    className="bg-orange-400 rounded-md px-4 py-4 text-white hover:bg-orange-500 transition-colors duration-200 flex items-center justify-center"
  >
    <Search size={18} />
  </button>
</div> */}


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
    className="bg-orange-400 h-full px-3 sm:px-4 flex items-center justify-center text-white hover:bg-gray-900 transition"
  >
    <Search size={18} />
  </button>
</div>




        {/* Right side controls */}
        <div className='flex items-center space-x-2 lg:space-x-4'>


          <div className="hidden xl:flex items-center space-x-3">
  {/* Home Button for large screens */}
  <button
    onClick={handleHomePage}
    className="bg-richblack-800 py-2 px-3 rounded-lg border border-richblack-700 hover:bg-richblack-700 transition-colors"
  >
    <Home size={20} />
  </button>

  {/* Cart Button */}
  <button
    onClick={() => {
      // if (isLogin) {
        navigate("/cart");
      // } else {
        // toast.error("Please login first");
      // }
    }}
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
          
{!isLogin && (
  <>
    <Link to="/Login">
      <button className='bg-richblack-800 py-2 px-4 rounded-lg border border-richblack-700 hover:bg-green-600 hover:border-green-700 transition-all duration-200'>
        Login
      </button>
    </Link>
    {/* <Link to="/Signup">
      <button className='bg-richblack-800 py-2 px-4 rounded-lg border border-richblack-700 hover:bg-green-600 hover:border-green-700 transition-all duration-200'>
        Signup
      </button>
    </Link> */}
  </>
)}


          {/* Logged in user controls */}
          {isLogin && (
            <>
               {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  className='w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full text-white flex items-center justify-center hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg'
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <User size={18} className="lg:w-5 lg:h-5" />
                </button>

                {/* Profile dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white text-black p-5 rounded-xl shadow-2xl z-50 border">
                    <h2 className="text-lg font-bold mb-3 text-gray-800">Welcome Back!</h2>
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-lg text-gray-800">{userinfo.name}</p>
                      <p className="text-sm text-gray-600">{userinfo.email}</p>
                      <p className="text-sm text-orange-600 mt-1 capitalize">Role: {userinfo.role}</p>
                    </div>
                    <button
                      onClick={logoutFunction}
                      className="w-full py-3 text-red-600 font-semibold hover:bg-red-50 hover:text-red-700 rounded-lg transition-all border border-red-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    {/* Desktop Category Bar */}
<div className="w-full bg-gray-800 border-t border-gray-700">
  <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
    <div className="flex items-center justify-between py-2">
      {/* Category Scroll - Hidden on small screens */}
    
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

   {/* LEFT SIDE: Home & Cart (visible only on small screens) */}
   <div className="flex xl:hidden items-center space-x-2 sm:space-x-3">
      {/* Home Icon */}
      <button
        onClick={() => navigate("/")}
        className="p-2 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 transition"
        title="Home"
      >
        <Home size={20} className="text-white" />
      </button>

      {/* Product Icon */}
      <button
        onClick={() => navigate("/home")}
        className="p-2 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 transition"
        title="Products"
      >
        <PackageSearch size={20} className="text-white" />
      </button>

      {/* Cart Icon */}
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

      {/* Right side - Filter + More buttons */}
      <div className="flex space-x-2 ml-4 relative items-center">
      {/* Filter Button */}
<button
  onClick={() =>{ setShowFilterModal(true)

     console.log('Filter modal opened');}
  }
  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
>
  
  <Filter size={20} className="text-green-400" />
  <span className="hidden lg:inline text-sm">Filter</span>
</button>
{showFilterModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-2 sm:px-4">
    <div className="bg-white rounded-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">

      {/* Header */}
      <div className="bg-black text-white p-4 rounded-t-xl flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filter Products</h3>
        <button onClick={() => setShowFilterModal(false)} className="hover:text-gray-200">
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
            className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
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

        {/* Discount */}
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
          className="flex-1 py-2 bg-gray-900 text-white rounded-lg hover:bg-green-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
)}

        {/* More Button */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() =>
              {
    if (isLogin) {
      setShowMenu((prev) => !prev)
    } else {
      toast.error("Please login first");
    }
  }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 right-0"
          >
            <Menu size={20} />
            <span className="hidden lg:inline text-sm">More</span>
          </button>
          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-80 lg:w-96 bg-white text-black p-6 rounded-xl shadow-2xl z-50 space-y-4 border">
              {isLogin && (
                <div>
             {userinfo?.role === "Admin" ? (
  <>
    <Link to="/Admin">
      <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium relative z-[9999] mb-2">
        Admin Panel
      </button>
    </Link>

    <Link to="/userpanel">
      <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium relative z-[9999]">
        User Panel
      </button>
    </Link>
  </>
) : (
  <Link to="/userpanel">
    <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium relative z-[9999]">
      User Panel
    </button>
  </Link>
)}

                </div>
              )}

              <button
                onClick={() => toast.success("Settings coming soon")}
                className="w-full text-left text-gray-700 hover:bg-gray-100 p-3 rounded-lg border-t transition-colors flex items-center space-x-2"
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Navbar;