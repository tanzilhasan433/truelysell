"use client";
import React from "react";

const Pagination = ({
  currentPage,
  totalRecords,
  pageSize = 10,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRecords / pageSize);

  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-end items-center gap-2 mt-6">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded-md border ${
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-[var(--primary-blue)] hover:text-white border-gray-300"
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded-md border transition ${
            currentPage === num
              ? "bg-[var(--primary-blue)] text-white border-[var(--primary-blue)]"
              : "hover:bg-[var(--primary-blue)] hover:text-white border-gray-300"
          }`}
        >
          {num}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded-md border ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-[var(--primary-blue)] hover:text-white border-gray-300"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
