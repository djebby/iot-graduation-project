import { createContext } from "react";

export const AuthContext = createContext({
    howIsLoggedIn: '',
    token: '',
    login: (token: string, role: string, expirationTime: number) => {},
    logout: () => {}
});