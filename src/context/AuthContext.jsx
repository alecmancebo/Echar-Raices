import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
    setLoadingAuth(false);
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};