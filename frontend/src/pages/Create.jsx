//modules
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { enqueueSnackbar } from "notistack";

//local file
import BackButton from "../components/BackButton";
import TokenAlert from "../components/TokenAlert";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

//component
const Create = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCreateForm = () => {
    const newContact = {
      name,
      nohp,
      email,
    };

    //api call (send data)
    setLoading(false);
    axios
      .post("https://contactsaver-api.vercel.app/api/contact", newContact, {
        headers: { Authorization: token },
      })
      .then(() => {
        enqueueSnackbar(`New Contact Created!.`, { variant: "success" });
        setName("");
        setEmail("");
        setNohp("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        setLoading(false);
      });
  };

  //display!
  return (
    <>
      <Helmet>
        <title>Create new contact - contactsaver</title>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center pt-20 mt-16 md:mt-32">
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
          <FontAwesomeIcon
            icon={faUserPlus}
            className="text-lightGreen h-8"
          />
          <div className="flex justify-center">
            <p className="self-center font-poppins font-bold text-xl text-wrap text-center md:text-start w-24">
              Create new <span className=" text-lightGreen">contact</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col bg-slate-50 rounded-2xl shadow-2xl p-10">
          {loading ? (
            <Loader />
          ) : (
            <>
              <BackButton destination="/contact" />
              {token ? (
                <>
                  <div className="flex flex-col mt-14 mr-10">
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className=" outline-none border-b border-black py-3 px-1 bg-transparent"
                      maxLength="20"
                      autoComplete="off"
                    ></input>
                    <input
                      type="tel"
                      id="nohp"
                      placeholder="No hp"
                      required
                      value={nohp}
                      onChange={(e) => setNohp(e.target.value)}
                      className=" outline-none border-b border-black py-3 px-1 bg-transparent mt-10"
                      maxLength="13"
                      autoComplete="off"
                    ></input>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className=" outline-none border-b border-black py-3 px-1 bg-transparent mt-10"
                      autoComplete="off"
                    ></input>
                  </div>
                  <div className="self-end mt-10">
                    <button
                      onClick={handleCreateForm}
                      className=" font-semibold bg-green-900 text-white px-5 py-2 rounded-2xl border-2 border-black disabled:text-gray-500"
                      disabled={!name || !nohp || !email}
                    >
                      Create
                    </button>
                  </div>
                </>
              ) : (
                <TokenAlert />
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Create;
