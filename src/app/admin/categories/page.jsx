"use client";
import AllCategories from "@/app/admin/categories/_components/AllCategories";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import { useAppContext } from "@/context/AppContext";
import { useCategory } from "@/hooks/admin/useCategory";
import React from "react";
import { FaPlus } from "react-icons/fa";
import AddCategoryModal from "./_components/AddCategoryModal";

const CategoriesPage = () => {
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveData, handleFeaturedToggle } = useCategory();
  const pageSize = 10;
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4> Categories</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Category
        </button>
      </div>
      {/* table */}
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <AllCategories
          allData={allData}
          setAllData={setAllData}
          pageSize={pageSize}
          handleFeaturedToggle={handleFeaturedToggle}
        />
      )}

      {isModalOpen && <AddCategoryModal onSubmit={saveData} />}
    </div>
  );
};

export default CategoriesPage;
