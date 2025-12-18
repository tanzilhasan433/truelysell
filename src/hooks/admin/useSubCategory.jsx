"use client";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useSubCategory = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [allCategoryData, setAllCategoryData] = useState([]);
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
        `subcategories/getall?PageNumber=${
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
    const fetchCategories = async () => {
      try {
        const res = await apiService.get("dropdown/getcategories");
        setAllCategoryData(res.data);
      } catch {
        setAllCategoryData([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedId && isModalOpen) {
      (async () => {
        const res = await apiService.get(
          `subcategories/getsubcategoriesbyid/${selectedId}`
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

  const saveData = async (data) => {
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Slug", data.slug);
    formData.append("CategoryId", data.CategoryId);

    if (data.SubCategoryImage) {
      formData.append("SubCategoryImage", data.SubCategoryImage);
    }

    if (selectedId) {
      formData.append("Id", selectedId);
    }

    try {
      if (selectedId) {
        const res = await apiService.put(
          `subcategories/update/${selectedId}`,
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
        const res = await apiService.post("subcategories/create", formData);

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
  return { allData, setAllData, allCategoryData, singleData, saveData };
};
