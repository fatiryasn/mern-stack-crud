import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <div className="flex flex-col w-full bg-darkGreen text-white justify-center items-center mt-52 p-10">
      <div className="grid place-items-center md:grid-cols-2 gap-10 md:gap-40">
        <div className="flex flex-col gap-3 items-center md:items-start">
          <p className="font-bold font-poppins text-lg md:text-xl">contactsaver</p>
          <p className="font-thin font-quicksand text-xs md:text-base">A crud website, just for learning!</p>
        </div>
        <div className="flex flex-col gap-5 items-center md:items-end">
          <p className="font-quicksand text-sm md:text-base">Meet the creator</p>
          <p className="font-poppins md:text-lg text-lightGreen text-base ">Fatir Ahmad Yasin</p>
          <Link to='https://www.instagram.com/ftryas.n/'><p className="text-sm text-nowrap md:text-base underline decoration-lightGreen"><FontAwesomeIcon icon={faInstagram} /> ftryas.n</p></Link>
          <p></p>
        </div>
      </div>
      <div className="grid grid-cols-3 place-items-center mt-10 font-thin text-sm opacity-95">
        <p>Made with love</p>
        <div className="h-7 w-[1px] bg-white"></div>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
