import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { reload,showAlert, hideAlert } from "../reduxState/features/user/user"

const Login = (props) => {
  const dispatch  = useDispatch();
  const [client,setClient] = useState({email:"",password:""});
  const navigate = useNavigate();

const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`,"_self")
}
const handleLogin  = async () => {
  try {
  const response = await fetch("http://localhost:8000/auth/user/login", {
method: "POST", // *GET, POST, PUT, DELETE, etc.
headers: {
  "Content-Type": "application/json",
  // 'Content-Type': 'application/x-www-form-urlencoded',
},
body: JSON.stringify(client), // body data type must match "Content-Type" header
});
const data = await response.json();
if(!data.error){
  localStorage.setItem("jwt-token", data.jwtoken);
  navigate("/")
  dispatch(reload())
  dispatch(showAlert(`${data.message},success`));
  setTimeout(()=>{
    dispatch(hideAlert());
  },2000);
} else {
  dispatch(showAlert(`${data.message},danger`));
    setTimeout(()=>{
      dispatch(hideAlert());
    },2000);
}

} catch (err) {
console.log("error --<>", err)
}

}

const handleInput = (e) => {
  setClient({...client, [e.target.name]:e.target.value});
}
    return (
        <div className='container my-2'>
            <div className='container'>
                <form className='container'>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input onChange={(event)=>handleInput(event)} type="email" name="email" id="email" className="form-control" />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input onChange={(event)=>handleInput(event)} type="password" id="password" name="password" className="form-control" />
                    </div>

                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                            </div>
                        </div>

                        <div className="col">

                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>


                    <button onClick={handleLogin} type="button" className="btn btn-primary btn-block mb-4">Sign in</button>


                    <div className="text-center">
                        <p>Not a member? <Link to="/signup">Register</Link></p>
                        <p>or Login with:</p>
                        <button onClick={googleAuth} type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google"></i>
                        </button>

                        <button  type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-github"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
