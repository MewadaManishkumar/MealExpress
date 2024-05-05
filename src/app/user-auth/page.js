"use client";
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignUp from "../_components/UserSignUp";

const UserAuth = (props) => {
  const [login, setLogin] = useState(true);
  console.log("order flag", props);
  return (
    <div>
      <CustomerHeader />
      <div className="container">
        <h1>{login ? "User Login" : "User Signup"}</h1>

        <UserSignUp />

        <button className="button-link" onClick={() => setLogin(!login)}>
          {login
            ? "Do not have account? Signup"
            : "Already have account ? login"}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default UserAuth;
