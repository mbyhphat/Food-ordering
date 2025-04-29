import React from "react";
import Navbar from "./../../components/NavBar/NavBar";

import "./Home.css";
import Header from "../../components/Header/Header";
import CustomerSupport from "../../components/CustomerSupport/CustomerSupport";

const Home = () => {
    return (
        <div>
            <Header />
            <CustomerSupport />
        </div>
    );
};

export default Home;
