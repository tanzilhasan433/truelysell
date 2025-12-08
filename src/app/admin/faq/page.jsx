"use client";

import FaqModal from "@/app/admin/faq/_components/FaqModal";
import FaqTable from "./_components/FaqTable";
import { useAppContext } from "@/context/AppContext";
import { FaPlus } from "react-icons/fa";
import NoFoundData from "@/components/shared/NoFoundData";
import Loader from "@/components/shared/Loader";
import { useAdminFaq } from "@/hooks/admin/useAdminFaq";

const Faq = () => {
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveData } = useAdminFaq();
  const pageSize = 10;

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>FAQ’s</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add FAQ
        </button>
      </div>
      {/* table */}
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <FaqTable
          allData={allData}
          setAllData={setAllData}
          pageSize={pageSize}
        />
      )}

      {isModalOpen && <FaqModal onSubmit={saveData} />}
    </div>
  );
};

export default Faq;
