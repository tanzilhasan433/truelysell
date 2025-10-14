"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { IoClose } from "react-icons/io5";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import RegistrationFormModal from "./RegistrationFormModal";

export default function LoginFormModal({
  isOpen,
  onClose,
  setIsLoginOpen,
  isRegistrationOpen,
  setIsRegistrationOpen,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAppContext();
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      UserName: "",
      Password: "",
    },
  });

  const handleLogin = async (data) => {
    console.log("Login data:", data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_AUTH_URL}login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Login Success");
          onClose();

          const redirect =
            result.data.roles === "Admin"
              ? "/admin"
              : result.data.roles === "Customer"
              ? "/customer"
              : result.data.roles === "Provider"
              ? "/provider"
              : "/";
          router.push(redirect);
          login({
            userName: result.data.name,
            userRole: result.data.roles,
            token: result.data.token,
          });
        }
      } else {
        const errorData = await response.json();
      }
    } catch (error) {}
  };

  return (
    <div>
      {/* Modal */}
      {isOpen && (
        // <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 ">
        <div className="absolute top-0 left-0 w-full h-full min-h-screen z-50 bg-black/50 flex justify-center items-start py-10">
          {/* <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 relative my-5 max-h-[90vh] overflow-y-auto"> */}
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 relative">
            {/* Header */}
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold mx-auto">Welcome</h2>
              <button
                type="button"
                onClick={onClose}
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
                  User Name
                </label>
                <input
                  type="text"
                  {...register("UserName")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none "
                  required
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {/* <Link
                    href="#"
                    className="text-[var(--primary)] underline text-sm font-medium "
                  >
                    Forgot Password?
                  </Link> */}
                </div>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    // placeholder="Enter your password"
                    {...register("Password")}
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

              {/* <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  Remember Me
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  Sign in with OTP
                </label>
              </div> */}

              <button
                type="submit"
                className="w-full py-2 text-white font-medium rounded-md bg-gradient-to-r from-[var(--primary)] to-[var(--primary-blue)] hover:opacity-90"
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm mt-6">
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setIsRegistrationOpen(true);
                  onClose();
                }}
                className="text-[var(--primary)] font-medium"
              >
                Join us Today
              </button>
            </p>
            <RegistrationFormModal
              isOpen={isRegistrationOpen}
              onClose={() => setIsRegistrationOpen(false)}
              onSuccess={() => {
                setIsRegistrationOpen(false);
                setIsLoginOpen(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
