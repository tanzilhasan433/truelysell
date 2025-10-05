"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import Editor from "@/components/shared/Editor";
import { useAppContext } from "@/context/AppContext";
import { FaSave, FaTrash } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const ServiceAddForm = () => {
  const router = useRouter();

  const fileInputRef = useRef(null);
  const { user, userId, loading, setLoading } = useAppContext();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      services: [
        { additionalService: "", servicePrice: "", serviceDuration: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services", // must match defaultValues
  });

  const onSubmit = async (data) => {
    console.log("Form Data Submitted: ", data);
    // try {
    //   setLoading(true);

    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}service/`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${user ? user : ""}`,
    //       },
    //       body: JSON.stringify({
    //         ...data,
    //         userId: userId ?? "",
    //       }),
    //     }
    //   );

    //   if (response.ok) {
    //     toast.success("Service added successfully");
    //     router.push("/admin/services");
    //   } else {
    //     toast.error("Failed to add service. Please try again.");
    //   }
    // } catch {
    //   toast.error(
    //     "An error occurred while adding the service. Please try again."
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-36">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-[#FBFBFB]  pt-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Service Information</h6>
          <div className="border-b border-gray-200/80 my-6"></div>
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Provider */}
            <div>
              <label
                htmlFor="provider"
                className="block text-sm  text-gray-800"
              >
                Provider
              </label>
              <select
                id="provider"
                {...register("provider")}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select Provider
                </option>
                <option value="Arzena">Arzena</option>
              </select>
            </div>
            {/* sevice Title */}
            <div>
              <label
                htmlFor="serviceTitle"
                className="block text-sm  text-gray-800"
              >
                Title
              </label>
              <input
                id="serviceTitle"
                {...register("serviceTitle", {
                  required: "Service title is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.serviceTitle ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.serviceTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceTitle.message}
                </p>
              )}
            </div>
          </div>
          {/*  */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm  text-gray-800"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category")}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select Category
                </option>
                <option value="Arzena">Arzena</option>
              </select>
            </div>
            {/* sub category Title */}
            <div>
              <label
                htmlFor="subCategory"
                className="block text-sm  text-gray-800"
              >
                Sub Category
              </label>
              <select
                id="subCategory"
                {...register("subCategory")}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select Sub Category
                </option>
                <option value="Arzena">Arzena</option>
              </select>
            </div>
          </div>
          {/*  */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm  text-gray-800">
                Price
              </label>
              <input
                id="price"
                {...register("price", {
                  required: "pPrice is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>
            {/* duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm  text-gray-800"
              >
                Duration
              </label>
              <input
                id="duration"
                {...register("duration", {
                  required: "Duration is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>
          {/*  */}

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm  text-gray-800 mb-1"
            >
              Description
            </label>
            <Editor
              value={watch("description")}
              onChange={(content) => setValue("description", content)}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Service Information</h6>
          <div className="border-b border-gray-200/80 my-6"></div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid lg:grid-cols-3 gap-6 mb-6 relative"
            >
              {/* Additional Service */}
              <div>
                <label
                  htmlFor={`services[${index}].additionalService`}
                  className="block text-sm text-gray-800"
                >
                  Additional Service
                </label>
                <input
                  id={`services[${index}].additionalService`}
                  {...register(`services.${index}.additionalService`, {
                    required: "Additional Service is required",
                  })}
                  placeholder="Enter service"
                  className={`mt-1 block text-gray-800 w-full rounded-md border px-4 py-2 focus:outline-none ${
                    errors?.services?.[index]?.additionalService
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors?.services?.[index]?.additionalService && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.services[index].additionalService.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor={`services[${index}].servicePrice`}
                  className="block text-sm text-gray-800"
                >
                  Price
                </label>
                <input
                  id={`services[${index}].servicePrice`}
                  {...register(`services.${index}.servicePrice`, {
                    required: "Service Price is required",
                  })}
                  placeholder="Enter price"
                  className={`mt-1 block text-gray-800 w-full rounded-md border px-4 py-2 focus:outline-none ${
                    errors?.services?.[index]?.servicePrice
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors?.services?.[index]?.servicePrice && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.services[index].servicePrice.message}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor={`services[${index}].serviceDuration`}
                  className="block text-sm text-gray-800"
                >
                  Service Duration
                </label>
                <input
                  id={`services[${index}].serviceDuration`}
                  {...register(`services.${index}.serviceDuration`, {
                    required: "Service Duration is required",
                  })}
                  placeholder="Enter duration"
                  className={`mt-1 block text-gray-800 w-full rounded-md border px-4 py-2 focus:outline-none ${
                    errors?.services?.[index]?.serviceDuration
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors?.services?.[index]?.serviceDuration && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.services[index].serviceDuration.message}
                  </p>
                )}
              </div>

              {/* Remove button */}
              {index === 0 ? (
                " "
              ) : (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute -top-2 -right-2  text-gray-800 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <FaRegTrashCan />
                </button>
              )}
            </div>
          ))}
          {/* <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label
                htmlFor="additionalService"
                className="block text-sm  text-gray-800"
              >
                Additional Service
              </label>
              <input
                id="additionalService"
                {...register("additionalService", {
                  required: "Additional Service is required",
                })}
                placeholder="Enter  service"
                className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.additionalService
                    ? "border-red-500"
                    : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.additionalService && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.additionalService.message}
                </p>
              )}
            </div>{" "}
            <div>
              <label
                htmlFor="servicePrice"
                className="block text-sm  text-gray-800"
              >
                Price
              </label>
              <input
                id="servicePrice"
                {...register("servicePrice", {
                  required: "Service Price is required",
                })}
                placeholder="Enter Price"
                className={`mt-1 placeholder:text-sm  placeholder:text-sm block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.servicePrice && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.servicePrice.message}
                </p>
              )}
            </div>{" "}
            <div>
              <label
                htmlFor="serviceDuration"
                className="block text-sm  text-gray-800"
              >
                Service Duration
              </label>
              <input
                id="serviceDuration"
                {...register("serviceDuration", {
                  required: " Service Duration is required",
                })}
                placeholder="Enter Service Duration"
                className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.serviceDuration ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.serviceDuration && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceDuration.message}
                </p>
              )}
            </div>
          </div> */}
          <button
            className="flex items-center gap-1 text-sm"
            type="button"
            onClick={() =>
              append({
                additionalService: "",
                servicePrice: "",
                serviceDuration: "",
              })
            }
          >
            <span className="bg-[var(--primary-blue)] text-white p-1 h-5 w-5 rounded-full flex items-center justify-center ">
              +
            </span>{" "}
            <span className="text-[var(--primary-blue)] font-semibold">
              Add Additional Service
            </span>
          </button>
        </div>
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Video</h6>
          <div className="border-b border-gray-200/80 my-6"></div>

          {/* video */}
          <div>
            <label htmlFor="videoLink" className="block text-sm  text-gray-800">
              Video Link
            </label>
            <input
              id="videoLink"
              {...register("videoLink", {
                required: "Video Link is required",
              })}
              placeholder="https://example.com"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.videoLink ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
            {errors.videoLink && (
              <p className="mt-1 text-sm text-red-600">
                {errors.videoLink.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end mb-5">
          <button
            type="submit"
            // disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--primary-blue)] to-blue-600 text-white  rounded-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            <FaSave />
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceAddForm;
