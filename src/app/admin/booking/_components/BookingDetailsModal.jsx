import { useAppContext } from "@/context/AppContext";

const BookingDetailsModal = ({ item, allStatusData, updateBookingStatus }) => {
  const { onClose } = useAppContext();
  console.log("item", item);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-linear-to-r from-(--primary-blue) to-indigo-600 px-6 py-4">
          <h6 className="text-lg font-semibold text-white text-center">
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

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Booking Code */}
          <p className="flex items-center justify-center gap-2 text-sm font-medium text-(--primary-blue) bg-blue-50 rounded-lg py-2">
            <span className="text-gray-600">Booking:</span>
            <span className="font-semibold">{item.bookingCode}</span>
          </p>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Time Info */}
            <div className="rounded-xl border border-gray-200 p-4 space-y-3">
              <h6 className="text-sm font-semibold text-gray-700">
                Time Information
              </h6>

              <p className="flex flex-col text-sm whitespace-pre-line">
                <span className="text-gray-500">Booking Time</span>
                <span className="font-medium text-gray-800">
                  {item.bookingTime}
                </span>
              </p>

              <p className="flex flex-col text-sm whitespace-pre-line">
                <span className="text-gray-500">Schedule Time</span>
                <span className="font-medium text-gray-800">
                  {item.scheduleTime}
                </span>
              </p>
            </div>

            {/* User Info */}
            <div className="rounded-xl border border-gray-200 p-4 space-y-3">
              <h6 className="text-sm font-semibold text-gray-700">
                User Information
              </h6>

              <p className="flex flex-col text-sm">
                <span className="text-gray-500">User Name</span>
                <span className="font-medium text-gray-800">
                  {item.userName}
                </span>
              </p>

              <p className="flex flex-col text-sm">
                <span className="text-gray-500">Provider Name</span>
                <span className="font-medium text-gray-800">
                  {item.providerName}
                </span>
              </p>
            </div>

            {/* Payment Status */}
            <div className="md:col-span-2 rounded-xl border border-gray-200 p-4">
              <h6 className="text-sm font-semibold text-gray-700 mb-2">
                Update Payment Status
              </h6>

              <select
                onChange={(e) =>
                  updateBookingStatus(item.id, Number(e.target.value))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={item.statusId}
              >
                <option value="">Select Status</option>
                {allStatusData?.map((statusItem) => (
                  <option key={statusItem.id} value={statusItem.id}>
                    {statusItem.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
