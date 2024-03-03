//module
import React from "react";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

//component
const ErrorPopup = ({ message, onClose }) => {
  //display!
  return (
    <>
        <div className="fixed top-0 w-full h-full bg-shadowBlack z-50">
          <div className="fixed border-black border-2 border-t-4 rounded-xl w-64 shadow-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-10 pt-5 pb-10 bg-gradient-to-br from-red-200 to-white md:w-96">
            <div className="flex flex-col">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={onClose}
                className="h-5 self-start cursor-pointer"
              />
              <p className="self-center font-semibold text-lg font-quicksand text-red-600 mt-10 ">
                {message} <FontAwesomeIcon icon={faExclamationTriangle} />
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

export default ErrorPopup;
