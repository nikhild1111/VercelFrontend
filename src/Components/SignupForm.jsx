import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import { overwriteCartToBackend } from '../redux/thunks/overwriteCartToBackend';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/Slices/userSlice.js';

const SignupForm = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmpassword: ""
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isValidEmail = (email) => /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|int)$/i.test(email);
  const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/.test(password);
  const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);

  async function SubmtHandler(e) {
    e.preventDefault();
    const { name, email, password, confirmpassword, phone } = formData;

   if (!isValidEmail(email)) {
  return toast.error("Please enter a valid email address");
}

if (!isValidPassword(password)) {
  return toast.error(
    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
  );
}

if (password !== confirmpassword) {
  return toast.error("Passwords do not match");
}

if (!isValidPhoneNumber(phone)) {
  return toast.error("Phone number must be exactly 10 digits");
}


    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/signup`, {
        name, email, password, phone
      }, { withCredentials: true });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        const user = response.data.payload;
        await dispatch(overwriteCartToBackend());
        dispatch(loginSuccess(user));
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-300 rounded-2xl shadow-xl p-8 w-full max-w-md min-h-[80%] flex flex-col justify-center">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <button onClick={() => navigate('/')} className="text-lg text-gray-400 hover:text-gray-700">×</button>
        </div>
        <form onSubmit={SubmtHandler} className="space-y-5">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Name <sup className="text-red-600">*</sup>
              </label>
              <input type="text" name="name" value={formData.name} onChange={changeHandler} required className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter name" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Phone <sup className="text-red-600">*</sup>
              </label>
              <input type="number" name="phone" value={formData.phone} onChange={changeHandler} required className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter phone" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <sup className="text-red-600">*</sup>
            </label>
            <input type="email" name="email" value={formData.email} onChange={changeHandler} required className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter email" />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Password <sup className="text-red-600">*</sup>
              </label>
              <input type="password" name="password" value={formData.password} onChange={changeHandler} required className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter password" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password <sup className="text-red-600">*</sup>
              </label>
              <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={changeHandler} required className="w-full mt-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" placeholder="Confirm password" />
            </div>
          </div>
          <button type="submit" className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-md">Sign Up</button>
          <p className="text-sm text-center text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/login')}>
            Already have an account? Login
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
