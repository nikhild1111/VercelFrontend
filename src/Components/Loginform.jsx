


// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { overwriteCartToBackend} from '../redux/thunks/overwriteCartToBackend';

// import { useDispatch } from "react-redux";
// import { loginSuccess } from '../redux/Slices/userSlice.js';  // ✅ correct


// const Loginform = (props) => {

//   const dispatch = useDispatch();
//     const navigate=useNavigate("");
//     let setIsLoggedIn=props.setIsLoggedIn;
// const [formData,setformData]=useState({
//     email:"",password:""
// })

// const [showpassword,setpassword]=useState(false);
// function changeHandler(e){
//     setformData((prev)=>({
       
//      ...prev,[e.target.name]:e.target.value
//     }));
//     // console.log(formData);
// }

// const isValidEmail = (email) => {
//     const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|int)$/i;
//     return regex.test(email);
//   };

//   const isValidPassword = (password) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
//     return regex.test(password);
//   };

// //   const isValidPhoneNumber = (phone) => {
// //     const regex = /^\d{10}$/;
// //     return regex.test(phone);
// //   };

//   async function SubmtHandler(e) {
//     e.preventDefault();
//     const { email, password } = formData;

//     if (!isValidEmail(email)) {
//       toast.error('Invalid email format');
//       return;
//     }

//     if (!isValidPassword(password)) {
//       toast.error('Password must be at least 8 characters long and include upper & lower case letters, a number, and a special character.');
//       return;
//     }


// try{

//   const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`, {
//     email,password
//   },
//  {
//   withCredentials: true // ✅ THIS IS ESSENTIAL
// }
// );

// if (response.data.success) {
//   localStorage.setItem("token", response.data.token);
//   const user = response.data.payload;
// console.log(user);


//   try {
//     // 1️⃣ First, merge guest cart with backend cart
//     await dispatch(overwriteCartToBackend());

//     // 2️⃣ Set user in Redux (now login state is true)
//     dispatch(loginSuccess(user));

//     // 3️⃣ Now that cart is merged, show success
//     toast.success(response.data.message);
//     navigate("/");
//   } catch (error) {
//     toast.error("Login succeeded but cart sync failed.");
//   }
// } else {
//   toast.error(response.data.message);
// }


// }catch(err){
//   toast.error(err.response?.data?.message || "Something went wrong");
// }

//     }
//   return (
//     <div className='bg-green-500 min-h-screen flex items-center justify-center '>
//     <div className='h-[290px]  bg-black flex flex-col px-[30px] py-[20px] gap-4 rounded-xl'>
//         <div className='text-white font-bold text-lg pr-[30px]'>Wellcome To Your Home <sup onClick={()=>{navigate("/")}} className='relative right-[-30px] cursor-pointer'>X</sup></div>
//     <form onSubmit={SubmtHandler} className='flex flex-col gap-5'>
//         <label className='w-full'>
//             <p className='text-white text-sm mb-1'>
//               Email  <sup className='text-red-600'>*</sup>
//             </p>
//             <input type="email" name='email' placeholder='Enter Email' className='text-xs p-2 w-full rounded' required value={formData.email} onChange={changeHandler}  />
//         </label>
//         <label className='w-full'>
//             <p className='text-white text-sm mb-1'>
//             Password  <sup className='text-red-600'>*</sup>
//             </p>
//             <input type="password" name='password' placeholder='Enter Password' className='text-xs p-2 w-full rounded' required value={formData.password} onChange={changeHandler}  />
//         </label>
//         <button className='w-full bg-green-500 rounded font-bold text-lg py-1 text-white mt-2'>Login</button>
// </form>

//     </div>
//     </div>
//   )
// }

// export default Loginform










// // ✅ FRONTEND: Updated Loginform.jsx with "Forgot Password"

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../redux/Slices/userSlice.js';
// import { overwriteCartToBackend } from '../redux/thunks/overwriteCartToBackend';

// const Loginform = ({ setIsLoggedIn }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const isValidEmail = (email) => /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|int)$/i.test(email);
//   const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/.test(password);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     if (!isValidEmail(email)) return toast.error('Invalid email format');
//     if (!isValidPassword(password)) return toast.error('Password must be strong');

