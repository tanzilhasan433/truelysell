"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";

const EditUserModal = ({ isOpen, onClose, onSubmit, role }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      MobileNo: "",
      IsActive: true,
      Password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const [roles, setRoles] = useState();

  const getRoles = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getroles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();

        setRoles(result.data);
      } else {
        const errorData = await response.json();
      }
    } catch (error) {}
  };
  useEffect(() => {
    getRoles();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">
            {role === "customer"
              ? "Customer"
              : role === "provider"
              ? "Provider"
              : "User"}
          </h6>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="First Name"
            {...register("FirstName")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Job Title */}
          <input
            type="text"
            placeholder="Last Name"
            {...register("LastName")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
          {/* phone */}
          <input
            type="tel"
            placeholder="Phone"
            {...register("MobileNo")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
          {/* phone */}
          <input
            type="email"
            placeholder="Email"
            {...register("Email")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
          {/* password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("Password")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {/*confirm  password */}

          {/* <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div> */}

          <div>
            {/* <label
              htmlFor="UserRoles"
              className="text-sm font-medium text-gray-700"
            >
              User Role
            </label> */}
            <select
              id="RoleId"
              {...register("RoleId")}
              className="w-full border border-gray-300 rounded-md px-3 py-2  focus:outline-none "
              required
            >
              <option value="" disabled className="text-gray-400">
                Select a role
              </option>
              {roles?.map((role) => (
                <option key={role.id} value={role.id} className="text-gray-700">
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">Status</label>
            <input
              type="checkbox"
              {...register("IsActive")}
              className="toggle toggle-success "
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 text-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary-blue)] text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
