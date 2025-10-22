"use client";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";

const AddUserModal = ({ isOpen, onClose, onSubmit, roles, userId }) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      MobileNo: "",
      IsActive: true,
      Password: "",
      RoleId: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const isEditMode = Boolean(userId);

  // Fetch single user for edit mode
  const getSingleUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}users/getuserbyid/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok && result.data) {
        const user = result.data;
        setValue("FirstName", user.firstName || "");
        setValue("LastName", user.lastName || "");
        setValue("Email", user.email || "");
        setValue("MobileNo", user.mobileNo || "");
        setValue("IsActive", user.isActive);
        setValue("RoleId", user.userRoles?.[0]?.roleId || "");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getSingleUser();
    } else {
      reset();
    }
  }, [userId, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5 overflow-y-auto sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Edit User" : "Add User"}
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
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            {...register("FirstName", {
              required: !isEditMode && "First name is required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            {...register("LastName", {
              required: !isEditMode && "Last name is required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone"
            {...register("MobileNo", {
              required: !isEditMode && "Phone number is required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("Email", {
              required: !isEditMode && "Email is required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("Password", {
                required: !isEditMode && "Password is required",
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Role */}
          <select
            id="RoleId"
            {...register("RoleId", {
              required: !isEditMode && "Role is required",
            })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
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

          {/* Status */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">Status</label>
            <input
              type="checkbox"
              {...register("IsActive")}
              className="toggle toggle-success"
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
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
