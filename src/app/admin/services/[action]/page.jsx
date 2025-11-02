"use client";
import ServiceAddForm from "@/components/admin/service/ServiceAddForm";
import { use } from "react";
// import ServiceSteps from "@/components/admin/service/ServiceSteps";

const AddServicePage = ({ params, searchParams }) => {
  const { action } = use(params);
  const { id } = use(searchParams);
  const isEditMode = action === "edit";
  return (
    <div className="">
      <h4 className="mb-5">Add Service - Service Information</h4>
      {/* <ServiceSteps /> */}
      <ServiceAddForm isEditMode={isEditMode} id={id} />
    </div>
  );
};

export default AddServicePage;
