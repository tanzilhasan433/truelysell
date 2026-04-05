"use client";

import { useAppContext } from "@/context/AppContext";
import { FaPlus } from "react-icons/fa";
import TestimonialTable from "./_components/TestimonialTable";
import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import { useAdminTestimonial } from "@/hooks/admin/useAdminTestimonial";
import TestimonialModal from "./_components/TestimonialModal";

const TestimonialsPage = () => {
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveData } = useAdminTestimonial();
  const pageSize = 10;

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Testimonials</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Testimonial
        </button>
      </div>
      {/* table */}
      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <TestimonialTable
          allData={allData}
          setAllData={setAllData}
          pageSize={pageSize}
        />
      )}

      {isModalOpen && <TestimonialModal onSubmit={saveData} />}
    </div>
  );
};

export default TestimonialsPage;
