"use client";

import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

import NoFoundData from "@/components/shared/NoFoundData";
import AdminBookingTable from "./_components/AdminBookingTable";
import { useAdminBooking } from "@/hooks/admin/useAdminBooking";
import Loader from "@/components/shared/Loader";

const BookingPage = () => {
  const { allData, setAllData, allStatusData, setAllStatusData } =
    useAdminBooking();
  const { loading, setLoading } = useAppContext();
  const pageSize = 10;

  const getPaymentStatusFromStatus = (statusId) => {
    switch (statusId) {
      case 1:
        return "Pending";
      case 2:
        return "Inprogress";
      case 3:
        return "Completed";
      case 4:
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  const updateBookingStatus = async (bookingId, statusId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}booking/updatestatus/${bookingId}/${statusId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok && result.message) {
        const newPaymentStatus = getPaymentStatusFromStatus(statusId);

        setAllData((prev) =>
          prev.map((item) =>
            item.id === bookingId
              ? {
                  ...item,
                  statusId: statusId,
                  paymentStatus: newPaymentStatus,
                }
              : item
          )
        );

        toast.success(result.message);
      } else {
        toast.error(result.error || "Failed to update status");
        setLoading(false);
        setAllStatusData([]);
      }
    } catch (error) {
      setLoading(false);
      toast.error(result.error || "Failed to update status");
      setAllStatusData([]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Booking List </h4>
      </div>
      {/* table */}
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <AdminBookingTable
          allData={allData}
          setAllData={setAllData}
          pageSize={pageSize}
          updateBookingStatus={updateBookingStatus}
          allStatusData={allStatusData}
        />
      )}
    </div>
  );
};

export default BookingPage;
