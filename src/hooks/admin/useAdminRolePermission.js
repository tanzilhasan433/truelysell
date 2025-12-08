import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useAdminRolePermission = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [singleRoleData, setSingleRoleData] = useState(null);
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
        `roles/getall?PageNumber=${
          page - 1
        }&SearchText=&SortBy=Id&SortDirection=desc&PageSize=${pageSize}`
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
        try {
          const res = await apiService.get(`roles/getrolebyid/${selectedId}`);
          setSingleRoleData(res.data);
        } catch {}
      })();
    } else {
      setSingleRoleData(null);
    }
  }, [selectedId, isModalOpen]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const saveData = async (data) => {
    const payload = {
      Name: data.Name,
      IsActive: data.IsActive,
      ...(selectedId && { Id: selectedId }),
    };

    try {
      if (selectedId) {
        const res = await apiService.put(`roles/update/${selectedId}`, payload);

        if (res.message) {
          fetchData();
          setIsModalOpen(false);
          toast.success(res.message);
          reset();
        } else {
          toast.error(res.error);
        }
      } else {
        const res = await apiService.post("roles/create", payload);

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
  return { allData, setAllData, singleRoleData, saveData };
};
