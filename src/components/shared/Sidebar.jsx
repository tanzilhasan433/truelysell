"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/admin/img/logo.svg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const Sidebar = ({ navLinks }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // helper: check if active
  const isActive = (path) => pathname === path;

  // helper: check if parent should be open based on active child
  const isParentActive = (children) =>
    children?.some((child) => pathname === child.path);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-6 cursor-pointer left-4 z-50  0"
      >
        {isMobileMenuOpen ? (
          <FaTimes className="text-gray-600 text-xl" />
        ) : (
          <FaBars className="text-gray-600 text-xl" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 h-screen rounded-tr-2xl
          w-64 md:w-64 lg:w-[270px]
          bg-[#080C18] backdrop-blur-xl border-r border-blue-100 shadow-xl
          flex flex-col py-6 px-4 space-y-2
          transform transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <Link href={"/"} className="flex items-center mb-8 gap-2 mt-14 md:mt-0">
          <Image src={logo} alt="Logo" />
        </Link>

        <nav className="flex-1 space-y-1 overflow-y-scroll sidebar-scroll">
          {navLinks.map((section, index) => (
            <div key={index} className="mb-6">
              <p className="text-gray-400 text-xs uppercase mb-2">
                {section.section}
              </p>
              <ul className="text-[14px]">
                {section.items.map((item, i) => {
                  const parentActive = isParentActive(item.children);

                  return (
                    <li key={i}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => toggleMenu(item.label)}
                            className={`flex items-center justify-between w-full py-2 px-3 rounded ${
                              parentActive
                                ? "bg-blue-700 text-white"
                                : "hover:bg-blue-700 text-white"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {item.icon}
                              {item.label}
                            </span>
                            <span>
                              {openMenus[item.label] || parentActive ? (
                                <IoIosArrowDown />
                              ) : (
                                <IoIosArrowForward />
                              )}
                            </span>
                          </button>
                          <div
                            className={`ml-6 mt-1 overflow-hidden transition-all duration-300 ease-in-out 
    ${openMenus[item.label] || parentActive ? "max-h-96" : "max-h-0"}
  `}
                          >
                            <ul className="space-y-1 ">
                              {item.children.map((child, j) => (
                                <li key={j}>
                                  <Link
                                    href={child.path}
                                    className={`block py-1 px-2 rounded ${
                                      isActive(child.path)
                                        ? "bg-[var(--primary-blue)] text-white"
                                        : "hover:bg-[var(--primary-blue)] text-white"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* {(openMenus[item.label] || parentActive) && (
                            
                            <ul className="ml-6 mt-1 space-y-1">
                              {item.children.map((child, j) => (
                                <li key={j}>
                                  <Link
                                    href={child.path}
                                    className={`block py-1 px-2 rounded ${
                                      isActive(child.path)
                                        ? "bg-[var(--primary-blue)] text-white"
                                        : "hover:bg-[var(--primary-blue)] text-white"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )} */}
                        </>
                      ) : (
                        <Link
                          href={item.path}
                          className={`flex items-center gap-2 py-2 px-3 rounded ${
                            isActive(item.path)
                              ? "bg-[var(--primary-blue)] text-white"
                              : "hover:bg-[var(--primary-blue)] text-white"
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

{
  /* {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2 rounded-full font-medium transition-all duration-200 relative overflow-visible ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                    : "hover:bg-blue-100/40 text-blue-900"
                }`}
              >
                <span className="text-lg group-hover:scale-125 transition-transform duration-200">
                  {link.icon}
                </span>{" "}
                <span className="truncate text-sm md:text-base">
                  {link.labelKey}
                </span>
                {isActive && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg animate-pulse" />
                )}
              </Link>
            );
          })} */
}
