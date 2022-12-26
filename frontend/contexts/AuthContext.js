import { createContext, useEffect, useState } from "react";
import axios from "../utils/axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthendicated] = useState(false);

  const login = (user, token) => {
    setUser(user);
    setIsAuthendicated(true);
    if (typeof window != "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      axios.defaults.headers.common = { Authorization: `Token ${token}` };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthendicated(false);
    if (typeof window != "undefined") {
      localStorage.removeItem("token");
    }
    delete axios.defaults.headers.common.Authorization;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) setUser(user);
    if (token) {
      setIsAuthendicated(true);
      axios.defaults.headers.common = { Authorization: `Token ${token}` };
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
