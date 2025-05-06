import React from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios"; // Make sure axios is installed


// imp error i just give a async fun in the SignupForm=async and its gives an error so keep this in mind
const SignupForm = (props) => {

  // const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState("");

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   setPreview(URL.createObjectURL(file));
  // };


    const navigate=useNavigate("");
    let setIsLoggedIn=props.setIsLoggedIn;
const [formData,setformData]=useState({
    email:"",password:"",name:"",phone:"",confirmpassword:""
})

const [showpassword,setpassword]=useState(false);
function changeHandler(e){
    setformData((prev)=>({
       
     ...prev,[e.target.name]:e.target.value
    }));
    console.log(formData);
}

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|int)$/i;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const isValidPhoneNumber = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

 async  function SubmtHandler(e) {
    e.preventDefault();
    const {name, email, password, confirmpassword, phone } = formData;

    if (!isValidEmail(email)) {
      toast.error('Invalid email format');
      return;
    }

    if (!isValidPassword(password)) {
      toast.error('Password must be at least 8 characters long and include upper & lower case letters, a number, and a special character.');
      return;
    }
    if (password !== confirmpassword) {
        toast.error("Confirm Passwords do not match");
        return 
      }

      if (!isValidPhoneNumber(phone)) {
        toast.error("Phone number must be exactly 10 digits");
        return ;
      }
  

      // use the axios for the request it will give the data directly and we can acess it
      try {
        const response = await axios.post("http://localhost:4000/api/v1/signup", {
          name,
          email,
          password,
          phone,
          // role: "user", // optional field, or set default in schema
        });
    
        // if the respose send the successs it will be true and we get true
        if (response.data.success) {
          toast.success(response.data.message);//this will print the message of that
          setIsLoggedIn(true);
          navigate("/Home"); // go to hoame page
        } else {
          toast.error(response.data.message || "Signup failed");
        }
      } catch (err) {//iff the somthing wrong hapend
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  return (
    <div className='bg-green-500 min-h-screen flex items-center justify-center '>
    <div className='bg-black flex flex-col md:px-[30px] px-[25px] py-[20px] gap-4 rounded-xl h-full'>
      <div className='flex justify-between'> <div className='text-white font-bold text-lg pr-[30px] w-full'>Your Journey Starts Here</div>     <div onClick={()=>{navigate("/")}} className='cursor-pointer text-white font-bold'>X</div>    </div> 
    <form onSubmit={SubmtHandler} className='flex flex-col gap-5'>
    <div className='flex gap-5'>
        <label className='w-full'>
            <p className='text-white text-sm mb-1'>
            Name  <sup className='text-red-600'>*</sup>
            </p>
            <input type="name" name='name' placeholder='Enter Name' className='text-xs p-2 w-full rounded' required value={formData.name} onChange={changeHandler}  />
        </label>
        <label className='w-full'>
            <p className='text-white text-sm mb-1'>
           Phone  <sup className='text-red-600'>*</sup>
            </p>
            <input type="number" name='phone' placeholder='Enter Number' className='text-xs p-2 w-full rounded' required value={formData.phone} onChange={changeHandler}  />
        </label>
        </div>
        <label className='w-full'>
            <p className='text-white text-sm mb-1'>
              Email  <sup className='text-red-600'>*</sup>
            </p>
            <input type="email" name='email' placeholder='Enter Email' className='text-xs p-2 w-full rounded' required value={formData.email} onChange={changeHandler}  />
        </label>
      <div className='flex gap-5'>
        <label className='w-full'>
            <p className='text-white text-sm mb-1'>
            Password  <sup className='text-red-600'>*</sup>
            </p>
            <input type="password" name='password' placeholder='Enter Password' className='text-xs p-2 w-full rounded' required value={formData.password} onChange={changeHandler}  />
        </label>
        <label className='w-full'>
            <p className='text-white text-sm mb-1'>
           Confirm Password  <sup className='text-red-600'>*</sup>
            </p>
            <input type="password" name='confirmpassword' placeholder='Confirm Password' className='text-xs p-2 w-full rounded' required value={formData.confirmpassword} onChange={changeHandler}  />
        </label>
        </div>
        <button className='w-full bg-yellow-500 rounded text-lg py-1 text-black mt-2'>Sign up</button>
        <div className='flex items-center justify-center gap-2'>
            <div className='text-white w-full h-[1px] bg-white'></div>
            <p className='text-white'>OR</p>
            <div className='text-white w-full h-[1px] bg-white'></div>
        </div>

        {/* this is for image priew */}
        {/* <label className="block text-white font-semibold">Choose Profile Image:</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="mt-2"
      />
{preview && (
  <img src={preview} />
)} */}

        <div>
            {/* this for continue with google */}
        </div>
</form>


    </div>
    </div>
  )
}

export default SignupForm
