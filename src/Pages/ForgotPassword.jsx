import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const sendOtp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/forgot-password`, { email });
      toast.success('OTP sent to your email');
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    }
  };

  const verifyAndReset = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/verify-otp`, { email, otp, newPassword });
      toast.success('Password reset successful');
      window.location.href = '/login';
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 min-h-[70vh]">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Forgot Password</h2>

        {step === 1 && (
          <>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-2 border rounded mb-4" />
            <button onClick={sendOtp} className="w-full bg-black text-white py-2 rounded">Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="w-full p-2 border rounded mb-3" />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="w-full p-2 border rounded mb-4" />
            <button onClick={verifyAndReset} className="w-full bg-black text-white py-2 rounded">Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
