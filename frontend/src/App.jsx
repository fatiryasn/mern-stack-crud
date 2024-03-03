import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path={`/contact/detail/:id`} element={<Detail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact/create" element={<Create />} />
        <Route path="/contact/update/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
};

export default App;
