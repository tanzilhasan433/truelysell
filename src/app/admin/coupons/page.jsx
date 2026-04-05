"use client";

import Loader from "@/components/shared/Loader";
import NoFoundData from "@/components/shared/NoFoundData";
import { useAppContext } from "@/context/AppContext";
import { useAdminCoupons } from "@/hooks/admin/useAdminCoupons";
import { FaPlus } from "react-icons/fa";

import AdminCouponsTable from "./_components/AdminCouponsTable";
import AddCouponModal from "./_components/AddCouponModal";

const CouponsPage = () => {
  const { loading, isModalOpen, setIsModalOpen } = useAppContext();
  const { allData, setAllData, saveCoupon, providers, categories, services } =
    useAdminCoupons();
  const pageSize = 10;

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h4>Coupons</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-(--primary-blue) text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus size={15} /> Add Coupon
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : allData && allData.length < 0 ? (
        <NoFoundData />
      ) : (
        <AdminCouponsTable
          allData={allData}
          setAllData={setAllData}
          providers={providers}
          categories={categories}
          services={services}
          pageSize={pageSize}
        />
      )}

      {isModalOpen && <AddCouponModal onSubmit={saveCoupon} />}
    </div>
  );
};

export default CouponsPage;
