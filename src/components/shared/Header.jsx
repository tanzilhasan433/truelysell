"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { HiX, HiMenu, HiChevronDown } from "react-icons/hi";

import logo from "@/assets/img/logo.svg";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const { t, user, logPath } = useAppContext();

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const user = "arzena";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        isScrolled
          ? "bg-white backdrop-blur-sm  shadow-md py-6"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image src={logo} alt="Logo" />
          </Link>{" "}
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1 ">
            <NavLink href="/">Categories</NavLink>

            <div className="relative group">
              <button className="px-1 py-2 text-gray-800 hover:text-[var(--primary-hover)] font-medium transition-colors relative group flex items-center">
                Home
                <HiChevronDown className="w-5 h-5 ml-1  " />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link
                  href="/"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)]  transition-colors"
                >
                  sub1
                </Link>
                <Link
                  href="/"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  sub1
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="px-1 py-2 text-gray-800 hover:text-[var(--primary-hover)] font-medium transition-colors relative group flex items-center">
                Services
                <HiChevronDown className="w-5 h-5 ml-1  " />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link
                  href="/"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)]  transition-colors"
                >
                  sub1
                </Link>
                <Link
                  href="/"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  sub1
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="px-1 py-2 text-gray-800 hover:text-[var(--primary-hover)] font-medium transition-colors relative group flex items-center">
                Customers
                <HiChevronDown className="w-5 h-5 ml-1  " />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link
                  href="/"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)]  transition-colors"
                >
                  sub1
                </Link>
                <Link
                  href="/"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  sub1
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="px-1 py-2 text-gray-800 hover:text-[var(--primary-hover)] font-medium transition-colors relative group flex items-center">
                Providers
                <HiChevronDown className="w-5 h-5 ml-1  " />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link
                  href="/"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)]  transition-colors"
                >
                  sub1
                </Link>
                <Link
                  href="/"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  sub1
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="px-1 py-2 text-gray-800 hover:text-[var(--primary-hover)] font-medium transition-colors relative group flex items-center">
                Pages
                <HiChevronDown className="w-5 h-5 ml-1  " />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link
                  href="/pages/about"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)]  transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/pages/blog"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Blog sub
                </Link>
                <Link
                  href="/pages/contact-us"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/pages/how-it-works"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  href="/pages/error-page"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Error page sub
                </Link>
                <Link
                  href="/pages/authentication"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Authentication sub
                </Link>
                <Link
                  href="/pages/booking"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Booking sub
                </Link>
                <Link
                  href="/pages/categories"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/pages/pricing-plan"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Pricing Plan
                </Link>
                <Link
                  href="/pages/faq"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/pages/maintainance"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Maintaince
                </Link>
                <Link
                  href="/pages/coming-soon"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Coming Soon
                </Link>
                <Link
                  href="/pages/privacy-policy"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/pages/terms-conditions"
                  className="block font-medium px-4 py-1 text-gray-700 hover:text-[var(--primary-hover)] rounded-t-lg transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>

            <NavLink href="/">Become a Provider</NavLink>
            <NavLink href="/admin">Admin</NavLink>
          </nav>{" "}
          {/* Auth Buttons for Desktop */}
          <div className="hidden xl:flex items-center space-x-2 lg:space-x-4">
            {user ? (
              <Link
                href={"/"}
                className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}

            {/* Language Switcher */}
            {/* <LanguageSwitcher variant="desktop" /> */}
          </div>{" "}
          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <HiX className="w-6 h-6 text-[var(--primary)]" />
            ) : (
              <HiMenu className="w-6 h-6 text-[var(--primary)]" />
            )}
          </button>
        </div>{" "}
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden mt-4 py-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              <MobileNavLink href="/">Home</MobileNavLink>
              <MobileNavLink href="/">Services</MobileNavLink>
              <MobileNavLink href="/">Customers</MobileNavLink>
              <div className="space-y-1">
                <div className="px-4 py-2 text-gray-600 font-semibold text-sm uppercase tracking-wider border-b border-gray-200">
                  Home
                </div>
                <MobileNavLink href="/">Sub1</MobileNavLink>
                <MobileNavLink href="/">Sub2</MobileNavLink>
              </div>
              <MobileNavLink href="/contact-us">Home</MobileNavLink>
              {/* Language Switcher for Mobile */}
              <div className="border-t border-gray-200 my-2 pt-2 space-y-3">
                {user ? (
                  <MobileNavLink href={"/"} isHighlighted>
                    Sign In
                  </MobileNavLink>
                ) : (
                  <MobileNavLink href="/login" isHighlighted>
                    Login
                  </MobileNavLink>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Desktop Navigation Link
function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="px-1 py-2 text-gray-800 hover:text-[var(--primary-hover)] font-medium transition-colors relative group"
    >
      {children}
    </Link>
  );
}

// Mobile Navigation Link
function MobileNavLink({ href, children, isHighlighted = false }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2.5 block transition-all duration-200 ${
        isHighlighted
          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium mx-2 rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          : "text-gray-700 hover:text-[var(--primary-hover)] hover:bg-blue-50/80 hover:pl-6"
      }`}
    >
      {children}
    </Link>
  );
}
