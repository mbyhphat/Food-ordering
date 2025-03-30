import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from './pages/Home/Home';
import Menu from "./pages/Menu/Menu";
import Home from './pages/Home/Home'
import Cart from "./pages/Cart/Cart";
import  PlaceOrder  from "./pages/PlaceOrder/PlaceOrder";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
      </Routes>
    </div>
    
  );
};

export default App;
