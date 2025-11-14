"use client";

import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import AddUpazilaModal from "@/components/admin/location/AddUpazilaModal";
import DeleteButton from "@/components/shared/DeleteButton";
import { FiEdit } from "react-icons/fi";
import { FadeLoader } from "react-spinners";
import Pagination from "@/components/shared/Pagination";

const LocationUpazilaPage = ({ searchParams }) => {
  const { id } = use(searchParams);

  const { loading, setLoading } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [allDistrictData, setAllDistricts] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [disId, setDisId] = useState(id);
  const [zilaName, setZilaName] = useState("");

  const pageSize = 10;

  const getAllDistricts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getdistricts`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      const result = await response.json();
      setAllDistricts(result.data || []);
    } catch {
      setAllDistricts([]);
    } finally {
      setLoading(false);
    }
  };

  const getUpazila = async (Id, page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}upazila/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Id&SortDirection=desc&PageSize=${pageSize}&DistrictId=${
          disId ? disId : Id
        }`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setAllData(result?.data || []);
        setZilaName(result?.data[0].districtNameEn);
        setTotalRecords(result?.numberOfRecords || 0);
      } else {
        setAllData([]);
        setTotalRecords(0);
      }
    } catch {
      setAllData([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  };

  const handleUpazila = async (data) => {
    const isEditing = !!selectedId;

    const payload = {
      NameEn: data.NameEn,
      NameBn: data.NameBn,
      DistrictId: data.DistrictId,
    };

    if (isEditing) payload.Id = selectedId;

    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}upazila/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}upazila/create`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);

        setIsModalOpen(false);
        setSelectedId(null);
        getUpazila(payload.DistrictId, currentPage);
        setDisId(payload.DistrictId);
      } else {
        toast.error(result?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllDistricts();
  }, []);

  useEffect(() => {
    getUpazila(currentPage);
  }, [disId, currentPage]);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Upazila of {zilaName} district</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Upazila
        </button>
      </div>
      {/* table */}
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
          <div className="overflow-x-auto mb-5">
            {" "}
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
                <tr>
                  <th className="py-5 px-3">#</th>
                  <th className="py-5 px-3">Name ( English ) </th>
                  <th className="py-5 px-3">Name ( Bangla ) </th>
                  <th className="py-5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {allData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200/80 hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-3">{index + 1}</td>

                    <td className="py-4 px-3 ">{item.nameEn}</td>
                    <td className="py-4 px-3 ">{item.nameBn}</td>

                    <td className="py-4 px-2 font-medium">
                      <div className=" flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedId(item.id);
                            setIsModalOpen(true);
                          }}
                          className="bg-gray-200 text-gray-500 hover:bg-(--primary-blue) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                        >
                          <FiEdit size={25} />
                        </button>
                        <DeleteButton
                          endpoint={`upazila/delete/${item?.id}`}
                          type="upazila"
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

      <AddUpazilaModal
        isOpen={isModalOpen}
        onSubmit={handleUpazila}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        Id={selectedId}
        allDistrictData={allDistrictData}
      />
    </div>
  );
};

export default LocationUpazilaPage;
