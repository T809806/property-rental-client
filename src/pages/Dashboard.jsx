import AdminDashboard from "./AdminDashboard";
import OwnerDashboard from "./OwnerDashboard";
import TenantDashboard from "./TenantDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <div>Please Login</div>;
  }

  if (user.role === "Admin") {
    return <AdminDashboard />;
  }

  if (user.role === "Owner") {
    return <OwnerDashboard />;
  }

  return <TenantDashboard />;
};

export default Dashboard;