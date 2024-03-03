//modules
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Helmet } from "react-helmet";

//local file
import BackButton from "../components/BackButton";
import ErrorPopup from "../components/ErrorPopup";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")
  const [errorDisplay, setErrorDisplay] = useState(false)
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [inputRole, setInputRole] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //events handler
  const handleUserRegister = () => {
    const newUser = {
      username,
      useremail,
      userpassword,
    };

    //api call (user register)
    setLoading(true);
    axios
      .post("http://localhost:8080/api/user/register", newUser)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Signed up, please relog now", { variant: "info" });
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.msg)
        setErrorDisplay(true)
        console.log(err);
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
      <title>Sign up - contactsaver.com</title>
    </Helmet>
    <div className="flex mt-10 justify-center items-center flex-col pt-20">
      {errorDisplay && <ErrorPopup message={error} onClose={() => setErrorDisplay(false)} />}
      <h1 className="font-bold text-wrap text-center text-3xl mt-3">
        <span className="text-green-600">Sign up</span>
      </h1>
      <div className="flex flex-col items-center justify-center pl-10 pr-12 pb-16 pt-8 mt-7 border rounded-xl shadow-2xl bg-white">
        <div className="flex">
          <div className="self-start">
            <BackButton destination="/" />
          </div>

          <div className="flex items-center flex-col mt-8">
            <h2 className="font-semibold text-xl">Sign up</h2>
            <div className="flex flex-col mt-14 mr-8 self-start">
              <label htmlFor="name" className="mt-4 font-quicksand">
                Name
              </label>
              <input
                className="outline-none border-b border-black p-2 font-mooli mt-2"
                maxLength='12'
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              ></input>
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
                className="outline-none border-b border-black p-2 font-mooli mt-2"
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
            Already have account?{" "}
            <Link to="/login" className="text-cyan-500">
              Click here
            </Link>
          </p>
          <button
            onClick={handleUserRegister}
            className="border self-end font-semibold border-black rounded-xl bg-green-600 px-3 pb-2 pt-1 ml-7 text-white text-center hover:bg-green-400"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
