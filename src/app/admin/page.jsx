import DashboardCharts from "@/components/admin/DashboardCharts";
import DashboardTopProviderTables from "@/components/admin/DashboardTopProviderTables";
import StatCards from "@/components/admin/StatCards";

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
