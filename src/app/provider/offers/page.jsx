"use client";
import AddOfferModal from "@/app/provider/offers/_components/AddOfferModal";
import DeleteButton from "@/components/shared/DeleteButton";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";

import { offer } from "@/data/json/offer";
import { useProviderOffer } from "@/hooks/provider/useProviderOffer";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

const ProviderOffersPage = () => {
  const {
    loading,
    isModalOpen,
    setIsModalOpen,
    setSelectedId,
    currentPage,
    setCurrentPage,
    totalRecords,
  } = useAppContext();
  const { allData, setAllData, saveData } = useProviderOffer();
  const pageSize = 10;

  console.log("allData:", allData);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Offers</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--dark) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Offer
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <div className="mb-10">
          <div className="overflow-x-auto">
            <table className="max-w-7xl w-full   text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-xs uppercase">
                <tr>
                  <th className="py-5 px-3">Service</th>
                  <th className="py-5 px-3">Amount </th>
                  <th className="py-5 px-3">Offer</th>
                  <th className="py-5 px-3">Offer price</th>
                  <th className="py-5 px-3">Date</th>
                  <th className="py-5 px-3">End Date</th>
                  <th className="py-5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {offer.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-1">
                        <img
                          src={item.img1}
                          alt=""
                          className="w-8 h-8 rounded"
                        />
                        {item.service}
                      </div>
                    </td>
                    <td className="py-4 px-3">{item.amount}</td>
                    <td className="py-4 px-3">{item.offer}</td>
                    <td className="py-4 px-3">{item.offerprice}</td>
                    <td className="py-4 px-3">{item.date}</td>
                    <td className="py-4 px-3">{item.enddate}</td>

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
                          endpoint={`provider-offer/delete/${item?.id}`}
                          type="offer"
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

      {isModalOpen && <AddOfferModal onSubmit={saveData} />}
    </div>
  );
};

export default ProviderOffersPage;
