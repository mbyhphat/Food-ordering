import React, { useState, createContext, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, _setUser] = useState(() => {
        const storedUser = localStorage.getItem("USER_INFO");
        console.log(localStorage);
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, _setToken] = useState(() => {
        return localStorage.getItem("ACCESS_TOKEN") || null;
    });

    const setUser = (user) => {
        _setUser(user);
        if (user) {
            localStorage.setItem("USER_INFO", JSON.stringify(user));
            console.log(localStorage);
        } else {
            localStorage.removeItem("USER_INFO");
        }
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
