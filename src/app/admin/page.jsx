import DashboardCharts from "./_components/DashboardCharts";
import DashboardTopProviderTables from "./_components/DashboardTopProviderTables";
import StatCards from "./_components/StatCards";

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
