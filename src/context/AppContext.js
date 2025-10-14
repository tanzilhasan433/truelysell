"use client"; // required for Next.js app router

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRole");
    const storedToken = localStorage.getItem("user");

    if (storedUserName) setUserName(storedUserName);
    if (storedUserRole) setUserRole(storedUserRole);
    if (storedToken) setToken(storedToken);

    setLoading(false);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  // ✅ Login Handler — store data in both state & localStorage
  const login = useCallback(({ userName, userRole, token }) => {
    setUserName(userName);

    setUserRole(userRole);
    setToken(token);

    localStorage.setItem("userName", userName);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("user", token);
  }, []);

  // ✅ Logout Handler — clear state & localStorage
  const logout = useCallback(() => {
    setUserName(null);
    setUserRole(null);
    setToken(null);

    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
  }, []);
  const valueItems = {
    loading,
    setLoading,
    userName,
    userRole,
    token,
    isSidebarOpen,
    toggleSidebar,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={valueItems}>{children}</AppContext.Provider>
  );
};

// custom hook for easy usage
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
