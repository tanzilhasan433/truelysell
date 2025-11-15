"use client";

import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const BlogDelete = ({ endpoint, type, onComplete }) => {
  const { loading, setLoading } = useAppContext();

  const handleDelete = () => {
    toast.custom((t) => (
      <div className="bg-white shadow-lg  rounded-lg p-4 flex flex-col gap-3 w-72">
        <p className="text-gray-700 font-medium text-sm">
          Are you sure you want to delete this {type}?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-100 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              confirmDelete();
            }}
            className="px-3 py-1 text-sm rounded-md bg-(--primary-blue) text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    ));
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}${endpoint}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      if (res.ok) {
        toast.success(`${type} deleted successfully`);
        onComplete(true);
      } else {
        toast.error(`Failed to delete ${type}`);
        onComplete(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      onComplete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <button
        onClick={handleDelete}
        disabled={loading}
        title="Delete"
        className="flex items-center gap-1 hover:text-red-500"
      >
        <FaTrash /> Delete
      </button>
    </>
  );
};

export default BlogDelete;
