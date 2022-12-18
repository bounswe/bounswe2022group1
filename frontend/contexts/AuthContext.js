import { createContext, useEffect, useState } from "react";
import axios from "../utils/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthendicated] = useState(false);

  const login = (username, token) => {
    setUser(username);
    setIsAuthendicated(true);
    if (typeof window != "undefined") {
      localStorage.setItem("user", username);
      localStorage.setItem("token", token);
      axios.defaults.headers.common = { Authorization: `Token ${token}` };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthendicated(false);
    if (typeof window != "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    delete axios.defaults.headers.common.Authorization;
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user) setUser(user);
    if (token) {
      setIsAuthendicated(true);
      axios.defaults.headers.common = { Authorization: `Token ${token}` };
    }
    console.log(user, token);
  }, []);

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
