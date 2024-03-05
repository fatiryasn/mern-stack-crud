//modules
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Helmet } from "react-helmet";

//local file
import BackButton from "../components/BackButton";
import ErrorPopup from "../components/ErrorPopup";
import Footer from "../components/Footer";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";

const Login = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [inputRole, setInputRole] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //events handler
  const handleUserLogin = () => {
    const newUser = {
      useremail,
      userpassword,
    };

    //api call (user login&token)
    setLoading(true);
    axios
      .post("http://localhost:8080/api/user/login", newUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        enqueueSnackbar(`Logged in! Welcome`, { variant: "success" });
        navigate("/contact");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(error);
        setErrorDisplay(true);
        setLoading(false);
      });
  };

  const handleInputRole = () => {
    if (!showPassword) {
      setInputRole("text");
      setShowPassword(true);
    } else {
      setInputRole("password");
      setShowPassword(false);
    }
  };

  //display!
  return (
    <>
      <Helmet>
        <title>Login page - contactsaver</title>
      </Helmet>
      <div className="flex mt-10 justify-center items-center flex-col pt-20">
        {errorDisplay && (
          <ErrorPopup message={error} onClose={() => setErrorDisplay(false)} />
        )}
        <h1 className="font-bold text-wrap text-center text-3xl mt-5">
          <span className="text-green-600">Login</span>
        </h1>
        <div className=" min-w-96 flex flex-col items-center justify-center pl-10 pr-12 pb-16 pt-8 mt-10 border rounded-xl shadow-2xl bg-white">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="flex">
                <div className="self-start">
                  <BackButton destination="/" />
                </div>

                <div className="flex items-center flex-col mt-8">
                  <h2 className="font-semibold text-xl">Login</h2>
                  <div className="flex flex-col mt-14 mr-8">
                    <label htmlFor="email" className="mt-4 font-quicksand">
                      Email
                    </label>
                    <input
                      className="outline-none border-b border-black p-2 font-mooli mt-2"
                      placeholder="Email"
                      type="email"
                      value={useremail}
                      onChange={(e) => setUseremail(e.target.value)}
                      required
                    ></input>
                    <label htmlFor="password" className="mt-4 font-quicksand">
                      Password
                    </label>
                    <input
                      className="outline-none border-b font-mooli border-black p-2 mt-2"
                      placeholder="Password"
                      type={inputRole}
                      value={userpassword}
                      onChange={(e) => setUserpassword(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="self-end  w-3">
                  <button onClick={handleInputRole}>
                    <FontAwesomeIcon
                      icon={showPassword === true ? faEye : faEyeSlash}
                    ></FontAwesomeIcon>
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center mt-10">
                <p className="font-quicksand text-sm self-end">
                  Dont have account?{" "}
                  <Link to="/register" className="text-cyan-500">
                    Click here
                  </Link>
                </p>
                <button
                  onClick={handleUserLogin}
                  className="border self-end font-semibold border-black rounded-xl bg-green-600 px-3 pb-2 pt-1 ml-7 text-white text-center hover:bg-green-400"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
