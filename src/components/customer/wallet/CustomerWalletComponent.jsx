"use client";
// import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

export const transactions = [
  {
    type: "Wallet Topup",
    amount: "+$80",
    date: "07 Oct 2022 11:22:51",
    paymentType: "Paypal",
    status: "Completed",
  },
  {
    type: "Purchase",
    amount: "-$20",
    date: "06 Oct 2022 11:22:51",
    paymentType: "Paypal",
    status: "Completed",
  },
  {
    type: "Refund",
    amount: "+$40",
    date: "06 Oct 2022 11:22:51",
    paymentType: "Paypal",
    status: "Completed",
  },
  {
    type: "Wallet Topup",
    amount: "+$100",
    date: "28 Sep 2022 11:22:51",
    paymentType: "Paypal",
    status: "Completed",
  },
  {
    type: "Purchase",
    amount: "-$50",
    date: "07 Oct 2022 11:22:51",
    paymentType: "Paypal",
    status: "Completed",
  },
  {
    type: "Refund",
    amount: "+$60",
    date: "07 Oct 2022 11:22:51",
    paymentType: "Paypal",
    status: "Completed",
  },
];

const CustomerWalletComponent = () => {
  const [allData, setAllData] = useState(transactions);
  // const [totalRecords, setTotalRecords] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 10;
  const { loading, setLoading } = useAppContext();
  return (
    <div className="mt-10">
      {loading ? (
        <div className="flex justify-center items-center">
          <FadeLoader color="#4c40ed" />
        </div>
      ) : allData && allData.length < 0 ? (
        <div className="p-6 text-center text-gray-500">
          <p className="text-lg">No data Found</p>
        </div>
      ) : (
        <div className=" mb-10">
          <div className="overflow-x-auto  mb-5">
            <table className="container mx-auto min-w-screen lg:min-w-5xl text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
                <tr>
                  <th className="py-5 px-3">#</th>
                  <th className="py-5 px-3">Type</th>
                  <th className="py-5 px-3">Amount</th>
                  <th className="py-5 px-3">Date</th>
                  <th className="py-5 px-3">Payment Type</th>
                  <th className="py-5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {allData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-3">{index + 1}</td>
                    <td className="py-4 px-3">{item.type}</td>
                    <td className="py-4 px-3">{item.amount}</td>
                    <td className="py-4 px-3">{item.date}</td>
                    <td className="py-4 px-3">{item.paymentType}</td>

                    <td className={`py-4 px-3 font-medium `}>
                      <button
                        className={`${
                          item.status === "Completed"
                            ? "text-green-600 bg-green-100 p-2 rounded "
                            : item.status === "Pending"
                            ? "text-yellow-600 bg-yellow-100 p-2 rounded"
                            : item.status === "Inprogress"
                            ? "text-blue-600 bg-blue-100 p-2 rounded"
                            : "text-red-600 bg-red-100 p-2 rounded"
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <Pagination
            currentPage={currentPage}
            totalRecords={totalRecords}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          /> */}
        </div>
      )}
    </div>
  );
};

export default CustomerWalletComponent;
