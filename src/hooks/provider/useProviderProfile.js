"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useForm } from "react-hook-form";

export const useProviderProfile = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const [allUpazila, setAllUpazila] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allDivision, setAllDivision] = useState([]);
  const { reset } = useForm({});
  const { setLoading } = useAppContext();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiService.get(`provider-profile/getproviderprofile`);
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
    const formData = new FormData();

    formData.append("Name", data.Name);
    formData.append("Email", data.Email);
    formData.append("MobileNumber", data.MobileNumber);
    formData.append("Gender", String(data.Gender));
    formData.append("DateOfBirth", data.DateOfBirth);
    formData.append("Bio", data.Bio);

    // formData.append("ProfileImage", data.ProfileImage);

    if (data.ProfileImage instanceof File) {
      formData.append("ProfileImage", data.ProfileImage);
    }

    // Permanent Address
    formData.append("Addresses[0].AddressType", "0");
    formData.append(
      "Addresses[0].DivisionId",
      String(data.permanentDivisionId)
    );
    formData.append(
      "Addresses[0].DistrictId",
      String(data.permanentDistrictId)
    );
    formData.append("Addresses[0].UpazilaId", String(data.permanentUpazilaId));
    formData.append("Addresses[0].Address", data.permanentAddress);
    formData.append("Addresses[0].IsSameAsPermanent", "false");

    // Shop Address
    formData.append("Addresses[1].AddressType", "1");
    formData.append("Addresses[1].DivisionId", String(data.shopDivisionId));
    formData.append("Addresses[1].DistrictId", String(data.shopDistrictId));
    formData.append("Addresses[1].UpazilaId", String(data.shopUpazilaId));
    formData.append("Addresses[1].Address", data.shopAddress);
    formData.append(
      "Addresses[1].ShopName",
      data.sameAsPermanent ? "Permanent" : data.ShopName
    );
    formData.append(
      "Addresses[1].IsSameAsPermanent",
      data.sameAsPermanent ? "true" : "false"
    );

    try {
      const res = await apiService.put("provider-profile/update", formData);
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
    allUpazila,
    setAllUpazila,
    saveUser,
    getDistrictByDivision,
    getUpazilaByDistrict,
  };
};
