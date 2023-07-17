import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import Navbar from "./component/Navbar";
import Alert from "./component/Alert"
import UpdatePassword from "./component/UpdatePassword";
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { updateUser, showAlert, hideAlert } from "./reduxState/features/user/user";


function App() {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user);
  const reload = useSelector(state=>state.user.reload);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const config = {
        headers:{
          "Content-Type":"application/json",
          "jwt-token": localStorage.getItem("jwt-token"),
        },
         withCredentials: true,
      };

      const { data } = await axios.get(url, config);
      if(!data.error){
        dispatch(updateUser(data))
        // dispatch(showAlert(`${data.message},success`));
        // setTimeout(()=>{
        //   dispatch(hideAlert());
        // },2000);
        if(data.jwtoken){
          localStorage.setItem("jwt-token", data.jwtoken)
        }
      }

    } catch (error) {
      console.warn("error", error);
    }
  }

  useEffect(() => { getUser() }, [reload]);
console.log("/login/success", user)

  return (
    <div className="">
    <Navbar />
    <div style={{ height: "50px",width: "100%"}}>
    <Alert />
    </div>
    <Routes>
  <>
    <Route
      path="/login"
      element={user ? <Navigate to="/" /> : <Login />}
    />
    <Route
      path="/signup"
      element={user ? <Navigate to="/" /> : <Signup />}
    />
    <Route
      path="/"
      element={user ? user.user?.googleId?<UpdatePassword />:<Home /> : <Navigate to="/login" />}
    />
  </>
</Routes>

    </div>
  );
}

export default App;
