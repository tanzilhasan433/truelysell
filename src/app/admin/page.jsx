import DashboardCharts from "@/components/admin/dashboard/DashboardCharts";
import DashboardTopProviderTables from "@/components/admin/dashboard/DashboardTopProviderTables";
import StatCards from "@/components/admin/dashboard/StatCards";

const AdminDashboardPage = () => {
  return (
    <div>
      <StatCards />
      <DashboardCharts />
      <DashboardTopProviderTables />
    </div>
  );
};

export default AdminDashboardPage;
