"use client";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useProviderCoupon = (pageSize = 10) => {
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
        `provider-coupon/getall?pageNumber=${
          page - 1
        }&pageSize=${pageSize}&searchText=&sortBy=CreatedDate&sortDirection=desc`
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
          `provider-coupon/getcouponbyid/${selectedId}`
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
      couponCode: data.couponCode,
      discountType: data.discountType,
      discountValue: data.discountValue,
      minimumOrderAmount: data.minimumOrderAmount,
      maximumDiscountAmount: data.maximumDiscountAmount,
      startDate: data.startDate,
      endDate: data.endDate,
      usageLimit: data.usageLimit,
      serviceId: data.serviceId,
      isActive: data.isActive,
      ...(selectedId && { Id: selectedId }),
    };

    try {
      if (selectedId) {
        const res = await apiService.put(
          `provider-coupon/update/${selectedId}`,
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
        const res = await apiService.post("provider-coupon/create", payload);

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
