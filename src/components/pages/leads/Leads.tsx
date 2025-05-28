import { Spin } from "antd";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import SuperAdminLeads from "./SuperAdminLead";
import AdminLeads from "./AdminLeads";
import TeamLeadLeads from "./TeamLeads";
import UserLeads from "./UserLeads";

type Role = "SuperAdmin" | "CRMAdministrator" | "Admin" | "TeamLead" | "Executive" | undefined;

const selectAuth = (state: { auth?: { user?: { role: Role } } }) => state.auth;
const selectUserRole = createSelector([selectAuth], (auth) => auth?.user?.role);

const roleToComponent: Partial<Record<Exclude<Role, undefined>, React.ComponentType>> = {
  SuperAdmin: SuperAdminLeads,
  CRMAdministrator: SuperAdminLeads,
  Admin: AdminLeads,
  TeamLead: TeamLeadLeads,
  Executive: UserLeads,
};

const Leads = () => {
  const currentRole = useSelector(selectUserRole);

  if (currentRole === undefined) {
    return <Spin size="large" />;
  }

  const Component = roleToComponent[currentRole];
  return (
    <div className="rounded-lg">
      {Component ? <Component /> : null}
    </div>
  );
};

export default Leads;