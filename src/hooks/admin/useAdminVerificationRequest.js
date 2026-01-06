import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useAdminVerificationRequest = () => {
  const { setLoading } = useAppContext();
  const [verificationrequests, setVerificationrequests] = useState([]);
  useEffect(() => {
    const getVerificationrequests = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          "verificationrequests/getall?PageNumber=0&SearchText=&SortBy=Id&SortDirection=desc&PageSize=10&ProviderId=&Status=&DocumentType="
        );

        if (res.data.length > 0) {
          setLoading(false);
          setVerificationrequests(res.data);
        }
        toast.error(res.error);
      } catch (error) {
        setLoading(true);
      }
    };
    getVerificationrequests();
  }, []);
  return { verificationrequests };
};
