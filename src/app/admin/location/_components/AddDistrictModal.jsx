import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddDistrictModal = ({
  isOpen,
  onClose,
  onSubmit,
  Id,
  allDivisionData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      NameEn: " ",
      NameBn: "",
    },
  });

  const isEditMode = Boolean(Id);
  const getSingleDivision = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}district/getdistrictsbyid/${Id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok && result.data) {
        const data = result.data;
        setValue("NameEn", data.nameEn || "");
        setValue("NameBn", data.nameBn || "");
        setValue("DivisionId", data.divisionId || "");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (Id) {
      getSingleDivision();
    } else {
      reset();
    }
  }, [Id, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h6 className="text-lg font-semibold mx-auto">
            {" "}
            {isEditMode ? "Edit District" : "Add District"}
          </h6>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="text-sm font-medium text-gray-800">Division</label>
          <select
            {...register("DivisionId")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 "
          >
            <option value="" className="text-sm  ">
              Select Division
            </option>
            {allDivisionData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <label className="text-sm font-medium text-gray-800">
            Division Name (English)
          </label>
          <input
            type="text"
            {...register("NameEn")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-2"
          />
          <label className="text-sm font-medium text-gray-800">
            Division Name (Bangla)
          </label>
          <input
            type="text"
            {...register("NameBn")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 text-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-(--primary-blue) text-white rounded-md"
            >
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDistrictModal;
