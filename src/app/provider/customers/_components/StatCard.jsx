import React from "react";

const StatCard = ({ title, value, border, text }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${border} bg-white p-2 `}
    >
      <p className="text-sm text-gray-500 z-50">{title}</p>
      <p className={`mt-2 text-2xl font-semibold ${text}`}>{value}</p>

      {/* Curved background */}
      <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-gray-100 translate-x-1/3 translate-y-1/3" />
    </div>
  );
};

export default StatCard;
