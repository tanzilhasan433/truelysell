import { useForm } from "react-hook-form";

const AddCityModal = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      State: "",
      countryName: "",
      cityName: "",
    },
  });

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5 lg:h-[300px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h6 className="text-lg font-semibold mx-auto">Add State</h6>
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
          {/* Name */}
          <select
            {...register("countryName")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 "
          >
            <option value="" className="text-sm  ">
              Select Country
            </option>
            <option value="us">United State</option>
            <option value="india">India</option>
          </select>
          <select
            {...register("state")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-500 "
          >
            <option value="" className="text-sm  ">
              Select State
            </option>
            <option value="us">United State</option>
            <option value="india">India</option>
          </select>
          <input
            type="text"
            placeholder="City"
            {...register("cityName")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
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
              className="px-4 py-2 bg-[var(--primary-blue)] text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCityModal;
