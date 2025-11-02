"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import Editor from "@/components/shared/Editor";
import { useAppContext } from "@/context/AppContext";
import { FaSave } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";

const ServiceAddForm = ({ isEditMode, id }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { setLoading } = useAppContext();
  const [providers, setProviders] = useState([]);
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [allSubCategoryData, setAllSubCategoryData] = useState([]);
  const [allUpazila, setAllUpazila] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allDivision, setAllDivision] = useState([]);

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
    name: "services",
  });
  const [preview, setPreview] = useState("");

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getcategories`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setAllCategoryData(result?.data);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllCategoryData([]);
      }
    } catch (error) {
      setAllCategoryData([]);
      setLoading(false);
    }
  };
  const getSubCategories = async (catId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getsubcategoriesbycategory?categoryId=${catId}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setAllSubCategoryData(result?.data);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllSubCategoryData([]);
      }
    } catch (error) {
      setAllSubCategoryData([]);
      setLoading(false);
    }
  };

  const getProviders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}users/getall?PageNumber=0&SearchText=&SortBy=FirstName&SortDirection=asc&PageSize=1000`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        const providerData = result.data.filter(
          (item) => item.role === "Provider"
        );
        setProviders(providerData);
      } else {
        const errorData = await response.json();
      }
    } catch (error) {}
  };
  // get Upazila by District
  const getUpazilaByDistrict = async (districtIds = []) => {
    if (!districtIds.length) return;
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getupazilabydistrict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: JSON.stringify(districtIds),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch upazilas");
      const result = await response.json();
      setAllUpazila(result?.data || []);
    } catch (error) {
      console.error(error);
      setAllUpazila([]);
    } finally {
      setLoading(false);
    }
  };
  // get District by Division
  const getDistrictByDivision = async (divisionIds = []) => {
    if (!divisionIds.length) return;
    console.log(divisionIds);
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getdistrictbydivision`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: JSON.stringify(divisionIds),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch districts");
      const result = await response.json();
      console.log("districts", result);
      setAllDistrict(result?.data || []);
    } catch (error) {
      console.error(error);
      setAllDistrict([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllDivision = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getdivisions`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setAllDivision(result?.data);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllDivision([]);
      }
    } catch (error) {
      setAllDivision([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProviders();
    getCategories();
    getAllDivision();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      const serviceJson = {
        title: data.title,
        providerId: data.providerId,
        categoryId: Number(data.categoryId),
        subCategoryId: Number(data.subCategoryId),
        duration: data.duration,
        description: data.description,
        VideoLink: data.VideoLink,
        isActive: true,
        isDefault: data.isDefault || false,
        listServiceAdditional: data.services.map((s) => ({
          name: s.additionalService,
          price: parseFloat(s.servicePrice),
          duration: s.serviceDuration,
        })),
        serviceLocation: {
          divisionId: data.divisionId ? [Number(data.divisionId)] : [],
          districtId: data.districtId ? [Number(data.districtId)] : [],
          upazilaId: data.upazilaId ? [Number(data.upazilaId)] : [],
          serviceArea: data.serviceArea,
        },
        serviceSeo: {
          metaTitle: data.metaTitle,
          metaKeywords: data.metaKeywords,
          metaDescription: data.metaDescription,
        },
      };

      // append JSON and files
      formData.append("serviceJson", JSON.stringify(serviceJson));

      if (data.serviceImages && data.serviceImages.length > 0) {
        for (const img of data.serviceImages) {
          formData.append("serviceImages", img);
        }
      }

      formData.append("defaultImageIndex", "1");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}service/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Service created:", result);
        toast.success("Service added successfully");
        router.push("/admin/services");
      } else {
        toast.error("Failed to add service");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FBFBFB] ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Service Information</h6>
          <div className="border-b border-gray-200/80 my-6"></div>
          <div className="mb-6 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <label className="text-sm font-medium text-gray-600">
                Provider
              </label>
              <select
                id="providerId"
                {...register("providerId", {
                  required: !isEditMode && "Provider is required",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1  focus:outline-none "
                required
              >
                <option value="" disabled className="text-gray-400">
                  Select a provider
                </option>
                {providers?.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="text-gray-700"
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.providerId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.providerId.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 lg:col-span-3">
              <input
                type="checkbox"
                {...register("isDefault")}
                className="toggle toggle-success "
              />
              <label className="text-sm font-medium text-gray-600">
                is Default
              </label>
            </div>
          </div>
          {/*  */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm  text-gray-800">
                Title
              </label>
              <input
                id="title"
                {...register("title", {
                  required: !isEditMode && "Title is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            {/* Duration */}
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
                  required: !isEditMode && "Duration is required",
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

          {/* Category */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm  text-gray-800"
              >
                Category
              </label>
              <select
                id="categoryId"
                {...register("categoryId", {
                  required: !isEditMode && "Category is required",
                })}
                onChange={(e) => {
                  const selected = [Number(e.target.value)];
                  setValue("categoryId", selected);
                  getSubCategories(selected);
                }}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="" disabled>
                  Select Category
                </option>
                {allCategoryData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            {/* sub category Title */}
            <div>
              <label
                htmlFor="subCategoryId"
                className="block text-sm  text-gray-800"
              >
                Sub Category
              </label>
              <select
                id="subCategoryId"
                {...register("subCategoryId", {
                  required: !isEditMode && "Sub Category is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                {allSubCategoryData?.length > 0 ? (
                  <>
                    <option value="">Select Sub Category</option>
                    {allSubCategoryData.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="" className="overflow-hidden">
                    No subcategories found
                  </option>
                )}
              </select>
              {errors.subCategoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subCategoryId.message}
                </p>
              )}
            </div>
          </div>

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
        {/* service */}
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Service Information</h6>
          <div className="border-b border-gray-200/80 my-6"></div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid lg:grid-cols-3 gap-6 mb-6 relative"
            >
              {/* list Service Additional */}
              <div>
                {/* name */}
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
            <label htmlFor="VideoLink" className="block text-sm  text-gray-800">
              Video Link
            </label>
            <input
              id="VideoLink"
              {...register("VideoLink")}
              placeholder="https://example.com"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.VideoLink ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
        </div>
        {/* location */}
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Location</h6>
          <div className="border-b border-gray-200/80 my-6"></div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* serviceArea */}
            <div>
              <label htmlFor="price" className="block text-sm  text-gray-800">
                Service Area
              </label>
              <input
                id="serviceArea"
                {...register("serviceArea", {
                  required: !isEditMode && "Service Area is required",
                })}
                placeholder="Enter your service area"
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.serviceArea ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.serviceArea && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceArea.message}
                </p>
              )}
            </div>
            {/* Division */}
            <div>
              <label
                htmlFor="divisionId"
                className="block text-sm  text-gray-800"
              >
                Division
              </label>
              <select
                id="divisionId"
                {...register("divisionId")}
                onChange={(e) => {
                  const selected = [Number(e.target.value)];
                  setValue("divisionId", selected);
                  console.log("selected", selected);
                  getDistrictByDivision(selected);
                }}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="">Select Division</option>
                {allDivision.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>

              {errors.divisionId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.divisionId.message}
                </p>
              )}
            </div>

            {/*  */}
            <div>
              <label
                htmlFor="districtId"
                className="block text-sm  text-gray-800"
              >
                Distict
              </label>
              <select
                id="districtId"
                {...register("districtId")}
                onChange={(e) => {
                  const selected = [Number(e.target.value)];
                  setValue("districtId", selected);
                  getUpazilaByDistrict(selected);
                }}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="">Select District</option>
                {allDistrict.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.name}
                  </option>
                ))}
              </select>

              {errors.districtId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.districtId.message}
                </p>
              )}
            </div>

            {/* thana */}
            <div>
              <label
                htmlFor="upazilaId"
                className="block text-sm  text-gray-800"
              >
                Thana / Upozila/ Area
              </label>
              <select
                id="upazilaId"
                {...register("upazilaId", {
                  required: !isEditMode && "Thana is required",
                })}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="" disabled>
                  Select thana
                </option>
                {allUpazila?.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                    className="text-gray-700"
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.upazilaId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.upazilaId.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Gallery */}

        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Gallery</h6>
          <div className="border-b border-gray-200/80 my-6"></div>
          {/* Upload */}
          <div className="">
            <button
              type="button"
              onClick={() => fileInputRef?.current?.click()}
              className="px-3 py-5 bg-gray-50 block w-full border-gray-300 border border-dashed rounded-md text-sm flex justify-center"
            >
              <IoCloudUploadOutline
                size={50}
                className="block w-full text-gray-600"
              />
            </button>
          </div>
          {preview && (
            <div className="relative my-5 inline-block">
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20  object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview("");
                  setValue("serviceImages", null);
                }}
                className=" text-white bg-red-500 p-1 rounded m-1 absolute top-0 right-0 z-50"
              >
                <FaRegTrashCan />
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple
            ref={(el) => {
              fileInputRef.current = el;
              register("serviceImages");
            }}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setPreview(URL.createObjectURL(files[0]));
              setValue("serviceImages", files, { shouldValidate: true });
            }}
            className="hidden"
          />
          {/* <input
            type="file"
            accept="image/png, image/jpeg"
            ref={(el) => {
              fileInputRef.current = el;
              register("serviceImages", {
                required: !isEditMode ? "Image is required" : false,
              });
            }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
                setValue("serviceImages", file, { shouldValidate: true });
              }
            }}
            className="hidden"
          /> */}
          {errors.serviceImages && (
            <p className="text-red-500 text-xs mt-1">
              {errors.serviceImages.message}
            </p>
          )}
        </div>
        {/*  */}
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>SEO</h6>
          <div className="border-b border-gray-200/80 my-6"></div> {/* Seo */}
          <div className="mb-6">
            <label htmlFor="videoLink" className="block text-sm  text-gray-800">
              Meta Title (English)
            </label>
            <input
              id="metaTitle"
              {...register("metaTitle")}
              placeholder="Enter meta title"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.metaTitle ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="metaKeywords"
              className="block text-sm  text-gray-800"
            >
              Meta Keywords (English)
            </label>
            <input
              id="metaKeywords"
              {...register("metaKeywords")}
              placeholder="Enter  meta Keywords"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.metaKeywords ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div>
            <label
              htmlFor="metaDescription"
              className="block text-sm  text-gray-800"
            >
              Meta Description (English)
            </label>
            <input
              id="metaDescription"
              {...register("metaDescription")}
              placeholder="Enter description"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.metaDescription ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
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
