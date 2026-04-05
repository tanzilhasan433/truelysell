import Image from "next/image";
import { FiCalendar } from "react-icons/fi";

const bookingsData = [
  {
    id: 1,
    service: "Computer Repair",
    date: "10 Nov 2022",
    user: {
      name: "John Smith",
      email: "john@gmail.com",
      avatar: "/images/avatar-john.jpg",
    },
    serviceImage: "/images/service-computer.jpg",
  },
  {
    id: 2,
    service: "Car Repair",
    date: "15 Oct 2022",
    user: {
      name: "Timothy",
      email: "timothy@gmail.com",
      avatar: "/images/avatar-timothy.jpg",
    },
    serviceImage: "/images/service-car.jpg",
  },
  {
    id: 3,
    service: "Interior Designing",
    date: "18 Oct 2022",
    user: {
      name: "Jordan",
      email: "jordan@gmail.com",
      avatar: "/images/avatar-jordan.jpg",
    },
    serviceImage: "/images/service-interior.jpg",
  },
  {
    id: 4,
    service: "Steam Car Wash",
    date: "28 Oct 2022",
    user: {
      name: "Armand",
      email: "armand@gmail.com",
      avatar: "/images/avatar-armand.jpg",
    },
    serviceImage: "/images/service-carwash.jpg",
  },
  {
    id: 5,
    service: "House Cleaning",
    date: "10 Nov 2022",
    user: {
      name: "Joseph",
      email: "joseph@gmail.com",
      avatar: "/images/avatar-joseph.jpg", // ADD YOUR IMAGE HERE
    },
    serviceImage: "/images/service-cleaning.jpg", // ADD YOUR IMAGE HERE
  },
  {
    id: 6,
    service: "Car Repair",
    date: "10 Nov 2022",
    user: {
      name: "Adrian",
      email: "jadrian@gmail.com",
      avatar: "/images/avatar-adrian.jpg",
    },
    serviceImage: "/images/service-car-2.jpg",
  },
];

export default function RecentBooking() {
  return (
    <>
      <main className="min-h-screen mt-5 overflow-x-auto">
        <div className=" w-full max-w-5xl bg-white border border-gray-200 rounded mx-auto">
          <div className="space-y-4">
            {bookingsData.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function BookingItem({ booking }) {
  const { service, date, user, serviceImage } = booking;

  return (
    <div className=" flex flex-col md:grid md:grid-cols-[2fr_1.5fr_auto] md:items-center gap-4 md:gap-6 p-3 border-b border-gray-200 last:border-b-0">
      {/* --- 1. Service Info --- */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <Image
            src={serviceImage}
            alt={""}
            width={64}
            height={48}
            className="rounded-md object-cover w-10 h-10"
          />
        </div>

        <div className="min-w-0">
          <p className="text-base font-medium text-slate-800 ">{service}</p>
          <p className="text-[12px] font-medium text-gray-400 flex items-center gap-1.5 mt-1">
            <FiCalendar className="flex-shrink-0" />
            <span>{date}</span>
          </p>
        </div>
      </div>

      {/* --- 2. User Info --- */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Image
            src={user.avatar}
            alt={""}
            width={40} // w-10
            height={40} // h-10
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-base font-medium text-slate-800">{user.name}</p>
          <p className="text-[12px] font-medium text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* --- 3. Action Button --- */}
      <button
        className="
          bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-[12px] font-medium 
          hover:bg-gray-200 transition-colors
          focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50
          w-full md:w-auto md:justify-self-end
        "
      >
        Cancel
      </button>
    </div>
  );
}
