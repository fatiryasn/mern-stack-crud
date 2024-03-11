//modules
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

//local file
import BackButton from "../components/BackButton.jsx";
import Loader from "../components/Loader.jsx";
import Footer from "../components/Footer";


const Detail = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  //api call (detail contact)
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://contactsaver-api.vercel.app/api/contact/${id}`)
      .then((res) => {
        setContact(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //event handler
  const handleDelete = () => {
    const confirmation = confirm("Are you sure want to delete this contact?");

    if (confirmation) {
      setLoading(true);
      axios
        .delete(`https://contactsaver-api.vercel.app/api/contact/${contact._id}`)
        .then(() => {
          setLoading(false);
          enqueueSnackbar(`${contact.name} has been deleted `, {
            variant: "info",
          });
          navigate("/contact");
        })
        .catch((err) => {
          setLoading(false);
          alert("an error happened");
          console.log(err);
        });
    }
  };

  //display!
  return (
    <>
      <Helmet>
        <title>{`Detail | ${contact.name} - contactsaver`}</title>
      </Helmet>
      <div className="flex justify-center items-center pt-20 mt-10 mx-10 h-fittiest">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col flex-wrap bg-gradient-to-br from-green-100 to-white shadow-2xl rounded-xl w-96 px-10 py-5">
            <div className="flex justify-between items-center">
              <div className="self-start">
                <BackButton destination="/contact" />
              </div>
              <div className="self-end font-thin text-xs text-gray-500">
                {contact._id}
              </div>
            </div>
            <div className="font-bold font-poppins text-2xl mt-14">
              {contact.name}
            </div>
            <div className="self-start font-quicksand mt-7">
              <FontAwesomeIcon icon={faPhone} /> {contact.nohp}
            </div>
            <div className="self-start font-quicksand mt-3 text-wrap">
              <FontAwesomeIcon icon={faEnvelope} /> {contact.email}
            </div>
            <div className="self-end mt-10">
              <Link to={`/contact/update/${contact._id}`}>
                <button className="text-blue-500">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="h-6"
                  ></FontAwesomeIcon>
                </button>
              </Link>
              <button className="ml-7 text-red-500">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="h-6"
                  onClick={handleDelete}
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Detail;
