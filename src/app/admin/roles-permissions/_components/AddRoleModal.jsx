"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useAdminRolePermission } from "@/hooks/admin/useAdminRolePermission";

const AddRoleModal = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      IsActive: true,
    },
  });
  const { selectedId, onClose } = useAppContext();
  const { singleRoleData } = useAdminRolePermission();
  const isEditMode = Boolean(selectedId);

  useEffect(() => {
    if (singleRoleData && selectedId) {
      reset({
        Name: singleRoleData.name,
        IsActive: singleRoleData.isActive,
      });
    } else {
      reset({
        Name: "",
        IsActive: "",
      });
    }
  }, [singleRoleData, selectedId]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 items-center ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5  overflow-y-auto  sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h6 className="text-lg font-semibold mx-auto">
            {isEditMode ? "Update" : "Add"} Role
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
        <form
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data);
            reset();
          })}
          className="space-y-4"
        >
          {/* Name */}
          <input
            type="text"
            placeholder="Role"
            {...register("Name", { required: !isEditMode && true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
          <div className="flex items-center justify-start gap-3">
            <label className="text-sm font-medium">Status</label>
            <input
              type="checkbox"
              {...register("IsActive")}
              className="toggle toggle-success"
            />
          </div>

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

export default AddRoleModal;
