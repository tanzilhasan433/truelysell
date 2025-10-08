// "use client";

// import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
// import { useEffect, useRef, useState } from "react";

// import { MdLock } from "react-icons/md";

// const LoginFormModal = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { register, handleSubmit, setValue, watch } = useForm({
//     defaultValues: {
//       name: "",
//       userName: "",
//       phone: 0,
//       email: "",
//       password: "",
//       confirmPassword: "",
//       role: "",
//       status: true,
//     },
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   // State for preview
//   const [preview, setPreview] = useState("https://i.pravatar.cc/80");

//   // Ref for file input
//   const fileInputRef = useRef(null);

//   const handleUploadClick = () => {
//     fileInputRef.current.click(); // Open file browser
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file)); // Show preview
//       setValue("image", file); // Save to form
//     }
//   };

//   //   if (!isModalOpen) return null;

//   const handleLogin = (data) => {
//     console.log("Form Submitted:", data);
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="flex items-center gap-1 px-4 py-2 rounded  font-medium text-sm
//                        bg-gray-200/80 text-gray-800 "
//       >
//         <MdLock size={15} className=" " />
//         <span>Sign In</span>
//       </button>
//       {/* ... */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto ">
//           <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-2">
//               <h6 className="text-lg font-semibold mx-auto">Add </h6>
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-800"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
//               {/* Upload */}
//               <div className="flex items-center gap-3">
//                 <img
//                   src={preview}
//                   alt="preview"
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div className="flex gap-2">
//                   <button
//                     type="button"
//                     onClick={handleUploadClick}
//                     className="px-3 py-1 bg-[var(--primary-blue)]/10 text-blue-500 border border-[var(--primary-blue)]/10 rounded-md text-sm"
//                   >
//                     Upload
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setPreview("https://i.pravatar.cc/80")}
//                     className="px-3 py-1 text-red-500 border border-red-500 rounded-md text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-500">
//                 * Recommends a minimum size of 320 x 320 pixels. Allowed files
//                 .png and .jpg.
//               </p>

//               {/* Hidden File Input */}
//               <input
//                 type="file"
//                 accept="image/png, image/jpeg"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//               />

//               {/* Name */}
//               <input
//                 type="text"
//                 placeholder="Name"
//                 {...register("name")}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
//               />

//               {/* Job Title */}
//               <input
//                 type="text"
//                 placeholder="User Name"
//                 {...register("userName")}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
//               />
//               {/* phone */}
//               <input
//                 type="tel"
//                 placeholder="Phone"
//                 {...register("phone")}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
//               />
//               {/* phone */}
//               <input
//                 type="email"
//                 placeholder="Email"
//                 {...register("email")}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
//               />
//               {/* password */}
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   {...register("password")}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 cursor-pointer text-gray-500"
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//               {/*confirm  password */}

//               <div className="relative">
//                 <input
//                   type={showConfirm ? "text" : "password"}
//                   placeholder="Confirm Password"
//                   {...register("confirmPassword")}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
//                 />
//                 <span
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-3 top-3 cursor-pointer text-gray-500"
//                 >
//                   {showConfirm ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>

//               <select
//                 {...register("role")}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 "
//               >
//                 <option value="" className="text-sm  ">
//                   Select Role
//                 </option>
//                 <option value="admin">Admin</option>
//                 <option value="provider">Provider</option>
//                 <option value="customer">Customer</option>
//               </select>

//               {/* Status */}
//               <div className="flex items-center justify-between">
//                 <label className="text-sm font-medium">Status</label>
//                 <input
//                   type="checkbox"
//                   {...register("status")}
//                   className="toggle toggle-success"
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end gap-3 mt-4 text-sm">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-[var(--primary-blue)] text-white rounded-md"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ... */}
//     </div>
//   );
// };

// export default LoginFormModal;

"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function LoginFormModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div>
      {/* Trigger button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1 px-4 py-2 rounded font-medium text-sm bg-gray-200/80 text-gray-800"
      >
        <MdLock size={15} />
        <span>Sign In</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 relative my-5">
            {/* Header */}
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold mx-auto">Welcome</h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white bg-[var(--dark)] hover:bg-[var(--primary)] hover:text-white w-5 h-5 flex justify-center items-center rounded-full hover:text-gray-800 absolute right-4 top-4"
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
                  //   placeholder="Enter your username"
                  {...register("userName")}
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
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  Sign in with OTP
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white font-medium rounded-md bg-gradient-to-r from-[var(--primary)] to-[var(--primary-blue)] hover:opacity-90"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-5">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-2 text-gray-500 text-sm">
                Or sign in with
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
              Don’t have an account?{" "}
              <a href="#" className="text-[var(--primary)] font-medium">
                Join us Today
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
