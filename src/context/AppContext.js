"use client"; // required for Next.js app router

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const valueItems = {
    user,
    setUser,
    isSidebarOpen,
    toggleSidebar,
    loading,
    setLoading,
    userRole,
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
