//modules
import React from "react";
import { Link } from "react-router-dom";

//component
const TokenAlert = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <p className="text-center">Please Sign up/ login first to access all the features</p>
      <div className="flex mt-5">
        <Link to="/register">
          <button className="font-medium border-2 border-black rounded-xl bg-green-600 px-5 py-2 text-nowrap text-white text-center hover:bg-green-400">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="font-medium border-2 border-black rounded-xl bg-blue-600 px-5 py-2 ml-5 text-nowrap text-white text-center hover:bg-blue-400">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TokenAlert;
