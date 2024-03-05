//modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

//local file
import homeimg from "../assets/home.png";
import tailwind from "../assets/tailwind.png";
import express from "../assets/express.png";
import mongo from "../assets/mongo.png";
import vite from "../assets/vite.png";
import react from "../assets/react.png";
import node from "../assets/node.png";
import resp from "../assets/resp.png";
import Footer from "../components/Footer";

//component
const Home = () => {
  const [hoverText, setHoverText] = useState(null);
  const [textColor, setTextColor] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (hoverText === "MongoDB") {
      return setTextColor("text-lime-500");
    }
    if (hoverText === "React JS") {
      return setTextColor("text-cyan-600");
    }
    if (hoverText === "Tailwind CSS") {
      return setTextColor("text-cyan-400");
    }
    if (hoverText === "Node JS") {
      return setTextColor("text-green-800");
    }
    if (hoverText === "Vite") {
      return setTextColor("text-fuchsia-600");
    }
    if (hoverText === "Express JS") {
      return setTextColor("text-gray-500");
    } else {
      setTextColor("text-lightGreen");
    }
  }, [hoverText]);

  useEffect(() => {
    const animationElement = document.querySelector(".animate-text");

    if (animationElement) {
      animationElement.classList.remove(
        "animate-[appears_500ms_ease-in_forwards]"
      );
      void animationElement.offsetWidth;
      animationElement.classList.add(
        "animate-[appears_500ms_ease-in_forwards]"
      );
    }
  }, [hoverText]);
  //display!
  return (
    <>
      <Helmet>
        <title>contactsaver - A website for your contact list</title>
      </Helmet>
      <div className="flex flex-col mt-20 pt-20 lg:mt-10 lg:mx-20">
        <div className="grid grid-cols-1 place-content-center place-items-center lg:grid-cols-2 lg:h-fittiest">
          <div className="flex flex-col w-6/12 lg:w-10/12">
            <h1 className="font-bold text-4xl text-center text font-poppins lg:text-start">
              Backup your contact here!
            </h1>
            <p className="mt-10 text-wrap text-center font-quicksand text-lg lg:text-start lg:mt-7">
              We <span className="italic font-thin">(actually i)</span> provide
              anything you need to your contact.{" "}
              <span className="font-semibold underline decoration-green-500">
                Create, Update, Delete, and Visualize
              </span>{" "}
              your contact with stunning ui, search and sort feature is ready to
              satisfy you.
            </p>
            {token ? (
              <div className="flex flex-col items-center lg:items-start">
              <p className="font-quicksand font-semibold text-lg mt-7 italic text-center lg:text-start">
                You already logged in{" "}
                <span className="text-lightGreen">
                  <FontAwesomeIcon icon={faUserCheck} />
                </span>
              </p>
              <button className="mt-3 font-medium border-2 border-black rounded-xl bg-green-600 px-5 py-2 text-white text-center hover:bg-green-400 text-nowrap">
                <Link to='/contact'>Go to your contact</Link>
              </button>
              </div>
            ) : (
              <>
                <div className="flex mt-10 justify-center lg:justify-start">
                  <Link to="/register">
                    <button className="font-medium border-2 border-black rounded-xl bg-green-600 px-5 py-2 text-white text-center hover:bg-green-400 text-nowrap">
                      Sign Up
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="font-medium border-2 border-black rounded-xl bg-blue-600 px-5 py-2 ml-5 text-white text-center hover:bg-blue-400">
                      Login
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className=" mt-16">
            <img
              src={homeimg}
              className="h-80 drop-shadow-standard z-0 lg:h-fittiest"
            ></img>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-20 justify-center items-center mt-4">
          <img src={resp} alt="resp" className=" h-80 md:h-96 drop-shadow-standard"/>
          <p className="font-quicksand text-xl md:text-2xl">It's <span className="font-poppins text-yellow-600 font-bold"> <FontAwesomeIcon icon={faWandMagicSparkles} className="text-yellow-500" />responsive!</span></p>
        </div>
        <div className="flex flex-col items-center mt-40 mb-40">
          <div className="flex flex-col items-center lg:text-xl">
            <p className="text-lg font-quicksand">Made with</p>
            <p className=" animate-text text-2xl font-poppins font-bold mt-7  text-lightGreen md:text-3xl">
              <span className={`${textColor}`}>
                {hoverText ? hoverText : "MERN-Stack"}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-20 box-border place-content-center place-items-center lg:grid-cols-3 md:gap-10">
            <img
              src={mongo}
              alt="MongoDB"
              className="border rounded-2xl h-16 p-5 bg-white hover:bg-slate-200 md:h-24 md:order-1"
              onMouseEnter={() => setHoverText("MongoDB")}
              onMouseLeave={() => setHoverText(null)}
            ></img>
            <img
              src={react}
              alt="React"
              className="border rounded-2xl h-20 p-5 bg-white hover:bg-slate-200 md:h-28 md:order-2"
              onMouseEnter={() => setHoverText("React JS")}
              onMouseLeave={() => setHoverText(null)}
            />
            <img
              src={tailwind}
              alt="Tailwind"
              className="border rounded-2xl h-20 p-5 bg-white hover:bg-slate-200 md:h-28 md:order-4"
              onMouseEnter={() => setHoverText("Tailwind CSS")}
              onMouseLeave={() => setHoverText(null)}
            />
            <img
              src={node}
              alt="Node"
              className="border rounded-2xl h-16 py-5 px-10 bg-white hover:bg-slate-200 md:h-28 md:order-3"
              onMouseEnter={() => setHoverText("Node JS")}
              onMouseLeave={() => setHoverText(null)}
            />
            <img
              src={express}
              alt="Express"
              className="border rounded-2xl h-16 p-5 bg-white hover:bg-slate-200 md:h-24 md:order-5"
              onMouseEnter={() => setHoverText("Express JS")}
              onMouseLeave={() => setHoverText(null)}
            />
            <img
              src={vite}
              alt="Vite"
              className="border rounded-2xl h-20 p-5 bg-white hover:bg-slate-200 md:h-28 md:order-6"
              onMouseEnter={() => setHoverText("Vite")}
              onMouseLeave={() => setHoverText(null)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
