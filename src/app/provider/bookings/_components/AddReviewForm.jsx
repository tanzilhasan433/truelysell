import { useAppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";

const AddReviewForm = ({ isOpen, onClose, onSubmit, item }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
      review: "",
    },
  });
  const rating = watch("rating");
  const { selectedId } = useAppContext();
  const isEditMode = Boolean(selectedId);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-y-auto ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h6 className="text-lg font-semibold mx-auto">Write A Review</h6>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-2 mb-5">
          <div>
            <img
              src={item.img}
              alt={item.service}
              className="w-full h-16 object-cover rounded"
            />
          </div>
          <div>
            <p className="font-medium mb-1">{item.service}</p>
            <p className="text-gray-800 text-sm">{item.location}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1  gap-5 justify-center">
            {/* rating */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-base text-gray-800">
                  Rate The Service
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={24}
                      className={`cursor-pointer transition ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() =>
                        setValue("rating", star, { shouldValidate: true })
                      }
                    />
                  ))}
                </div>
              </div>
              <input
                type="hidden"
                {...register("rating", {
                  required: "Rating is required",
                  min: { value: 1, message: "Rating is required" },
                })}
              />
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-800">
                Write your Review
              </label>
              <textarea
                type="text"
                rows={3}
                {...register("review", {
                  required: !isEditMode && "Review is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-1"
              />
              {errors.review && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.review.message}
                </p>
              )}
            </div>
          </div>

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
              className="px-4 py-2 bg-(--dark) text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewForm;
