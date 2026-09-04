import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jalur_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/me")
      .then((u) => setUser(u))
      .catch(() => localStorage.removeItem("jalur_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await api.post("/login", { email, password });
    localStorage.setItem("jalur_token", data.token);
    setUser(data.user);
    return data;
  };

  const register = async (fields) => {
    const data = await api.post("/register", fields);
    localStorage.setItem("jalur_token", data.token);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {
      // token may already be invalid
    }
    localStorage.removeItem("jalur_token");
    setUser(null);
  };

  const refreshUser = async () => {
    const u = await api.get("/me");
    setUser(u);
    return u;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
