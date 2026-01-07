import { useAppContext } from "@/context/AppContext";
import { useProviderStaff } from "@/hooks/provider/useProviderStaff";
import {
  MdAssignmentTurnedIn,
  MdPendingActions,
  MdCancel,
} from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";

const StaffDetailsModal = () => {
  const { onClose } = useAppContext();
  const { detailsData } = useProviderStaff();

  const stats = [
    {
      title: "Assigned Bookings",
      value: detailsData?.assignedBooking ?? 0,
      icon: <MdAssignmentTurnedIn size={28} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Ongoing Bookings",
      value: detailsData?.ongoingBooking ?? 0,
      icon: <FaPlayCircle size={26} />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Completed Bookings",
      value: detailsData?.completedBooking ?? 0,
      icon: <MdPendingActions size={28} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Canceled Bookings",
      value: detailsData?.canceledBooking ?? 0,
      icon: <MdCancel size={28} />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-(--primary) px-6 py-4 ">
          <h6 className="text-lg font-semibold text-center  ">
            Booking Details
          </h6>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 p-6">
          {stats.map((item) => (
            <div
              key={item.title}
              className={`rounded-xl p-4 ${item.bg} flex items-center justify-between`}
            >
              <div>
                <p className="text-sm text-gray-600">{item.title}</p>
                <h4 className={`text-2xl font-bold ${item.text}`}>
                  {item.value}
                </h4>
              </div>
              <div className={`${item.text}`}>{item.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsModal;
