


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Loginform = (props) => {
    const navigate=useNavigate("");
    let setIsLoggedIn=props.setIsLoggedIn;
const [formData,setformData]=useState({
    email:"",password:""
})

const [showpassword,setpassword]=useState(false);
function changeHandler(e){
    setformData((prev)=>({
       
     ...prev,[e.target.name]:e.target.value
    }));
    // console.log(formData);
}

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|int)$/i;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
    return regex.test(password);
  };

//   const isValidPhoneNumber = (phone) => {
//     const regex = /^\d{10}$/;
//     return regex.test(phone);
//   };

  async function SubmtHandler(e) {
    e.preventDefault();
    const { email, password } = formData;

    if (!isValidEmail(email)) {
      toast.error('Invalid email format');
      return;
    }

    if (!isValidPassword(password)) {
      toast.error('Password must be at least 8 characters long and include upper & lower case letters, a number, and a special character.');
      return;
    }


try{

  const response=await axios.post("http://localhost:4000/api/v1/login",{
    email,password
  });

if(response.data.success){
  // this means the user login is done
  setIsLoggedIn(true);
  toast.success(response.data.message);
  navigate("/Home")
}else{
  toast.error(response.data.message);
}


}catch(err){
  toast.error(err.response?.data?.message || "Something went wrong");
}

    }
  return (
    <div className='bg-green-500 min-h-screen flex items-center justify-center '>
    <div className='h-[290px]  bg-black flex flex-col px-[30px] py-[20px] gap-4 rounded-xl'>
        <div className='text-white font-bold text-lg pr-[30px]'>Wellcome To Your Home <sup onClick={()=>{navigate("/")}} className='relative right-[-30px] cursor-pointer'>X</sup></div>
    <form onSubmit={SubmtHandler} className='flex flex-col gap-5'>
        <label className='w-full'>
            <p className='text-white text-sm mb-1'>
              Email  <sup className='text-red-600'>*</sup>
            </p>
            <input type="email" name='email' placeholder='Enter Email' className='text-xs p-2 w-full rounded' required value={formData.email} onChange={changeHandler}  />
        </label>
        <label className='w-full'>
            <p className='text-white text-sm mb-1'>
            Password  <sup className='text-red-600'>*</sup>
            </p>
            <input type="password" name='password' placeholder='Enter Password' className='text-xs p-2 w-full rounded' required value={formData.password} onChange={changeHandler}  />
        </label>
        <button className='w-full bg-green-500 rounded font-bold text-lg py-1 text-white mt-2'>Login</button>
</form>

    </div>
    </div>
  )
}

export default Loginform
