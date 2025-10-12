import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const ViewAllButton = ({ pageLink }) => {
  return (
    <div className="mt-10">
      <Link
        href={pageLink}
        className="bg-[var(--dark)] text-white px-4 py-2 w-[100px] rounded hover:bg-gray-800 transition-all flex items-center justify-center mx-auto gap-2 text-xs"
      >
        View All
        <IoIosArrowForward />
      </Link>
    </div>
  );
};

export default ViewAllButton;
