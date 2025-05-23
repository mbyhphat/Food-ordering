import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Voucher from "./pages/Voucher/voucher";
import Analytis from "./pages/Analytis/analytis"

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/analytis" element={<Analytis/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
