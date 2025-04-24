import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "../../components/NavBar/NavBar";
import { Footer } from "./../../components/Footer/Footer";

const RootLayout = () => {
    return (
        <>
            <div className="app">
                <NavBar />
                <main className="content">
                    <Outlet /> {/* Outlet sẽ render các route children */}
                </main>
            </div>
            <ToastContainer />
            <Footer />
        </>
    );
};

export default RootLayout;
