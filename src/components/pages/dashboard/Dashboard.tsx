
import { Spin } from "antd";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import TeamLeadDashboard from "./TeamLeadDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {

  const CurrentRole = useSelector((state: any) => state.auth?.user?.role);
  return CurrentRole === undefined ? (
    <Spin size="large"/>
  ): (
    <div>

      {(CurrentRole === "SuperAdmin" || CurrentRole === "CRMAdministrator") &&(<SuperAdminDashboard/>) }
      {(CurrentRole === "Admin") &&(<AdminDashboard/>) }
      {(CurrentRole === "TeamLead") &&(<TeamLeadDashboard/>) }
      {(CurrentRole === "User") &&(<UserDashboard/>) }

    </div>
  )
}

export default Dashboard