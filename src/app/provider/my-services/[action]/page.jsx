"use client";
import ServiceAddForm from "@/app/admin/services/_components/ServiceAddForm";
import { use } from "react";

const AddServicePage = ({ params, searchParams }) => {
  const { action } = use(params);
  const { id } = use(searchParams);
  const isEditMode = action === "edit";
  return (
    <div className="">
      <h4 className="mb-5">Add Service - Service Information</h4>

      <ServiceAddForm isEditMode={isEditMode} id={id} />
    </div>
  );
};

export default AddServicePage;
