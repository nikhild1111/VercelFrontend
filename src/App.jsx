// import { Route, Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Cartitem from "./Components/Cartitem";
// import Product from "./Components/Product";
// import Home from "./Pages/Home";
// import Cart from "./Pages/Cart";
// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
// import { useState ,useEffect} from "react";
// import Admin from "./Pages/Admin";
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { useDispatch } from "react-redux";
// import { loginSuccess } from './redux/Slices/userSlice'; 

// const App = () => {

//   const dispatch = useDispatch();
//  useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) return;

//     axios.get("/api/user/isvalid", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
      
//     }, {
//   withCredentials: true // ✅ THIS IS ESSENTIAL
// })
//     .then((response) => {
//       if (response.data.success) {
//         const user = response.data.payload; // contains user info
//         dispatch(loginSuccess(user));
//         toast.success(response.data.message || "Welcome back!");
//       }
//     })
//     .catch((error) => {
//       console.error("Token verification failed:", error);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       toast.error("Session expired. Please login again.");
//     });
//   }, []);

//   return (<div>

//     {/* create one fised button atthe cnter of every page at the left end whcih navgate to the home directly */}

//      {/* for ficed navbar usefull */}
//         {/* <div className="bg-slate-900 fixed top-0 left-0 w-full z-50">
//         <Navbar ></Navbar>
//         </div> */}
//         <div className="bg-slate-900">
//         <Navbar ></Navbar>
//         </div>
//         <Routes>
//           <Route path="/" element={ <Home ></Home>}></Route>
//           <Route path="/Login" element={<Login ></Login>}></Route>
//           <Route path="/Admin" element={<Admin ></Admin>}></Route>
//           <Route path="/Signup" element={<Signup ></Signup>}></Route>
//           <Route path="/Home" element={<Home ></Home>}></Route>
//           <Route path="/cart" element={<Cart></Cart>}></Route>
//         </Routes>

//   </div>)
// };

// export default App;

import { Route, Routes } from "react-router-dom";
import AddressManagement from './Components/AddressManagement';
import  UserPanel from './Components/UserPanel';
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Landingpage from "./Pages/Landingpage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Admin from "./Pages/Admin";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from './redux/Slices/userSlice';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "./Components/Footer"; // adjust path if needed
import ScrollToTopButton from "./Components/ScrollToTopButton"; // adjust path if needed

import { syncCartToBackend } from "./redux/thunks/cartThunks"; // your thunk

const App = () => {

  const dispatch = useDispatch();
 const navigate=useNavigate("");

// it is usefull to redirect tot he same page where we are standing even when the website reloads
const location = useLocation(); // ✅ this is fine
  useEffect(() => {
    localStorage.setItem('lastPath', location.pathname);
  }, [location]);
  useEffect(() => {
      const lastPath = localStorage.getItem("lastPath") || "/";
   navigate(lastPath);
  }, []);



    // ✅ Token validation (already good)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/isvalid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // ✅ correct place
    })
    .then((response) => {
      if (response.data.success) {
        const user = response.data.payload;
        dispatch(loginSuccess(user));
        toast.success(response.data.message || "Welcome back!");
      }
    })
    .catch((error) => {
      console.error("Token verification failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.error("Session expired. Please login again.");
    });
  }, [dispatch]);

    // ✅ Get last path or default to /
  const lastPath = localStorage.getItem("lastPath") || "/";

 return (
  // <div className="min-h-screen flex flex-col bg-slate-900 text-white">

     <div>
    {/* Navbar - always visible (or you can conditionally hide it too) */}
     <div className="bg-slate-900">
        <Navbar />
      </div>

    {/* Page content - grows to push footer down */}
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addresses" element={<AddressManagement />} />
        <Route path="/userpanel" element={<UserPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </main>

    {/* Conditionally show footer */}
    {!["/login", "/signup", "/admin"].includes(location.pathname) && <Footer />}


      {/* Always-visible Scroll Button */}
    <ScrollToTopButton />

  </div>
);
};

export default App;


// first make the setrver 
//login and signup page is thre 
// /when the user did the the signup store the data pop messge you can login
// inth loginuse auth then findone and provide the acess create jwt token
//when you go to the acess so noe using the usesta find the user regaring that id if not there then meke it and provide the cart item of that user baed on id and serch acievrd thid n=by seting the setcart in the slice
// ****or the besed why to take cart is that direct doring the signup provide default empty cart leter on so we have cart of the pertiv=cylr user then access it baed on the so you will get the daat 

// when you reload the srate is not store express it corectly

// otp varifiaction
// premier rout protected verify by the login
// firebase login seeon youtube 
// email seeon youtube
// continue with google seeon yourith

// if not able see toutube 5 hor vedieo of authentication or the video of the 15 -14 13 minuts 17-4-25

// in the admin panel we see no of user login and no of order placed premimum users 
// also give form there to chnge admin and premumum


// https://chatgpt.com/c/68013636-2e88-8000-a28b-3f33561d37a5


// for admin and simple add the data in back end see this 
// its to much simple just crete diffrent model then make routes for it and add the data its easy for acess as well


// one bug i find even thow we are log out the item add is show so when you are login make shure you will add the data based on the user email




// toas error 1] to acess the cookis must give credintial ture in thr crosa and the poet axios requaest
//  when hit a requst form the postman check content-type as application/json
// alway use the cross or the app.use send static file before rout else error will come
//use all the middlee were before the routes








// admon panel me infinaite scroll used 