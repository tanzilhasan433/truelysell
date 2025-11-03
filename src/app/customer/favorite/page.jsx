"use client";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";

const favoriteServices = [
  {
    id: 1,
    title: "Car Repair Services",
    category: "Car Wash",
    provider: "John Smith",
    location: "New Jersey, USA",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "Toughened Glass Fitting Services",
    category: "Construction",
    provider: "Charles",
    location: "Chicago, USA",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "Home Cleaning Service",
    category: "Cleaning",
    provider: "Emma Wilson",
    location: "Los Angeles, USA",
    image:
      "https://images.unsplash.com/photo-1581579185169-5171cf7b74e1?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    title: "Gardening & Landscaping",
    category: "Outdoor",
    provider: "Michael Brown",
    location: "Seattle, USA",
    image:
      "https://images.unsplash.com/photo-1599599810762-0c7d1b2e0c8d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    title: "AC Installation Service",
    category: "Electronics",
    provider: "Sophia Davis",
    location: "Dallas, USA",
    image:
      "https://images.unsplash.com/photo-1598300053650-5f9b8a08b1ee?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    title: "Furniture Assembly",
    category: "Home Services",
    provider: "Liam Johnson",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=60",
  },
];

const CustomerFavoritePage = () => {
  return (
    <div className="containter mx-auto mb-10">
      <h4 className=" mb-5">Favorites</h4>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteServices.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-xl overflow-hidden relative group hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={service.image}
                alt={service.title}
                className="h-48 w-full object-cover"
              />
              {/* Heart Icon */}
              <div className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md">
                <FaHeart className="text-pink-500 text-lg" />
              </div>
              {/* Category Tag */}
              <div className="absolute top-3 right-3 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                {service.category}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4">
              <h6 className="">{service.title}</h6>
              <div className="flex justify-between items-end mt-2">
                <div className="flex items-center  gap-3 mt-2">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${service.provider}`}
                    alt={service.provider}
                    className="w-7 h-7 rounded-full border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {service.provider}
                    </p>
                    <p className="text-gray-600  text-[12px] flex items-center gap-1">
                      <FaMapMarkerAlt className="text-blue-500" />
                      {service.location}
                    </p>
                  </div>
                </div>
                <div>
                  <button className=" bg-gray-200/80 text-gray-700 text-[12px] font-medium py-1 px-2  rounded-md hover:bg-[var(--primary)] hover:text-white transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFavoritePage;
