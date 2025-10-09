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
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);

  const server = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");
    const storedUserRole = localStorage.getItem("userRole");
    const storedToken = localStorage.getItem("user");

    if (storedUserName) setUserName(storedUserName);
    if (storedUserId) setUserId(storedUserId);
    if (storedUserRole) setUserRole(storedUserRole);
    if (storedToken) setToken(storedToken);

    setLoading(false);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  // ✅ Login Handler — store data in both state & localStorage
  const login = useCallback(({ userName, userId, userRole, token }) => {
    setUserName(userName);
    setUserId(userId);
    setUserRole(userRole);
    setToken(token);

    localStorage.setItem("userName", userName);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("user", token);
  }, []);

  // ✅ Logout Handler — clear state & localStorage
  const logout = useCallback(() => {
    setUserName(null);
    setUserId(null);
    setUserRole(null);
    setToken(null);

    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
  }, []);
  const valueItems = {
    server,
    loading,
    setLoading,
    userName,
    userId,
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
