import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAppContext } from "@/context/AppContext";
import StatCard from "./StatCard";

const CustomerDetails = ({ item }) => {
  const { onClose } = useAppContext();
  const chartData = [
    {
      name: "Pending",
      value: item?.pendingBooking || 0,
      color: "#3B82F6",
    },
    {
      name: "Accepted",
      value: item?.acceptedBooking || 0,
      color: "#22C55E",
    },
    {
      name: "Ongoing",
      value: item?.ongoingBooking || 0,
      color: "#F59E0B",
    },
    {
      name: "Completed",
      value: item?.completedBooking || 0,
      color: "#10B981",
    },
    {
      name: "Canceled",
      value: item?.canceledBooking || 0,
      color: "#8B5CF6",
    },
  ];

  const totalBookings = chartData.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="fixed inset-0 z-50 flex justify-center  bg-black/50 overflow-y-auto ">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto sidebar-scroll">
        {/* Header */}
        <div className="relative  px-6 pb-6 ">
          <h6 className="text-lg font-semibold text-white text-center">
            Booking Details
          </h6>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-0  bg-gray-50 p-2 rounded-full w-6 h-6 flex justify-center items-center "
          >
            ✕
          </button>
        </div>
        {/*  */}
        <div className="space-y-5">
          <div className="flex  flex-col w-full gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 ">
              <StatCard
                title="Total Booking Placed"
                value={item?.totalBookingPlaced}
                border="border-blue-200"
                text="text-blue-600"
              />
              <StatCard
                title="Wallet Balance"
                value={`৳${item?.walletBalance || 0}`}
                border="border-orange-200"
                text="text-orange-500"
              />
              <StatCard
                title="Total Booking Amount"
                value={`৳${item?.totalBookingAmount || 0}`}
                border="border-green-200"
                text="text-green-600"
              />
              <StatCard
                title="Loyalty Point"
                value={item?.loyaltyPoint || 0}
                border="border-red-200"
                text="text-red-500"
              />
            </div>
            <div className="border border-gray-200 rounded-xl bg-white p-5 flex flex-col justify-between ">
              <h5 className="text-sm font-medium text-center mb-4">
                Booking item
              </h5>

              <div className="relative h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={35}
                      outerRadius={55}
                    >
                      {chartData.map((item, index) => (
                        <Cell key={index} fill={item.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs text-gray-500">
                    {" "}
                    {totalBookings} Bookings
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
                {chartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default CustomerDetails;
