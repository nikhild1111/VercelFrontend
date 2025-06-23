import React from 'react'
import SignupForm from '../Components/SignupForm'

const Signup = (props) => {
    let setIsLoggedIn=props.setIsLoggedIn;
  return (
    <div className='border-gray-900'>
      <SignupForm setIsLoggedIn={setIsLoggedIn} ></SignupForm>
    </div>
  )
}

export default Signup
