import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { reload, showAlert, hideAlert } from "../reduxState/features/user/user"

function Signup(props) {
  const dispatch  = useDispatch();
  const [client, setClient] = useState({name:"",email:"",password:""});
  const navigate = useNavigate();

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`,"_self")
    }

    const handleInput = (e) => {
      setClient({...client, [e.target.name]:e.target.value});
    }

    const handleSignup  = async () => {
      try {
      const response = await fetch("http://localhost:8000/auth/user/createuser", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(client), // body data type must match "Content-Type" header
  });
  const data = await response.json();
  if(!data.error){
    dispatch(showAlert(`${data.message},success`));
    localStorage.setItem("jwt-token", data.jwtoken)
    dispatch(reload());
    navigate("/")
    setTimeout(()=>{
      dispatch(hideAlert());
    },2000);
  } else {
    console.log(data)
    dispatch(showAlert(`${data.message?data.message:"Use Valid Values"},success`));
    setTimeout(()=>{
      dispatch(hideAlert());
    },2000);
  }
} catch (err) {
  console.log("error --<>", err)
}

    }

    return (
        <>
            <div className='container my-2'>
                <div className='container'>
                    <form className='container'>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input onChange={(event)=>handleInput(event)} name="name" type="text" id="name" className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">Email address</label>
                            <input onChange={(event)=>handleInput(event)} name="email" type="email" id="email" className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input onChange={(event)=>handleInput(event)} name="password" type="password" id="password" className="form-control" />
                        </div>

                        <div className="row mb-4">
                            <div className="col d-flex justify-content-center"></div>
                        </div>


                        <button onClick={handleSignup} type="button" className="btn btn-primary btn-block mb-4">SignUp</button>


                        <div className="text-center">
                            <p>Already have a Account? <Link to="/login">Login</Link></p>
                            <p>or Login with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </button>

                            <button onClick={googleAuth} type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
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
        </>
    )
}

export default Signup
