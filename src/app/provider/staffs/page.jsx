"use client";
import AddStaffModal from "@/app/provider/staffs/_components/AddStaffModal";
import { FaPlus } from "react-icons/fa";
import ProviderStaffsTable from "./_components/ProviderStaffsTable";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import { useAppContext } from "@/context/AppContext";
import { useProviderStaff } from "@/hooks/provider/useProviderStaff";
import StaffDetailsModal from "./_components/StaffDetailsModal";

const StaffsPage = () => {
  const { loading, isModalOpen, setIsModalOpen, isDetailsModalOpen } =
    useAppContext();
  const { allData, setAllData, saveData } = useProviderStaff();
  const pageSize = 10;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Service Man</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--dark) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Service Man
        </button>
      </div>
      {/* table */}

      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <ProviderStaffsTable
          allData={allData}
          setAllData={setAllData}
          pageSize={pageSize}
        />
      )}

      {isModalOpen && <AddStaffModal onSubmit={saveData} />}
      {isDetailsModalOpen && <StaffDetailsModal />}
    </div>
  );
};

export default StaffsPage;
