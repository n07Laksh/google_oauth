import React, { useState, useRef } from "react";
import {useSelector, useDispatch} from "react-redux"
import { updateUser, showAlert, hideAlert } from "../reduxState/features/user/user";

function UpdatePassword(){
const userCopy = useSelector(state=> state.user.user);
const dispatch = useDispatch();
const [password, setPassword] = useState({password:"", confirmPassword:""});
const passwordErrorText = useRef(null);

const handleChange = (e) => {
  setPassword({...password, [e.target.name]:e.target.value})
}
const handleFocus = (e) => {
  e.target.type = "text";
}
const handleBlur = (e) => {
  e.target.type = "password";
}
const handleSubmit = async(e) => {
  e.preventDefault()
  try{
    if (password.password.length <= 0 || password.confirmPassword.length <= 0) {
  passwordErrorText.current.innerText = "Password cannot be empty";
  passwordErrorText.current.style.display = "block";
} else {
  if (password.password === password.confirmPassword) {
    // handle the update with api
    const res = await fetch("http://localhost:8000/auth/user/updatepassword",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "jwt-token": localStorage.getItem("jwt-token")
      },
      body: JSON.stringify({ password: password.password })
    });
    const data = await res.json();
    if(!data.error){
      const {googleId, ...user} = userCopy.user;
      const updateUserCopy = {
        ...userCopy,
        user: user
      }
      dispatch(updateUser(updateUserCopy));
      dispatch(showAlert(`${data.message},success`));
      setTimeout(()=>{
        dispatch(hideAlert());
      },2000);
    }
  } else {
    passwordErrorText.current.innerText = "Passwords do not match";
    passwordErrorText.current.style.display = "block";
  }
}

setTimeout(() => {
      if (passwordErrorText.current) {
        passwordErrorText.current.style.display = "none";
      }
    }, 2000);

  } catch(err) {
    console.log("submit Error" , err)
  }
}

  return (
    <>
    <div className='container d-flex justify-content-center align-item-center mt-5 flex-column w-50' >
      <h3 className="text-align-center ms-5"> Set Local Password </h3>
      <div className='mt-2 '>
      <form onSubmit={handleSubmit} className=' d-flex justify-content-center align-item-center flex-column align-content-between'>
      <input type="password" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder='Password' name='password'/>
      <input className='mt-2' type="password" onChange={handleChange} placeholder='Confirm Password' name="confirmPassword" />
      <div ref={passwordErrorText} className="text-danger mt-2 errorTxt"></div>
      <input className=' mt-2' type="submit" value='Submit' />
      </form>
      </div>
      </div>
    </>
  )
};

export default UpdatePassword;
