import { useAppContext } from "@/context/AppContext";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProviderProfileVerification = () => {
  const { loading, setLoading } = useAppContext();
  const [ducmentsType, setDocumentsType] = useState([]);
  const [ducmentStatus, setDucmentStatus] = useState([]);
  const [verificationtypes, setVerificationtypes] = useState([]);
  const [verificationstatuses, setVerificationstatuses] = useState([]);

  useEffect(() => {
    const getverificationtypes = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("dropdown/getverificationtypes");
        console.log("getverificationtypes", res);

        if (res.data.length > 0) {
          setLoading(false);
          setVerificationtypes(res.data);
        } else {
          toast.error(res.error);
          setVerificationtypes([]);
        }
      } catch (error) {
        setDucmentStatusetVerificationtypess([]);
        setLoading(true);
      }
    };
    getverificationtypes();
  }, []);
  useEffect(() => {
    const getverificationstatuses = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("dropdown/getverificationstatuses");
        console.log("getverificationstatuses", res);

        if (res.data.length > 0) {
          setLoading(false);
          setDucmentStatus(res.data);
        } else {
          toast.error(res.error);
          setDucmentStatus([]);
        }
      } catch (error) {
        setDucmentStatus([]);
        setLoading(true);
      }
    };
    getverificationstatuses();
  }, []);
  useEffect(() => {
    const getAllDocuments = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("dropdown/getdocumenttypes");

        if (res.data.length > 0) {
          setLoading(false);
          setDocumentsType(res.data);
        }
        toast.error(res.error);
      } catch (error) {
        setLoading(true);
      }
    };
    getAllDocuments();
  }, []);
  return {
    ducmentsType,
    ducmentStatus,
    verificationtypes,
    verificationstatuses,
  };
};
