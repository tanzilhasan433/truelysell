"use client";

import { FiArrowRight } from "react-icons/fi";

const dataServices = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=60&h=60",
    name: "Computer Repair",
    category: "Computer",
    amount: "$80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=60&h=60",
    name: "Car Repair Services",
    category: "Automobile",
    amount: "$50",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=60&h=60",
    name: "Car Wash",
    category: "Automobile",
    amount: "$14",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=60&h=60",
    name: "House Cleaning",
    category: "Cleaning",
    amount: "$100",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=60&h=60",
    name: "Interior",
    category: "Cleaning",
    amount: "$50",
  },
];

const dataProviders = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Robert",
    email: "robert@example.com",
    phone: "+1 347-679-8275",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sharonda",
    email: "sharonda@example.com",
    phone: "+1 570-621-248",
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "+1 646-957-0004",
  },
  {
    id: 4,
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    name: "Pricilla",
    email: "pricilla@example.com",
    phone: "+1 614-915-8101",
  },
  {
    id: 5,
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    name: "James",
    email: "james@example.com",
    phone: "+1 918-543-3702",
  },
];

const DashboardTopProviderTables = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">
      {/* Top Services */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200/80">
        <div className="flex justify-between items-center mb-5">
          <h6 className="font-semibold text-gray-800">Top Services</h6>
          <button className="flex items-center text-blue-600 text-sm font-medium hover:underline">
            View All <FiArrowRight className="ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
              <tr>
                <th className="py-5 px-3">#</th>
                <th className="py-5 px-3">Service</th>
                <th className="py-5 px-3">Category</th>
                <th className="py-5 px-3">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {dataServices.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-3">{item.id}</td>
                  <td className="py-4 px-3 flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    {item.name}
                  </td>
                  <td className="py-4 px-3">{item.category}</td>
                  <td className="py-4 px-3 font-medium">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Providers */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200/80">
        <div className="flex justify-between items-center mb-5">
          <h6 className="font-semibold text-gray-800">Top Providers</h6>
          <button className="flex items-center text-blue-600 text-sm font-medium hover:underline">
            View All <FiArrowRight className="ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
              <tr>
                <th className="py-5 px-3">#</th>
                <th className="py-5 px-3">Provider Name</th>
                <th className="py-5 px-3">Email</th>
                <th className="py-5 px-3">Phone</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {dataProviders.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-3">{item.id}</td>
                  <td className="py-4 px-3 flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {item.name}
                  </td>
                  <td className="py-4 px-3">{item.email}</td>
                  <td className="py-4 px-3">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopProviderTables;
