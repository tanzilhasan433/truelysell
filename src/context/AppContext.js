"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const { reset } = useForm();

  const router = useRouter();

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

  const logout = useCallback(() => {
    setUserName(null);
    setUserRole(null);
    setToken(null);

    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    router.push("/");
  }, []);

  useEffect(() => {
    if (!token) return;

    if (isTokenExpired(token)) {
      logout();
      router.push("/");
    }
  }, [token]);

  const onClose = () => {
    reset();
    setIsModalOpen(false);
    setIsDetailsModalOpen(false);
  };

  const isTokenExpired = (token) => {
    try {
      const [, payload] = token.split(".");
      const decoded = JSON.parse(atob(payload));
      const exp = decoded.exp * 1000; // convert to ms
      return Date.now() > exp;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRole");
    const storedToken = localStorage.getItem("user");

    if (storedToken && isTokenExpired(storedToken)) {
      logout(); // ⬅ auto logout
      router.push("/");
      return;
    }

    if (storedUserName) setUserName(storedUserName);
    if (storedUserRole) setUserRole(storedUserRole);
    if (storedToken) setToken(storedToken);

    setLoading(false);
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
    selectedId,
    setSelectedId,
    currentPage,
    setCurrentPage,
    totalRecords,
    setTotalRecords,
    isModalOpen,
    setIsModalOpen,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    onClose,
  };

  return (
    <AppContext.Provider value={valueItems}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
