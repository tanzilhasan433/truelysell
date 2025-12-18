"use client";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useCategory = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [singleData, setSingleData] = useState(null);
  const { reset } = useForm({});

  const {
    setLoading,
    currentPage,
    setTotalRecords,
    selectedId,
    isModalOpen,
    setIsModalOpen,
  } = useAppContext();

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `categories/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Name&SortDirection=asc&PageSize=${pageSize}`
      );
      setAllData(res.data);
      setTotalRecords(res.numberOfRecords);
    } catch {
      setAllData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedId && isModalOpen) {
      (async () => {
        const res = await apiService.get(
          `categories/getcategoriesbyid/${selectedId}`
        );
        setSingleData(res.data);
      })();
    } else {
      setSingleData(null);
    }
  }, [selectedId, isModalOpen]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleFeaturedToggle = async (item, value) => {
    const formData = new FormData();
    formData.append("Id", item.id);
    formData.append("Name", item.name);
    formData.append("Slug", item.slug);
    formData.append("IsFeatured", value ? "true" : "false");
    try {
      const res = await apiService.put(
        `categories/update/${item.id}`,
        formData
      );

      if (res.message) {
        toast.success(res.message);

        setAllData((prev) =>
          prev.map((cat) =>
            cat.id === item.id ? { ...cat, isFeatured: value } : cat
          )
        );
      } else {
        toast.error(res?.error || "Failed to update");
      }
    } catch (error) {
      toast.error("An error occurred while updating");
    }
  };

  const saveData = async (data) => {
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Slug", data.slug);
    formData.append("IsFeatured", data.IsFeatured ? "true" : "false");

    if (data.image) {
      formData.append("CategoryImage", data.image);
    }
    if (data.icon) {
      formData.append("CategoryIcon", data.icon);
    }

    if (selectedId) {
      formData.append("Id", selectedId);
    }

    try {
      if (selectedId) {
        const res = await apiService.put(
          `categories/update/${selectedId}`,
          formData
        );

        if (res.message) {
          fetchData();
          setIsModalOpen(false);
          toast.success(res.message);
          reset();
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await apiService.post("categories/create", formData);

        if (res.message) {
          toast.success(res.message);
          fetchData();
          setIsModalOpen(false);
        } else {
          toast.error(res.error);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return { allData, setAllData, singleData, saveData, handleFeaturedToggle };
};
