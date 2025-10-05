import ServiceAddForm from "@/components/admin/service/ServiceAddForm";
import ServiceSteps from "@/components/admin/service/ServiceSteps";

const AddServicePage = () => {
  return (
    <div className="">
      <h4 className="mb-5">Add Service - Service Information</h4>
      <ServiceSteps />
      <ServiceAddForm />
    </div>
  );
};

export default AddServicePage;
