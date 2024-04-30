import React, { createContext, useContext, useState } from 'react';
import  LoginRequest from "../services/backApi/LoginRequest";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = async (Username, Password) => {
        try {
            const userData = await LoginRequest({ Username, Password });
            setUser(userData);  // Store user data in context
            sessionStorage.setItem('userData', JSON.stringify(userData)); 
        } catch (error) {
            console.error('Login failed:', error);
            setUser(null);
        }
    };
    const logoutUser = () => {
        localStorage.clear(); // Clear local storage
        sessionStorage.clear(); // Clear session storage (if used)
        setUser(null);  // Clear user data in context
      
    };
    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);