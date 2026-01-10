"use client";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useProviderBooking = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [allSubCategoryData, setAllSubCategoryData] = useState([]);
  const [allUpazila, setAllUpazila] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allDivision, setAllDivision] = useState([]);
  const [isSubCategoryDisabled, setIsSubCategoryDisabled] = useState(true);
  const [noSubCategoryFound, setNoSubCategoryFound] = useState(false);
  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
  const [isUpazilaDisabled, setIsUpazilaDisabled] = useState(true);
  const [singleData, setSingleData] = useState(null);
  const [detailsData, setDetailsData] = useState({});
  const [isRedscheduleModalOpen, setIsRedscheduleModalOpen] = useState(false);
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
    setIsDetailsModalOpen,
  } = useAppContext();

  const getCategories = async () => {
    try {
      setLoading(true);

      const response = await apiService.get(`dropdown/getcategories`);
      if (response.status === 200) {
        setAllCategoryData(response?.data);
        setLoading(false);
      } else {
        setLoading(false);
        setAllCategoryData([]);
      }
    } catch (error) {
      setAllCategoryData([]);
      setLoading(false);
    }
  };
  const getSubCategories = async (catId = []) => {
    setAllSubCategoryData([]);
    if (!catId.length || catId[0] === 0) {
      setIsSubCategoryDisabled(true);
      return;
    }
    try {
      setLoading(true);

      const response = await apiService.post(
        `dropdown/getsubcategoriesbycategory`,
        catId
      );
      if (response.status === 200) {
        setLoading(false);

        const data = response?.data || [];
        setAllSubCategoryData(data);

        if (data.length > 0) {
          setIsSubCategoryDisabled(false);
          setNoSubCategoryFound(false);
        } else {
          setIsSubCategoryDisabled(true);
          setNoSubCategoryFound(true);
        }
      } else {
        setLoading(false);
        setAllSubCategoryData([]);
        setIsSubCategoryDisabled(true);
        setNoSubCategoryFound(true);
      }
    } catch (error) {
      setAllSubCategoryData([]);
      setIsSubCategoryDisabled(true);
      setNoSubCategoryFound(true);
      setLoading(false);
    }
  };

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
        districtIds
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
        divisionIds
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

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "categoryId" && value.categoryId && !selectedId) {
        const selected = Number(value.categoryId);
        if (selected) {
          getSubCategories(selected);
        } else {
          setAllSubCategoryData([]);
          setIsSubCategoryDisabled(true);
          setNoSubCategoryFound(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, selectedId]);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `booking/getall?PageNumber=${
          page - 1
        }&SearchText=&PageSize=${pageSize}&StartDate=2026-01-01&EndDate=2026-01-31&SortBy=bookingdate&SortDirection=desc`
      );

      setAllData(res.data || []);
      setTotalRecords(res.numberOfRecords);
    } catch {
      setAllData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getCategories();
      getAllDivision();
    }
  }, []);
  useEffect(() => {
    if (selectedId && isModalOpen) {
      (async () => {
        const res = await apiService.get(
          `booking/getroviderstaffbyid/${selectedId}`
        );
        setSingleData(res.data);
      })();
    } else {
      setSingleData(null);
    }
  }, [selectedId, isModalOpen]);

  useEffect(() => {
    if (detailsId && isDetailsModalOpen) {
      (async () => {
        const res = await apiService.get(
          `booking/getbookingdetailsbyproviderstaff/${detailsId}`
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
    const formData = new FormData();

    formData.append("IsActive", data.IsActive);

    // Edit mode
    if (selectedId) {
      formData.append("Id", selectedId);
    }

    try {
      if (selectedId) {
        const res = await apiService.put(
          `booking/update/${selectedId}`,
          formData
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
        const res = await apiService.post("booking/create", formData);

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
  return {
    allData,
    setAllData,
    singleData,
    saveData,
    allCategoryData,
    setAllCategoryData,
    allSubCategoryData,
    setAllSubCategoryData,
    allUpazila,
    setAllUpazila,
    allDistrict,
    setAllDistrict,
    allDivision,
    setAllDivision,
    isSubCategoryDisabled,
    setIsSubCategoryDisabled,
    noSubCategoryFound,
    setNoSubCategoryFound,
    isDistrictDisabled,
    setIsDistrictDisabled,
    isUpazilaDisabled,
    setIsUpazilaDisabled,
    getDistrictByDivision,
    getUpazilaByDistrict,
    getSubCategories,
    detailsData,
    setDetailsData,
    isRedscheduleModalOpen,
    setIsRedscheduleModalOpen,
  };
};
