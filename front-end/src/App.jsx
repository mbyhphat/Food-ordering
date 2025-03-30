import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ExploreMenu from "./components/Explore Menu/ExploreMenu";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";
import Home from './pages/Home/Home';
import Menu from "./pages/Menu/Menu";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
      </Routes>
      {/* <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay /> */}
    {/* <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes> */}
    </div>
    
  );
};

export default App;
