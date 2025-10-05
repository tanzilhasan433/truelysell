import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";

const HeadingWithAddButton = ({ heading, pageLink, btnName }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h4>{heading}</h4>
      {btnName && (
        <Link
          href={pageLink}
          className="bg-[var(--dark)] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add {btnName}
        </Link>
      )}
    </div>
  );
};

export default HeadingWithAddButton;
