import { createContext, useState, useEffect } from 'react';

// CONTEXTO DE AUTENTICACION
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    // ESTADO DE SESION
    const [token, setToken] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
    setLoadingAuth(false);
    }, []);

    // ACCIONES DE SESION
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