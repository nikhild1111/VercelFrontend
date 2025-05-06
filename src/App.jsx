import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cartitem from "./Components/Cartitem";
import Product from "./Components/Product";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useState ,useEffect} from "react";
import Admin from "./Pages/Admin";

const App = () => {

  const[isLogin,setIsLoggedIn]=useState(false);

  return (<div>

     
        <div className="bg-slate-900">
        <Navbar isLogin={isLogin} setIsLoggedIn={setIsLoggedIn}></Navbar>
        </div>
        <Routes>
          <Route path="/" element={ <Home isLogin={isLogin} setIsLoggedIn={setIsLoggedIn}></Home>}></Route>
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn}></Login>}></Route>
          <Route path="/Admin" element={<Admin setIsLoggedIn={setIsLoggedIn}></Admin>}></Route>
          <Route path="/Signup" element={<Signup setIsLoggedIn={setIsLoggedIn}></Signup>}></Route>
          <Route path="/Home" element={<Home isLogin={isLogin} setIsLoggedIn={setIsLoggedIn}></Home>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
        </Routes>

  </div>)
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