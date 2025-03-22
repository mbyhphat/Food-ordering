import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
