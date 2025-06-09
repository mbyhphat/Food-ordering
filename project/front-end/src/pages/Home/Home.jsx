import React from "react";
import Navbar from "./../../components/NavBar/NavBar";

import "./Home.css";
import Header from "../../components/Header/Header";
import CustomerSupport from "../../components/CustomerSupport/CustomerSupport";
import Comment from "../../components/Comment/Comment";

const Home = () => {
    return (
        <div>
            <Header />
            <CustomerSupport />
            <Comment />
        </div>
    );
};

export default Home;
