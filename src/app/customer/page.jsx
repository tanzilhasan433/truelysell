"use client";

import OrderEstimation from "@/components/customer/customerdashboard/OrderEstimation";
import RecentBooking from "@/components/customer/customerdashboard/RecentBooking";
import RecentTransaction from "@/components/customer/customerdashboard/RecentTransaction";

const CustomerDashboardPage = () => {
  return <div><h5 className="text-3xl font-bold text-slate-900 ">Dashboard</h5> 
        <OrderEstimation  />
    <div className="flex">
      <div>
          <h5 className="text-xl font-bold text-slate-900 text-center">Recent Transaction</h5> 
          <RecentTransaction />
      </div>
      <div>
            <h5 className="text-xl font-bold text-slate-900 text-center">
            Recent Booking
          </h5>
            <RecentBooking />  
      </div>
    </div>
  </div>;
};

export default CustomerDashboardPage;
