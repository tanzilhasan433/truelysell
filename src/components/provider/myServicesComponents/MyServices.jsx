import Link from "next/link";
import { FaEdit, FaTrash, FaRegCircle } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

const MyServices = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
      {data.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-md shadow-lg border border-gray-200   flex flex-col"
        >
          {/* service Image */}
          <div className="relative overflow-hidden">
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-48 object-cover rounded-t-md transform transition-transform duration-500 ease-in-out hover:scale-110"
            />
            <span className="absolute top-2 left-2 bg-white text-gray-700 px-3 py-1 text-sm rounded-md shadow">
              {service.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            {/* Author + Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <img
                src={service.authorImg}
                alt={service.author}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-700">
                {service.author}
              </span>
              <FaRegCalendarAlt className="ml-4" />
              <span>{service.date}</span>
            </div>

            {/* Title */}
            <Link
              href={`/service/${service.id}`}
              className="font-semibold text-gray-800 mb-2 cursor-pointer hover:text-[var(--primary-blue)] transition-colors duration-300"
            >
              {service.title}
            </Link>
            {/* Description */}
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {service.description}
            </p>

            {/* Actions */}
            <div className="mt-auto flex justify-between items-center text-gray-600 text-sm">
              <Link
                href={`/admin/services/edit?id=${service?.id}`}
                className="flex items-center gap-1 hover:text-blue-500"
              >
                <FaEdit /> Edit
              </Link>
              <button className="flex items-center gap-1 hover:text-red-500">
                <FaTrash /> Delete
              </button>
              <button className="flex items-center gap-1 hover:text-gray-800">
                <FaRegCircle /> {service.status}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyServices;
