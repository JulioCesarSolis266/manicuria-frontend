import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedUser = localStorage.getItem("user"); 
    const savedToken = localStorage.getItem("token");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);

    setLoading(false); // ⬅️ Ya cargó todo
  }, []);

  const login = (token, userData) => {
    const fullUser = { ...userData };

    setUser(fullUser);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(fullUser));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ⬅️ IMPORTANTE: mientras loading es true NO renderizamos App
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
