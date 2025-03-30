import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from './pages/Home/Home';
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import  PlaceOrder  from "./pages/PlaceOrder/PlaceOrder";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
    
  );
};

export default App;
