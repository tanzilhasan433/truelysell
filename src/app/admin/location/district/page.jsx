"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import DistrictComponent from "@/components/admin/location/DistrictComponent";
import { useAppContext } from "@/context/AppContext";

const LocationDistrictPage = () => {
  const { loading, setLoading } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [allDivisionData, setAllDivisionData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  const pageSize = 10;

  const getAllDivisions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getdivisions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok && Array.isArray(result?.data)) {
        setAllDivisionData(result.data || []);

        if (result.data.length > 0 && !activeTab) {
          setActiveTab(result.data[0].id);
        }
      } else {
        setAllDivisionData([]);
      }
    } catch {
      setAllDivisionData([]);
    } finally {
      setLoading(false);
    }
  };

  const getDistricts = async (divisionId, page = 1) => {
    if (!divisionId) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}district/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Id&SortDirection=desc&PageSize=${pageSize}&DivisionId=${divisionId}`,
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

  const handleDistrict = async (data) => {
    const isEditing = !!selectedId;

    const payload = {
      NameEn: data.NameEn,
      NameBn: data.NameBn,
      DivisionId: data.DivisionId,
    };

    if (isEditing) payload.Id = selectedId;

    const endpoint = isEditing
      ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}district/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}district/create`;

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
        toast.success(
          isEditing
            ? "District updated successfully"
            : "District created successfully"
        );

        setIsModalOpen(false);
        setSelectedId(null);

        setActiveTab(Number(payload.DivisionId));
        getDistricts(payload.DivisionId, currentPage);
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllDivisions();
  }, []);

  useEffect(() => {
    if (activeTab) getDistricts(activeTab, currentPage);
  }, [activeTab, currentPage]);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4 className="text-lg font-semibold text-gray-800">District</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add District
        </button>
      </div>

      {/* ✅ Dynamic Tabs */}
      <nav className="flex space-x-6 border-b border-gray-200 overflow-x-auto">
        {allDivisionData.map((division) => (
          <button
            key={division.id}
            onClick={() => {
              setActiveTab(Number(division.id));
              setCurrentPage(1);
            }}
            className={`relative py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
              activeTab === division.id
                ? "text-(--primary-blue)"
                : "text-gray-600 hover:text-(--primary-blue)"
            }`}
          >
            {division.name}
            {activeTab === division.id && (
              <span className="absolute left-0 -bottom-px w-full h-0.5 bg-(--primary-blue) rounded"></span>
            )}
          </button>
        ))}
      </nav>

      {/* ✅ Tab Content */}
      <div className="mt-4">
        <DistrictComponent
          allData={allData}
          setAllData={setAllData}
          selectedId={selectedId}
          handleDistrict={handleDistrict}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          totalRecords={totalRecords}
          currentPage={currentPage}
          setIsModalOpen={setIsModalOpen}
          setSelectedId={setSelectedId}
          isModalOpen={isModalOpen}
          loading={loading}
          allDivisionData={allDivisionData}
        />
      </div>
    </div>
  );
};

export default LocationDistrictPage;
