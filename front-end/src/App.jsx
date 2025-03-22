import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <div className="header">
      <div className="app">
      <NavBar />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes> */}
    </div>
    </div>
  );
};

export default App;
