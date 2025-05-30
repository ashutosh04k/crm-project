import { Spin } from "antd";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import SuperAdminTeams from "./SuperAdminTeams";
import AdminTeams from "./AdminTeams";
import TeamLeadTeams from "./TeamLeadTeams";

type Role = "SuperAdmin" | "CRMAdministrator" | "Admin" | "TeamLead" | "User" | undefined;

const selectAuth = (state: { auth?: { user?: { role: Role } } }) => state.auth;
const selectUserRole = createSelector([selectAuth], (auth) => auth?.user?.role);

const roleToComponent: Partial<Record<Exclude<Role, undefined>, React.ComponentType>> = {
  CRMAdministrator: SuperAdminTeams,
  SuperAdmin: SuperAdminTeams,
  Admin: AdminTeams,
  TeamLead: TeamLeadTeams,
};

const Leads = () => {
  const currentRole = useSelector(selectUserRole);

  if (currentRole === undefined) {
    return <Spin size="large" />;
  }

  const Component = roleToComponent[currentRole];
  return (
    <div className=" rounded-lg">
      {Component ? <Component /> : null}
    </div>
  );
};

export default Leads;