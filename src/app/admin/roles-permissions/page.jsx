"use client";

import AddRoleModal from "@/app/admin/roles-permissions/_components/AddRoleModal";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import { useAppContext } from "@/context/AppContext";
import { useAdminRolePermission } from "@/hooks/admin/useAdminRolePermission";
import { FaPlus } from "react-icons/fa";
import RolesTable from "./_components/RolesTable";

const RolesPermissionsPage = () => {
  const pageSize = 10;
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveData } = useAdminRolePermission();

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-10">
          <h4>Roles & Permission</h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FaPlus size={15} /> Add Role
          </button>
        </div>
        {/* table */}
        {loading ? (
          <Loader />
        ) : allData && allData.length < 0 ? (
          <NoFoundData />
        ) : (
          <RolesTable
            allData={allData}
            setAllData={setAllData}
            pageSize={pageSize}
          />
        )}

        {isModalOpen && <AddRoleModal onSubmit={saveData} />}
      </div>
    </>
  );
};

export default RolesPermissionsPage;
