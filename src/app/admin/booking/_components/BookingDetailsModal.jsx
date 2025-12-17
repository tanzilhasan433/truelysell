import { useAppContext } from "@/context/AppContext";

const BookingDetailsModal = ({ item, allStatusData, updateBookingStatus }) => {
  const { onClose } = useAppContext();
  console.log("item", item);
  return (
    <div className="fixed inset-0 z-50 flex justify-center lg:items-center bg-black/50 ">
      <div
        className=" w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  bg-white 
       overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">Booking Details</h6>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        {/* details */}
        <p className="flex  items-center gap-3  text-(--primary-blue) font-medium text-sm mb-3">
          <span>Booking</span> {item.bookingCode}
        </p>
        <div className="grid lg:grid-cols-2  justify-center gap-5">
          {/* booking details */}

          <div className="space-y-2">
            <p className="flex flex-col   text-sm">
              <span>Booking Time:</span> {item.bookingTime}
            </p>
            <p className="flex flex-col   text-sm">
              <span>Schedule Time:</span> {item.scheduleTime}
            </p>
          </div>
          {/* user details */}
          <div>
            <p className="flex flex-col   text-sm">
              <span>User Name:</span> {item.userName}
            </p>
            <p className="flex flex-col   text-sm">
              <span>Provider Name:</span> {item.providerName}
            </p>
          </div>
          {/* payment status */}
          <div>
            <p>Update Payment Status</p>
            <select
              onChange={(e) =>
                updateBookingStatus(item.id, Number(e.target.value))
              }
              className=" rounded-md text-gray-600 text-xs border border-gray-300 p-1  focus:outline-none "
            >
              <option value="" className="">
                Select Status
              </option>
              {allStatusData &&
                allStatusData.length > 0 &&
                allStatusData.map((statusItem) => (
                  <option
                    key={statusItem.id}
                    value={statusItem.id}
                    selected={statusItem.id === item.statusId}
                  >
                    {statusItem.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
