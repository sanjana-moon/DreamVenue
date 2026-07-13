import { fetchAdminDashboard } from "@/lib/api/venues/data";
import AdminDashboardClient from "./AdminDashboardClient";

const AdminDashboardPage = async () => {
  const dashboard = await fetchAdminDashboard();

  return <AdminDashboardClient dashboard={dashboard} />;
};

export default AdminDashboardPage;