"use client";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useBookingCustomer = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [singleData, setSingleData] = useState(null);
  const [allUpazila, setAllUpazila] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allDivision, setAllDivision] = useState([]);
  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
  const [isUpazilaDisabled, setIsUpazilaDisabled] = useState(true);
  const [overview, setOverview] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const { reset, watch, setValue } = useForm({});

  const {
    setLoading,
    currentPage,
    setTotalRecords,
    selectedId,
    isModalOpen,
    setIsModalOpen,
    isDetailsModalOpen,
  } = useAppContext();

  const getUpazilaByDistrict = async (districtIds = []) => {
    setAllUpazila([]);
    if (!districtIds.length || districtIds[0] === 0) {
      setIsUpazilaDisabled(true);
      return;
    }
    try {
      setLoading(true);

      const response = await apiService.post(
        `dropdown/getupazilabydistrict`,
        districtIds,
      );

      if (response.status === 200) {
        setAllUpazila(response?.data || []);
        setIsUpazilaDisabled(false);
      } else {
        setAllUpazila([]);
        setIsUpazilaDisabled(true);
      }
    } catch (error) {
      setAllUpazila([]);
      setIsUpazilaDisabled(true);
    } finally {
      setLoading(false);
    }
  };

  const getDistrictByDivision = async (divisionIds = []) => {
    setAllDistrict([]);
    setAllUpazila([]);
    setValue("districtId", "");
    setValue("upazilaId", "");
    setIsUpazilaDisabled(true);

    if (!divisionIds.length || divisionIds[0] === 0) {
      setIsDistrictDisabled(true);
      return;
    }
    try {
      setLoading(true);

      const response = await apiService.post(
        `dropdown/getdistrictbydivision`,
        divisionIds,
      );

      if (response.status == 200) {
        setAllDistrict(response?.data || []);
        setIsDistrictDisabled(false);
      } else {
        setAllDistrict([]);
      }
    } catch (error) {
      setIsDistrictDisabled(true);
      setAllDistrict([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllDivision = async () => {
    try {
      setLoading(true);

      const response = await apiService.get(`dropdown/getdivisions`);

      if (response.status === 200) {
        setAllDivision(response?.data);
        setLoading(false);
      } else {
        setLoading(false);
        setAllDivision([]);
      }
    } catch (error) {
      setAllDivision([]);
      setLoading(false);
    }
  };

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `provider-customer/getall?PageNumber=${
          page - 1
        }&PageSize=${pageSize}&SearchText=&SortBy=Name&SortDirection=asc`,
      );

      setAllData(res.data);
      setTotalRecords(res.numberOfRecords);
    } catch {
      setAllData([]);
    } finally {
      setLoading(false);
    }
  };

  // single customer data
  useEffect(() => {
    if (selectedId && isModalOpen) {
      (async () => {
        const res = await apiService.get(
          `provider-customer/getcustomerbyid/${selectedId}`,
        );
        console.log("Single Customer Data:", res);
        setSingleData(res.data);
      })();
    } else {
      setSingleData(null);
    }
  }, [selectedId, isModalOpen]);

  // single customer overview details
  useEffect(() => {
    if (customerId && isDetailsModalOpen) {
      (async () => {
        const res = await apiService.get(
          `provider-customer/overview?customerId=${customerId}`,
        );
        console.log("Overview Data:", res);
        setCustomerData(res.data);
      })();
    } else {
      setCustomerData(null);
    }
  }, [customerId, , isDetailsModalOpen]);

  // overview
  useEffect(() => {
    (async () => {
      const res = await apiService.get(
        `provider-customer/overview?customerId=`,
      );

      setOverview(res.data);
    })();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      getAllDivision();
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const saveData = async (data) => {
    const formData = new FormData();

    formData.append("FirstName", data.FirstName);
    formData.append("LastName", data.LastName);
    formData.append("Email", data.Email);
    formData.append("Password", data.Password);
    formData.append("Address", data.Address);
    formData.append("MobileNumber", data.MobileNumber);
    formData.append("DivisionId", data.divisionId?.[0]);
    formData.append("DistrictId", data.districtId?.[0]);
    formData.append("UpazilaId", data.upazilaId?.[0]);
    formData.append("IsActive", data.IsActive);

    if (data.ProfileImage instanceof File) {
      formData.append("ProfileImage", data.ProfileImage);
    }

    // Edit mode
    if (selectedId) {
      formData.append("Id", selectedId);
    }

    try {
      if (selectedId) {
        const res = await apiService.put(
          `provider-customer/update/${selectedId}`,
          formData,
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
        const res = await apiService.post("provider-customer/create", formData);

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
  return {
    allData,
    setAllData,
    singleData,
    saveData,
    overview,
    setOverview,
    customerId,
    setCustomerId,
    customerData,
    setCustomerData,

    allUpazila,
    setAllUpazila,
    allDistrict,
    setAllDistrict,
    allDivision,
    setAllDivision,

    isDistrictDisabled,
    setIsDistrictDisabled,
    isUpazilaDisabled,
    setIsUpazilaDisabled,
    getDistrictByDivision,
    getUpazilaByDistrict,
  };
};
