"use client";
import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useAdminBooking = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);
  const [allStatusData, setAllStatusData] = useState([]);

  const { setLoading, currentPage, setTotalRecords } = useAppContext();

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `booking/getall?statusId=0&PageNumber=${
          page - 1
        }&SortBy=BookingDate&SortDirection=desc&PageSize=${pageSize}`
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
    (async () => {
      const res = await apiService.get(`dropdown/getbookingstatus`);
      setAllStatusData(res.data);
    })();
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return {
    allData,
    setAllData,
    allStatusData,
    setAllStatusData,
  };
};
