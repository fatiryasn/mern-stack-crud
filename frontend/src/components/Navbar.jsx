//modules
import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

//local file
import icon from "../assets/icon.png";
import TokenAlert from "./TokenAlert";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faXmark,
  faRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

//component
const Navbar = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [displayRole, setDisplayRole] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [ID, setID] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //api call (user data)
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get("http://localhost:8080/api/user/profile", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setUsername(res.data.name);
          setUseremail(res.data.email);
          setID(res.data.id);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [token]);

  //events handler
  const handleProfile = () => {
    setDisplayRole(!displayRole);
  };
  const handleLogout = () => {
    const confirmation = confirm("Are you sure want to logout?");

    if (confirmation) {
      localStorage.removeItem("token");
      setDisplayRole(false);
      if (window.location.pathname === "/") {
        window.location.reload();
      } else {
        enqueueSnackbar("Logged out", { variant: "default" });
        navigate("/");
      }
    }
  };
  const handleMenu = () => {
    setMenuDisplay(!menuDisplay);
  };

  //display!
  return (
    <>
      <div className="flex justify-between items-center fixed top-0 right-0 left-0 shadow-xl m-0 py-5 px-14 bg-slate-50 z-10 sm:grid place-content-center place-items-center grid-cols-3">
        <div className=" text-center flex justify-center items-center sm:w-40">
          <img src={icon} className="h-9 drop-shadow"></img>
          <p className="hidden font-mooli text-sm font-bold sm:block">
            contactsaver.com
          </p>
        </div>

        <div className="font-quicksand hidden gap-2 grid-cols-2 place-items-center lg:gap-6 sm:grid">
          <NavLink
            to="/"
            className="hover:text-lightGreen font-bold text-sm lg:text-base"
          >
            <button>Home</button>
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-lightGreen font-bold text-sm lg:text-base"
          >
            <button>Your Contact</button>
          </NavLink>
        </div>

        <div className="flex justify-center items-center gap-10">
          <button
            className=" text-center z-50 hover:text-lightGreen"
            onClick={handleProfile}
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              className="h-6"
            ></FontAwesomeIcon>
          </button>
          <button
            className="block sm:hidden hover:text-lightGreen"
            onClick={handleMenu}
          >
            {menuDisplay === false? (
              <FontAwesomeIcon icon={faBars} className="h-6 text-black" />
            ): (
              <FontAwesomeIcon icon={faXmark} className="h-7" />
            )}
          </button>
          {menuDisplay ? (
          <div className="fixed flex flex-col right-0 top-20 text-white font-poppins bottom-0 p-10 bg-slate-800 sm:hidden z-50">
            <NavLink
              to="/"
              className="hover:text-lightGreen font-bold text-sm lg:text-base"
            >
              <button>Home</button>
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-lightGreen font-bold text-sm mt-16 lg:text-base"
            >
              <button>Your Contact</button>
            </NavLink>
          </div>
          ): ("")}
        </div>
      </div>
      {displayRole && (
        <div className="fixed top-0 w-full h-full bg-shadowBlack z-50">
          <div className="fixed border-black border-2 border-t-8 rounded-xl w-96 shadow-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 py-5 px-10 bg-gradient-to-br from-green-100 to-white">
            <div className="flex flex-col">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handleProfile}
                className="h-5 self-start cursor-pointer"
              />
              <p className="font-bold text-xl font-poppins mt-5 self-center">
                Account Settings
              </p>
              {token ? (
                <>
                  <div className="mt-14 flex flex-col w-fit">
                    <p className="font-light font-quicksand w-fit">ID</p>
                    <p className="font-semibold font-mooli text-darkGreen w-fit uppercase">
                      {ID}
                    </p>
                    <p className="font-light font-quicksand w-fit mt-7">Name</p>
                    <p className="font-semibold text-lg font-mooli text-darkGreen w-fit">
                      {username}
                    </p>
                    <p className="font-light font-quicksand w-fit mt-7">
                      Email
                    </p>
                    <p className="font-semibold text-lg font-mooli text-darkGreen w-fit">
                      {useremail}
                    </p>
                  </div>
                  <div className="mt-20 self-end">
                    <button
                      className=" bg-red-700 text-white font-semibold px-3 py-2 rounded-lg"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <TokenAlert />
              )}
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default Navbar;
