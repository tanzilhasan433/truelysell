"use client";

import { FaSignOutAlt, FaTools, FaUser } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GrNotification } from "react-icons/gr";
import { IoScanSharp } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
const AdminHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const { user, loading } = useAppContext();
  const userNm = "Arzena";
  const router = useRouter();

  // useEffect(() => {
  //   if (!user && !loading) router.push("/login");
  // }, [user, router, loading]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    if (showMenu || showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, showNotifications]);

  const handleMenuItemClick = () => {
    setShowMenu(false);
  };

  const handleNotificationItemClick = () => {
    setShowNotifications(false);
  };
  return (
    <>
      <header className="flex items-center justify-between bg-white/30  px-3 sm:px-4 md:px-8 py-3 sm:py-4   mb-4 sm:mb-6 border-b border-blue-100 relative z-20">
        {/* Logo or Brand */}
        <div className="md:flex items-center hidden">
          {/* search */}
          <div className="relative max-w-md mx-auto">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <CiSearch />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none  "
            />
          </div>
        </div>{" "}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-2 ml-auto">
          <button
            className="text-gray-600   hover:text-[var(--primary-blue)] transition-all duration-200 p-2  flex gap-2 items-center justify-center    touch-manipulation"
            // onClick={() => setShowNotifications((v) => !v)}
            type="button"
          >
            <CiGlobe className="text-lg" />{" "}
            <span className="text-sm">View site</span>
          </button>
          <button
            className="text-gray-600 hover:text-white bg-gray-100 hover:bg-[var(--primary-blue)] transition-all duration-200 p-2 rounded-full hover:min-h-[42px] hover:min-w-[42px] min-h-[42px] min-w-[42px] flex items-center justify-center    touch-manipulation"
            // onClick={() => setShowNotifications((v) => !v)}
            type="button"
          >
            <IoMoonOutline className="text-lg" />
          </button>
          {/* Notification - With dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              className="text-gray-600 hover:text-white bg-gray-100 hover:bg-[var(--primary-blue)] transition-all duration-200 p-2 rounded-full hover:min-h-[42px] hover:min-w-[42px] min-h-[42px] min-w-[42px] flex items-center justify-center    touch-manipulation"
              onClick={() => setShowNotifications((v) => !v)}
              type="button"
              //   aria-label="Notifications"
            >
              <GrNotification className="text-lg" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-blue-100 py-2 z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Notification
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {/* Sample notification items */}
                  <div
                    className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50"
                    onClick={handleNotificationItemClick}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 font-medium">
                        newStudentApplication
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        twoMinutesAgo
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50"
                    onClick={handleNotificationItemClick}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 font-medium">
                        companyProfileUpdated
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        fifteenMinutesAgo
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50"
                    onClick={handleNotificationItemClick}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 font-medium">
                        taskDeadlineApproaching
                      </p>
                      <p className="text-xs text-gray-500 mt-1">oneHourAgo</p>
                    </div>
                  </div>
                  <div
                    className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50"
                    onClick={handleNotificationItemClick}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 font-medium">
                        newMessageFromAgent
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        threeHoursAgo
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer"
                    onClick={handleNotificationItemClick}
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">systemMaintenance</p>
                      <p className="text-xs text-gray-500 mt-1">yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    onClick={handleNotificationItemClick}
                  >
                    viewAllNotifications
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            className="text-gray-600 hover:text-white bg-gray-100 hover:bg-[var(--primary-blue)] transition-all duration-200 p-2 rounded-full hover:min-h-[42px] hover:min-w-[42px] min-h-[42px] min-w-[42px] flex items-center justify-center    touch-manipulation"
            // onClick={() => setShowNotifications((v) => !v)}
            type="button"
          >
            <IoScanSharp className="text-lg" />
          </button>
          {/* Profile Menu */}
          <div className="relative" ref={menuRef}>
            <button
              className="w-10 h-10 md:w-10 md:h-10 rounded-full border border-gray-400 flex items-center justify-center  text-gray-400 font-bold  focus:outline-none text-sm touch-manipulation"
              onClick={() => setShowMenu((v) => !v)}
              type="button"
              aria-label="Profile menu"
            >
              <div className="bg-gray-400 h-7 w-7 rounded-full animate-ping"></div>

              <span className="border absolute w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 m-1">
                {userNm?.charAt(0)}
              </span>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 sm:w-44 bg-white rounded-xl shadow-xl border border-blue-100 py-2 z-50 animate-fadeIn">
                <Link
                  href={`/profile`}
                  className="flex gap-2 items-center px-4 py-3 text-gray-700 hover:bg-blue-50 rounded text-sm touch-manipulation"
                  onClick={handleMenuItemClick}
                >
                  <FaUser />
                  profile
                </Link>
                <Link
                  href={`/settings`}
                  className="flex gap-2 items-center px-4 py-3 text-gray-700 hover:bg-blue-50 rounded text-sm touch-manipulation"
                  onClick={handleMenuItemClick}
                >
                  <FaTools />
                  settings
                </Link>
                <button
                  onClick={() => {
                    handleMenuItemClick();
                    // logoutUser();
                  }}
                  className="flex gap-2 items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded text-sm touch-manipulation"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>{" "}
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
