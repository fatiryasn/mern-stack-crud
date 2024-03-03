///modules
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

//local file
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Edit = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  //api call (contact data)
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/contact/${id}`)
      .then((res) => {
        setContact(res.data);
        setName(res.data.name);
        setNohp(res.data.nohp);
        setEmail(res.data.email);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //event handler
  const handleEditForm = () => {
    const editedContact = {
      name,
      nohp,
      email,
    };
    
    //api call (edit contact)
    setLoading(true);
    axios
      .put(`http://localhost:8080/api/contact/${id}`, editedContact)
      .then(() => {
        enqueueSnackbar(`${contact.name} has been updated!`, {
          variant: "success",
        });
        setLoading(false);
        navigate("/contact");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong..");
        setLoading(false);
      });
  };

  //display!
  return (
    <>
      <Helmet>
        <title>{`Update | ${contact.name} - contactsaver.com`}</title>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center pt-20 mt-16 md:mt-32">
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="text-blue-900 h-8"
          />
          <div className="flex justify-center">
            <p className="self-center font-poppins font-bold text-xl text-wrap text-center md:text-start w-24">
              Update <span className=" text-blue-900">contact</span>
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
                      onClick={handleEditForm}
                      className=" font-semibold bg-blue-900 text-white px-5 py-2 rounded-2xl border-2 border-black disabled:text-gray-500"
                      disabled={!name || !nohp || !email}
                    >
                      Update
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
    </>
  );
};

export default Edit;
