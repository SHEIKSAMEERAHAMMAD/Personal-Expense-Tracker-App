import React from "react";
import SignUp from "../pages/Users/Register/SignUp";
import SignIn from "../pages/Users/Login/SignIn";
import Home from "./Home/Home"
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Users/Profile/Profile";


const Layout = () => {
  return (
    <div>
      <SignUp />
      <SignIn />
      <Home/>
      <Dashboard />
      <Profile/>
    </div>
  );
};

export default Layout;
