"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useForm } from "react-hook-form";

export const useAdminProfile = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allDivision, setAllDivision] = useState([]);
  const { reset } = useForm({});
  const { setLoading } = useAppContext();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiService.get(`admin-profile/getAdminprofile`);
      console.log("profileInfo", res);
      setProfileInfo(res.data);
    } catch {
      setProfileInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
    const formData = new FormData();

    formData.append("Name", data.Name);
    formData.append("Email", data.Email);
    formData.append("MobileNumber", data.MobileNumber);
    formData.append("Gender", String(data.Gender));
    formData.append("DateOfBirth", data.DateOfBirth);
    formData.append("Bio", data.Bio);

    if (data.ProfileImage instanceof File) {
      formData.append("ProfileImage", data.ProfileImage);
    }

    // Permanent Address
    formData.append("PermanentAddress", data.PermanentAddress);
    formData.append("PermanentDivisionId", String(data.PermanentDivisionId));
    formData.append("PermanentDistrictId", String(data.PermanentDistrictId));
    formData.append(
      "CoverageAreaDivisionId",
      String(data.CoverageAreaDivisionId)
    );
    formData.append(
      "CoverageAreaDistrictId",
      String(data.CoverageAreaDistrictId)
    );

    try {
      const res = await apiService.put("admin-profile/update", formData);
      if (res.message && res.status === 200) {
        toast.success(res.message);
        fetchUsers();
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
    profileInfo,
    allDivision,
    setAllDivision,
    allDistrict,
    setAllDistrict,
    saveUser,
    getDistrictByDivision,
  };
};
