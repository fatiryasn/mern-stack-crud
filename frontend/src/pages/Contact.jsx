//modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//local file
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import TokenAlert from "../components/TokenAlert";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faInfoCircle,
  faMagnifyingGlass,
  faUsers,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  //states
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactsCount, setContactsCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [username, setUsername] = useState("username");
  const token = localStorage.getItem("token");

  //api call (get)
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:8080/api/contact?page=${page}&search=${search}&sort=${sort}&limit=${limit}`,
        { headers: { Authorization: token } }
      )
      .then((res) => {
        setContacts(res.data.contacts);
        setTotalPages(res.data.totalPages);
        setContactsCount(res.data.totalContacts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page, limit, sort, search, token]);

  //api call for user data
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get("http://localhost:8080/api/user/profile", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setUsername(res.data.name);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  //events handler
  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(page === 1 ? 1 : page - 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //display!
  return (
    <>
      <Helmet>
        <title>Contact - contactsaver</title>
      </Helmet>
      <div className="flex justify-center mt-10 pt-14">
        <div className="flex flex-col px-10 md:px-20 py-20 mb-2 w-full md:w-4/5 min-h-screen bg-slate-50 rounded-2xl shadow-2xl border-lightGreen border-2">
          {token ? (
            <>
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className=" flex flex-col ">
                  <p className="font-bold font-poppins text-xl md:text-2xl">
                    Hi, {username}
                  </p>
                  <p className="font-thin text-sm md:text-base font-quicksand tracking-widest mt-5 border-b border-zinc-700 w-fit pb-1 text-nowrap">
                    Your contact list
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold font-poppins text-sm md:text-lg">
                    <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>{" "}
                    {contactsCount}
                  </p>
                  <p className="font-thin font-quicksand text-sm md:text-lg">
                    CONTACTS
                  </p>
                </div>
              </div>
              {/* Search */}
              <div className="flex flex-col justify-center items-center mt-10">
                <div className="flex items-center justify-center bg-slate-50 w-3/4 rounded-3xl border border-zinc-600 px-5 py-1">
                  <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                  <input
                    className="border-none font-quicksand outline-none rounded-xl ml-2 text-darkGreen bg-transparent w-full h-10 text-sm md:text-lg"
                    type="text"
                    value={search}
                    placeholder="Search a contact..."
                    onChange={handleSearchInput}
                  />
                </div>
              </div>

              {/* Control Panel */}
              <div className="grid grid-cols-3 mt-10 text-xs place-items-center place-content-center px-5 py-7 rounded-xl bg-emerald-100 sticky top-20 md:text-base">
                <div className="flex flex-col items-start">
                  <p className="font-quicksand text-sm">Sort</p>
                  <select
                    value={sort}
                    onChange={handleSortChange}
                    className="font-poppins px-3 py-1 rounded-xl border border-black bg-slate-50 text-darkGreen font-semibold w-24 md:w-28"
                  >
                    <option value="default">Default</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Link to={"/contact/create"}>
                    <button
                      className=" bg-cusGreen p-3 rounded-full items-center text-cusBeige border-cusBeige hover:bg-darkGreen self-end justify-end md:p-5"
                      title="Create a contact"
                    >
                      <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                  </Link>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-quicksand text-sm">Limit</p>
                  <select
                    value={limit}
                    onChange={handleLimitChange}
                    className="font-poppins px-3 py-1 rounded-xl border border-black bg-slate-50 text-darkGreen font-semibold w-24"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>

              {/* Table of Contacts */}
              {loading ? (
                <Loader />
              ) : (
                <table className="mt-10">
                  <thead className="border-b-2 border-black">
                    <tr className="font-bold font-poppins text-lg">
                      <td className="p-3">Name</td>
                      <td>No hp</td>
                      <td>Detail</td>
                    </tr>
                  </thead>
                  {contacts.length === 0 ? (
                    <tbody>
                      <tr>
                        <td className="px-3 py-5 w-1/3 bg-red-700 text-cusBeige rounded-b-lg text-sm md:text-base">
                          <FontAwesomeIcon icon={faExclamationTriangle} /> No
                          data found
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {contacts.map((contact, index) => (
                        <tr
                          key={contact._id}
                          className={`font-quicksand ${
                            index % 2 === 0 ? "bg-white" : "bg-slate-100"
                          }`}
                        >
                          <td className="px-3 py-5 w-1/3 whitespace-pre-wrap break-all">
                            {contact.name}
                          </td>
                          <td>{contact.nohp}</td>
                          <td>
                            <Link to={`/contact/detail/${contact._id}`}>
                              <button
                                className="px-3 py-1 bg-lightGreen text-cusBeige rounded-2xl"
                                title="Detail"
                              >
                                Detail <FontAwesomeIcon icon={faInfoCircle} />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              )}

              {/* Pagination */}
              {contactsCount <= 10 ? (
                ""
              ) : (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <>
              <p className="font-thin font-quicksand tracking-widest mt-5 border-b border-zinc-700 w-fit pr-4 pb-1">
                Your contact list
              </p>
              <TokenAlert />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
