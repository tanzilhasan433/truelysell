"use client";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useProviderOffer = (pageSize = 10) => {
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
        `provider-offer/getall?pageNumber=${
          page - 1
        }&pageSize=${pageSize}&searchText=&sortBy=CreatedDate&sortDirection=desc`
      );
      console.log("Fetched data:", res);
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
          `provider-offer/getofferbyid/${selectedId}`
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
    const payload = {
      serviceId: data.serviceId,
      offerTitle: data.offerTitle,
      discountType: data.discountType,
      discountValue: data.discountValue,
      startDate: data.startDate,
      endDate: data.endDate,
      description: data.description,
      isActive: data.isActive,
      ...(selectedId && { Id: selectedId }),
    };

    try {
      if (selectedId) {
        const res = await apiService.put(
          `provider-offer/update/${selectedId}`,
          payload
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
        const res = await apiService.post("provider-offer/create", payload);

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
  return { allData, setAllData, singleData, saveData };
};
