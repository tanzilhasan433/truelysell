import CustomerReviewCard from "@/components/customer/reviews/CustomerReviewCard";
import React from "react";
import { RiSortDesc } from "react-icons/ri";
const CustomerReviewsPage = () => {
  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center ">
        <h5 className="text-xl font-bold"> Customer Reviews</h5>
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <select className="p-2 border border-gray-300 rounded-md">
            <option>Recently Added</option>
            <option>Top Client</option>
            <option>Features</option>
          </select>


          {/* Filter Icon */}
          <button className="p-2 bg-gray-200 rounded-md">
            
            <RiSortDesc />
          </button>
        </div>
        
      </div>
      <CustomerReviewCard />
    </div>
  );
};

export default CustomerReviewsPage;
