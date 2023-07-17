import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector(state => state.user.user)

  const logout = () => {
    localStorage.removeItem("jwt-token");
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      "_self"
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-item-center navbar-dark bg-dark p-1">
        <Link to="/" className="mx-3 navbar-brand">Home</Link>
        <div className="d-flex">
          {!user?.user ? (
            <div>
              <Link to="/login" className="btn btn-primary mx-3">Login</Link>
              <Link to="/signup" className="btn btn-primary">Signup</Link>
            </div>
          ) : (
            <div>
              <button onClick={logout} className="btn btn-primary">Logout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
