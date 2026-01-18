"use client";
import AddCouponModal from "@/app/provider/coupons/_components/AddCouponModal";
import DeleteButton from "@/components/shared/DeleteButton";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { couponsData } from "@/data/json/coupons";
import { useProviderCoupon } from "@/hooks/provider/useProviderCoupon";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const ProviderCouponsPage = () => {
  const {
    loading,
    isModalOpen,
    setIsModalOpen,
    setSelectedId,
    currentPage,
    setCurrentPage,
    totalRecords,
  } = useAppContext();
  const { allData, setAllData, saveData } = useProviderCoupon();
  const pageSize = 10;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Coupons</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--dark) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Coupon
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <div className="mb-10">
          <div className="overflow-x-auto">
            <table className="max-w-7xl w-full  text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
                <tr>
                  <th className="py-5 px-3">Name</th>
                  <th className="py-5 px-3">Code </th>
                  <th className="py-5 px-3">Type</th>
                  <th className="py-5 px-3">Discount</th>
                  <th className="py-5 px-3">Limit</th>
                  <th className="py-5 px-3">used</th>
                  <th className="py-5 px-3">valid Date</th>
                  <th className="py-5 px-3">Service name</th>
                  <th className="py-5 px-3">Status</th>
                  <th className="py-5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {allData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-3">{item.name}</td>
                    <td className="py-4 px-3">{item.couponCode}</td>
                    <td className="py-4 px-3">{item.couponType}</td>
                    <td className="py-4 px-3">{item.discountValue}</td>
                    <td className="py-4 px-3">{item.usageLimit}</td>
                    <td className="py-4 px-3">{item.usedCount}</td>
                    <td className="py-4 px-3">{item.validUntil}</td>
                    <td className="py-4 px-3">{item.serviceName}</td>

                    <td className="py-4 px-3 font-medium">
                      {" "}
                      <button
                        className={`${
                          item.status === "Active"
                            ? "text-green-500 bg-green-100 py-1 rounded px-2"
                            : "text-red-500 bg-red-100 px-2 py-1 rounded"
                        }`}
                      >
                        {" "}
                        {item.status}
                      </button>
                    </td>

                    <td className="py-4 px-2 font-medium">
                      <div className=" flex items-center gap-2">
                        {" "}
                        <button
                          onClick={() => {
                            setSelectedId(item.id);
                            setIsModalOpen(true);
                          }}
                          className="bg-gray-200 text-gray-500 hover:bg-(--primary) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                        >
                          <FiEdit size={25} />
                        </button>
                        <DeleteButton
                          endpoint={`provider-coupon/delete/${item?.id}`}
                          type="coupon"
                          onComplete={(status) => {
                            if (status) {
                              setAllData((prev) =>
                                prev.filter((b) => b.id !== item.id)
                              );
                            } else {
                            }
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalRecords={totalRecords}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {isModalOpen && <AddCouponModal onSubmit={saveData} />}
    </div>
  );
};

export default ProviderCouponsPage;
