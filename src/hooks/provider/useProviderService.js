"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useForm } from "react-hook-form";

export const useProviderService = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [allUpazila, setAllUpazila] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allDivision, setAllDivision] = useState([]);
  const { reset } = useForm({});
  const { setLoading } = useAppContext();

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `myservice/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Title&SortDirection=asc&PageSize=${pageSize}`
      );

      console.log("res in useProviderService:", res);
      setAllData(res.data || []);
      setTotalRecords(res.numberOfRecords);
    } catch {
      setAllData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAllDivision = async () => {
    setLoading(true);
    try {
      const res = await apiService.get(`dropdown/getdivisions`);

      setAllDivision(res.data);
    } catch {
      setAllDivision([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllDivision();
  }, []);

  const getUpazilaByDistrict = async (districtIds = []) => {
    try {
      const res = await apiService.post(
        `dropdown/getupazilabydistrict`,
        districtIds
      );

      setAllUpazila(res?.data || []);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const getDistrictByDivision = async (divisionIds = []) => {
    try {
      const res = await apiService.post(
        `dropdown/getdistrictbydivision`,
        divisionIds
      );

      setAllDistrict(res?.data || []);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const saveUser = async (data) => {
    setLoading(true);
    const formData = new FormData();

    const serviceJson = {
      title: data.title,
      //   providerId: data.providerId,
      categoryId: Number(data.categoryId),
      subCategoryId: Number(data.subCategoryId),
      duration: data.duration,
      description: data.description,
      price: parseFloat(data.price),
      VideoLink: data.VideoLink,
      isActive: data.isActive,

      serviceLocation: {
        divisionId: Array.isArray(data.divisionId)
          ? data.divisionId.map(Number)
          : [],
        districtId: Array.isArray(data.districtId)
          ? data.districtId.map(Number)
          : [],
        upazilaId: Array.isArray(data.upazilaId)
          ? data.upazilaId.map(Number)
          : [],
        serviceArea: data.serviceArea,
      },
      serviceSeo: {
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
      },
    };
    if (isEditMode) {
      serviceJson.Id = parseFloat(id);
    }

    formData.append("serviceJson", JSON.stringify(serviceJson));

    if (data.serviceImages && data.serviceImages.length > 0) {
      for (const img of data.serviceImages) {
        formData.append("serviceImages", img);
      }
    }

    formData.append("defaultImageIndex", isEditMode ? "0" : "1");

    try {
      const res = await apiService.put("myservice/update", formData);
      if (res.message && res.status === 200) {
        toast.success(res.message);
        fetchData();
        reset();
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    allData,
    setAllData,
    singleData,
    allDivision,
    setAllDivision,
    allDistrict,
    setAllDistrict,
    allUpazila,
    setAllUpazila,
    saveUser,
    getDistrictByDivision,
    getUpazilaByDistrict,
  };
};