//     try {
//       const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`, { email, password }, { withCredentials: true });
//       const user = res.data.payload;
//       localStorage.setItem('token', res.data.token);

//       await dispatch(overwriteCartToBackend());
//       dispatch(loginSuccess(user));
//       toast.success(res.data.message);
//       navigate('/');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Login failed');
//     }
//   };

//   const handleForgotPassword = async () => {
//     const email = prompt('Enter your email to reset password');
//     if (!isValidEmail(email)) return toast.error('Enter a valid email');

//     try {
//       const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/forgot-password`, { email });
//       toast.success(res.data.message);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>
//           <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-gray-600">X</button>
//         </div>
//         <form onSubmit={submitHandler} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600">Email</label>
//             <input type="email" name="email" value={formData.email} onChange={changeHandler} required className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">Password</label>
//             <input type="password" name="password" value={formData.password} onChange={changeHandler} required className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
//           </div>
//           <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">Login</button>
//           <p className="text-sm text-center text-blue-500 hover:underline cursor-pointer" onClick={handleForgotPassword}>Forgot Password?</p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Loginform;









// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { overwriteCartToBackend} from '../redux/thunks/overwriteCartToBackend';
// import { useDispatch } from "react-redux";
// import { loginSuccess } from '../redux/Slices/userSlice.js';

// const Loginform = (props) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate("");
//   let setIsLoggedIn = props.setIsLoggedIn;
  
//   const [formData, setformData] = useState({
//     email: "", 
//     password: ""
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [resetLoading, setResetLoading] = useState(false);

//   function changeHandler(e) {
//     setformData((prev) => ({
//       ...prev, 
//       [e.target.name]: e.target.value
//     }));
//   }

//   const isValidEmail = (email) => {
//     const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|int)$/i;
//     return regex.test(email);
//   };

//   const isValidPassword = (password) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
//     return regex.test(password);
//   };

//   async function submitHandler(e) {
//     e.preventDefault();
//     setIsLoading(true);
    
//     const { email, password } = formData;

//     if (!isValidEmail(email)) {
//       toast.error('Invalid email format');
//       setIsLoading(false);
//       return;
//     }

//     if (!isValidPassword(password)) {
//       toast.error('Password must be at least 8 characters long and include upper & lower case letters, a number, and a special character.');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`, {
//         email, password
//       }, {
//         withCredentials: true
//       });

//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         const user = response.data.payload;

