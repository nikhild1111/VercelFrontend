import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Loginform from "../Components/Loginform";
import React from 'react'





const Login = (props) => {
  let  setIsLoggedIn=props.setIsLoggedIn;
  return (
    <div>
      <Loginform setIsLoggedIn={setIsLoggedIn}></Loginform>
    </div>
  )
}

export default Login
