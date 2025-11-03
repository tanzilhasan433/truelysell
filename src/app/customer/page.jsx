"use client";

import OrderEstimation from "@/components/customer/customerdashboard/OrderEstimation";
import RecentBooking from "@/components/customer/customerdashboard/RecentBooking";
import RecentTransaction from "@/components/customer/customerdashboard/RecentTransaction";

const CustomerDashboardPage = () => {
  return (
    <div>
      <h5 className="text-3xl font-bold text-slate-900 ">Dashboard</h5>
      <OrderEstimation />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-10">
        <div className="lg:col-span-5">
          <h5 className="text-xl font-bold text-slate-900 ">
            Recent Transaction
          </h5>
          <RecentTransaction />
        </div>
        <div className="lg:col-span-7">
          <h5 className="text-xl font-bold text-slate-900 ">Recent Booking</h5>
          <RecentBooking />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
