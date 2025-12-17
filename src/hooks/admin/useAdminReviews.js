import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useAdminReviews = (pageSize = 10) => {
  const [allData, setAllData] = useState([]);

  const { setLoading, currentPage, setTotalRecords } = useAppContext();

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `reviews/getall?statusId=0&PageNumber=${
          page - 1
        }&SortBy=date&SortDirection=desc&PageSize=${pageSize}`
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
    fetchData(currentPage);
  }, [currentPage]);

  return { allData, setAllData };
};
