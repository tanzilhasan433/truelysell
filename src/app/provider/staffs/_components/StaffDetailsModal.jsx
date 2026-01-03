import { useAppContext } from "@/context/AppContext";
import React from "react";

const StaffDetailsModal = ({ item }) => {
  const { onClose } = useAppContext();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="relative bg-linear-to-r from-(--primary) to-pink-600 px-6 py-4 text-white">
          <h6 className="text-lg font-semibold text-white text-center">
            Service man Details
          </h6>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>
        <p className="p-6">list of order by this Staff</p>
      </div>
    </div>
  );
};

export default StaffDetailsModal;
