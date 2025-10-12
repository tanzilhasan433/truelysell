"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import LoginFormModal from "./LoginFormModal";

export default function RegistrationFormModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const handleLogin = (data) => {
    console.log("Login data:", data);
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        {/* Trigger button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 px-4 py-2 rounded text-white font-medium text-sm 
                  bg-gradient-to-r from-[var(--primary)] to-[var(--primary-blue)] 
                  hover:opacity-90 transition-all duration-200"
        >
          <MdLock size={15} />
          <span>Join Us</span>
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="absolute top-0 left-0 w-full h-full min-h-screen z-50 bg-black/50 flex justify-center items-start py-10">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 relative">
              {/* Header */}
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold mx-auto">Registration</h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-white bg-[var(--dark)] hover:bg-[var(--primary)] hover:text-white w-5 h-5 flex justify-center items-center rounded-full  absolute right-4 top-4"
                >
                  <IoClose />
                </button>
              </div>
              <p className="text-gray-500 text-center mb-6 text-sm">
                Enter your credentials to access your account
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    FUll Name
                  </label>
                  <input
                    type="text"
                    //   placeholder="Enter your username"
                    {...register("userName")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none "
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    //   placeholder="Enter your username"
                    {...register("email")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none "
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-[var(--primary)] underline text-sm font-medium "
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      // placeholder="Enter your password"
                      {...register("password")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none "
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    Remember Me
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 text-white font-medium rounded-md bg-gradient-to-r from-[var(--primary)] to-[var(--primary-blue)] hover:opacity-90"
                >
                  Sign Up
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-5">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-2 text-gray-500 text-sm">
                  Or sign up with
                </span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              {/* Social buttons */}
              <div className="flex gap-3">
                <button className="w-1/2 flex items-center justify-center gap-2 py-2  rounded-md bg-gray-200">
                  <FcGoogle size={20} />
                  <span>Google</span>
                </button>
                <button className="w-1/2 flex items-center justify-center gap-2 py-2  rounded-md bg-gray-200">
                  <FaFacebookF size={20} className="text-[#1877f2]" />
                  <span>Facebook</span>
                </button>
              </div>

              {/* Footer */}
              <p className="text-center text-sm mt-6">
                Already have a account?
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                  }}
                  className="text-[var(--primary)] font-medium"
                >
                  Sign In
                </button>
              </p>
              {/* <LoginFormModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                setIsLoginOpen={setIsLoginOpen}
              /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