//         try {
//           await dispatch(overwriteCartToBackend());
//           dispatch(loginSuccess(user));
//           toast.success(response.data.message);
//           navigate("/");
//         } catch (error) {
//           toast.error("Login succeeded but cart sync failed.");
//         }
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function handleForgotPassword(e) {
//     e.preventDefault();
//     setResetLoading(true);
    
//     if (!isValidEmail(forgotEmail)) {
//       toast.error('Please enter a valid email address');
//       setResetLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/forgot-password`, {
//         email: forgotEmail
//       });

//       if (response.data.success) {
//         toast.success('Password reset link sent to your email!');
//         setShowForgotPassword(false);
//         setForgotEmail("");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send reset email");
//     } finally {
//       setResetLoading(false);
//     }
//   }

//   if (showForgotPassword) {
//     return (
//       <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4'>
//         <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden'>
//           {/* Header */}
//           <div className='bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6 relative'>
//             <button 
//               onClick={() => setShowForgotPassword(false)}
//               className='absolute top-4 right-4 text-white hover:text-orange-300 transition-colors text-xl font-bold'
//             >
//               ×
//             </button>
//             <div className='flex items-center gap-3'>
//               <div className='w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center'>
//                 <span className='text-white font-bold text-lg'>E</span>
//               </div>
//               <div>
//                 <h2 className='text-white text-xl font-bold'>Reset Password</h2>
//                 <p className='text-slate-300 text-sm'>Enter your email to receive reset link</p>
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <div className='p-8'>
//             <form onSubmit={handleForgotPassword} className='space-y-6'>
//               <div>
//                 <label className='block text-slate-700 text-sm font-medium mb-2'>
//                   Email Address <span className='text-red-500'>*</span>
//                 </label>
//                 <input 
//                   type="email" 
//                   placeholder='Enter your email address'
//                   className='w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors bg-slate-50'
//                   required 
//                   value={forgotEmail} 
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                 />
//               </div>
              
//               <button 
//                 type="submit"
//                 disabled={resetLoading}
//                 className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
//               >
//                 {resetLoading ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Sending...
//                   </div>
//                 ) : (
//                   'Send Reset Link'
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4'>
//       <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden'>
//         {/* Header */}
//         <div className='bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6 relative'>
//           <button 
//             onClick={() => navigate("/")}
//             className='absolute top-4 right-4 text-white hover:text-orange-300 transition-colors text-xl font-bold'
//           >
//             ×
//           </button>
//           <div className='flex items-center gap-3'>
//             <div className='w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center'>
//               <span className='text-white font-bold text-xl'>E</span>
//             </div>
//             <div>
//               <h2 className='text-white text-2xl font-bold'>Welcome Back!</h2>
//               <p className='text-slate-300 text-sm'>Sign in to your ECOMZY account</p>
//             </div>
//           </div>
//         </div>

//         {/* Form */}
//         <div className='p-8'>
//           <form onSubmit={submitHandler} className='space-y-6'>
//             <div>
//               <label className='block text-slate-700 text-sm font-medium mb-2'>
//                 Email Address <span className='text-red-500'>*</span>
//               </label>
//               <input 
//                 type="email" 
//                 name='email' 
//                 placeholder='Enter your email address'
//                 className='w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors bg-slate-50'
//                 required 
//                 value={formData.email} 
//                 onChange={changeHandler}
//               />
//             </div>
            
//             <div>
//               <label className='block text-slate-700 text-sm font-medium mb-2'>
//                 Password <span className='text-red-500'>*</span>
//               </label>
//               <div className='relative'>
//                 <input 
//                   type={showPassword ? "text" : "password"} 
//                   name='password' 
//                   placeholder='Enter your password'
//                   className='w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors bg-slate-50 pr-12'
//                   required 
//                   value={formData.password} 
//                   onChange={changeHandler}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors'
//                 >
//                   {showPassword ? (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className='flex items-center justify-between'>
//               <div className='flex items-center'>
//                 <input 
//                   id="remember-me" 
//                   type="checkbox" 
//                   className='h-4 w-4 text-orange-500 focus:ring-orange-400 border-slate-300 rounded'
//                 />
//                 <label htmlFor="remember-me" className='ml-2 block text-sm text-slate-600'>
//                   Remember me
//                 </label>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowForgotPassword(true)}
//                 className='text-sm text-orange-600 hover:text-orange-800 font-medium transition-colors'
//               >
//                 Forgot Password?
//               </button>
//             </div>
            
//             <button 
//               type="submit"
//               disabled={isLoading}
//               className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Signing In...
//                 </div>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </form>

//           <div className='mt-6 text-center'>
//             <p className='text-slate-600 text-sm'>
//               Don't have an account? 
//               <button 
//                 onClick={() => navigate("/signup")}
//                 className='text-orange-600 hover:text-orange-800 font-medium ml-1 transition-colors'
//               >
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Loginform;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/Slices/userSlice';
import { overwriteCartToBackend } from '../redux/thunks/overwriteCartToBackend';

const Loginform = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const changeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const isValidEmail = (email) => /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|int)$/i.test(email);
  const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/.test(password);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!isValidEmail(email)) return toast.error('Invalid email format');
    if (!isValidPassword(password)) return toast.error('Password must be strong');

    try {
  const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`, {
    email,password
  },
 {
  withCredentials: true // ✅ THIS IS ESSENTIAL
}
);
      const user = res.data.payload;
      localStorage.setItem('token', res.data.token);

      await dispatch(overwriteCartToBackend());
      dispatch(loginSuccess(user));
      toast.success(res.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-700 text-sm">X</button>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={changeHandler} required className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" placeholder="Enter your email" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></label>
            <input type="password" name="password" value={formData.password} onChange={changeHandler} required className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" placeholder="Enter your password" />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <label><input type="checkbox" className="mr-1" /> Remember me</label>
            <span onClick={handleForgotPassword} className="text-orange-500 hover:underline cursor-pointer">Forgot Password?</span>
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition-all">Sign In</button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Don’t have an account? <span onClick={() => navigate('/signup')} className="text-orange-500 cursor-pointer hover:underline">Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
