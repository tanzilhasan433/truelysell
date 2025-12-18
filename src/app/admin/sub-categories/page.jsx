"use client";

import { FaPlus } from "react-icons/fa";
import AllSubCategories from "@/app/admin/sub-categories/_components/AllSubCategories";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import { useAppContext } from "@/context/AppContext";
import { useSubCategory } from "@/hooks/admin/useSubCategory";
import AddSubCategoryModal from "./_components/AddSubCategoryModal";

const SubCategoriesPage = () => {
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveData } = useSubCategory();
  const pageSize = 10;

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Sub Categories</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Sub Category
        </button>
      </div>
      {/* table */}
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <AllSubCategories
          allData={allData}
          setAllData={setAllData}
          pageSize={pageSize}
        />
      )}

      {isModalOpen && <AddSubCategoryModal onSubmit={saveData} />}
    </div>
  );
};

export default SubCategoriesPage;
