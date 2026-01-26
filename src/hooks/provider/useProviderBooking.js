"use client";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useProviderBooking = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [singleData, setSingleData] = useState(null);
  const [detailsData, setDetailsData] = useState({});
  const { reset, watch, setValue } = useForm({});

  const {
    setLoading,
    currentPage,
    setTotalRecords,
    selectedId,
    isModalOpen,
    setIsModalOpen,
    detailsId,
    setDetailsId,
    isDetailsModalOpen,
    setIsRebookModalOpen,
    setIsRedscheduleModalOpen,
    setIsAddReviewModalOpen,
    setSelectedId,
  } = useAppContext();

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `booking/getall?PageNumber=${
          page - 1
        }&SearchText=&PageSize=${pageSize}&StartDate=&EndDate=&SortBy=bookingdate&SortDirection=desc`,
      );

      setAllData(res.data || []);
      setTotalRecords(res.numberOfRecords);
    } catch {
      setAllData([]);
    } finally {
      setLoading(false);
    }
  };

  // get all staff
  useEffect(() => {
    if (isModalOpen) {
      (async () => {
        const res = await apiService.get(`dropdown/getproviderstaff`);

        if (res.status === 200) {
          setStaffData(res.data);
        } else {
          setStaffData([]);
        }
      })();
    } else {
      setStaffData([]);
    }
  }, [isModalOpen]);

  // get services data
  useEffect(() => {
    if (isModalOpen) {
      (async () => {
        const res = await apiService.get(`dropdown/getservices`);
        console.log("services res", res);
        if (res.status === 200) {
          setServiceData(res.data);
        } else {
          setServiceData([]);
        }
      })();
    } else {
      setServiceData([]);
    }
  }, [isModalOpen]);

  // get customers data
  useEffect(() => {
    if (isModalOpen) {
      (async () => {
        const res = await apiService.get(`dropdown/getcustomer`);
        console.log("customer res", res);
        if (res.status === 200) {
          setCustomerData(res.data);
        } else {
          setCustomerData([]);
        }
      })();
    } else {
      setCustomerData([]);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (detailsId && isDetailsModalOpen) {
      (async () => {
        const res = await apiService.get(
          `booking/getbookingdetailsbyproviderstaff/${detailsId}`,
        );

        setDetailsData(res.data);
      })();
    } else {
      setDetailsData(null);
    }
  }, [detailsId, isDetailsModalOpen]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const saveData = async (data) => {
    const payload = {
      staffId: data.staffId,
      serviceId: data.serviceId,
      customerId: data.customerId,
      bookingDate: data.bookingDate,
      bookingStartTime: data.bookingStartTime,
      bookingEndTime: data.bookingEndTime,
      message: data.message,
      ...(selectedId && { Id: selectedId }),
    };

    try {
      if (selectedId) {
        const res = await apiService.put(
          `booking/update/${selectedId}`,
          payload,
        );

        if (res.status === 200) {
          fetchData();
          setIsModalOpen(false);
          toast.success(res.message);
          reset();
        } else {
          toast.error(res.error || res.message);
        }
      } else {
        const res = await apiService.post("booking/create", payload);

        if (res.status === 200) {
          toast.success(res.message);
          fetchData();
          setIsModalOpen(false);
          reset();
        } else {
          toast.error(res.error);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleAddReschedule = async (data) => {
    const payload = {
      bookingDate: data.bookingDate,
      bookingStartTime: data.bookingStartTime,
      bookingEndTime: data.bookingEndTime,
      rescheduleReason: data.rescheduleReason,
    };
    try {
      const res = await apiService.put(
        `booking/reschedule/${selectedId}`,
        payload,
      );

      if (res.status === 200) {
        fetchData();
        setIsRedscheduleModalOpen(false);
        setSelectedId(null);
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.error || res.message);
        setIsRedscheduleModalOpen(true);
      }
    } catch (err) {
      toast.error(err.error || "Something went wrong");
    }
  };

  const handleAddReview = async (data) => {
    const payload = {
      bookingDate: data.bookingDate,
      bookingStartTime: data.bookingStartTime,
      bookingEndTime: data.bookingEndTime,
      rescheduleReason: data.rescheduleReason,
    };
    try {
      const res = await apiService.put(`booking/review/${selectedId}`, payload);

      if (res.status === 200) {
        fetchData();
        setIsAddReviewModalOpen(false);
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.error || res.message);
        setIsAddReviewModalOpen(true);
      }
    } catch (err) {
      toast.error(err.error || "Something went wrong");
    }
  };

  const handleAddRebook = async (data) => {
    const payload = {
      bookingDate: data.bookingDate,
      bookingStartTime: data.bookingStartTime,
      bookingEndTime: data.bookingEndTime,
      useSameStaff: data.useSameStaff,
      message: data.message,
    };
    try {
      const res = await apiService.post(
        `booking/rebook/${selectedId}`,
        payload,
      );

      if (res.status === 200) {
        fetchData();
        setIsRebookModalOpen(false);
        setSelectedId(null);
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.error || res.message);
        setIsRebookModalOpen(true);
      }
    } catch (err) {
      toast.error(err.error || "Something went wrong");
    }
  };
  const handleBookingCancle = async (data) => {
    const payload = {
      cancellationReason: data.cancellationReason,
    };
    try {
      const res = await apiService.put(`booking/cancel/${selectedId}`, payload);

      if (res.status === 200) {
        fetchData();
        setIsRebookModalOpen(false);
        setSelectedId(null);
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.error || res.message);
        setIsRebookModalOpen(true);
      }
    } catch (err) {
      toast.error(err.error || "Something went wrong");
    }
  };
  return {
    allData,
    setAllData,
    singleData,
    saveData,
    detailsData,
    setDetailsData,
    handleAddReview,
    handleAddReschedule,
    staffData,
    setStaffData,
    serviceData,
    setServiceData,
    customerData,
    setCustomerData,
    handleAddRebook,
    handleBookingCancle,
  };
};
