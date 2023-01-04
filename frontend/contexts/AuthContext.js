import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthendicated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, token) => {
    setUser(username);
    setIsAuthendicated(true);
    if (typeof window != "undefined") {
      localStorage.setItem("user", username);
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthendicated(false);
    if (typeof window != "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user) setUser(user);
    if (token) setIsAuthendicated(true);
  }, []);

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
