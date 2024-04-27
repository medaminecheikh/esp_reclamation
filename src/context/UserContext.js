import React, { createContext, useContext, useState } from 'react';
import  LoginRequest from "../services/backApi/LoginRequest";
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = async (Username, Password) => {
        try {
            const userData = await LoginRequest({ Username, Password });
            setUser(userData);  // Store user data in context
        } catch (error) {
            console.error('Login failed:', error);
            setUser(null);
        }
    };

    return (
        <UserContext.Provider value={{ user, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);