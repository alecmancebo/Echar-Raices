import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
    setLoadingAuth(false);
    }, []);

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
};