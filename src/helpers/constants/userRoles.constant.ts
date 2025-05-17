export const USER_ROLES = {
    SUPER_ADMIN: "SuperAdmin",
    ADMIN: "Admin",
    TEAM_LEADER: "TeamLead",
    EXECUTIVE: "Executive",
  };
  
  export const USER_ROLE_OPTIONS = Object.entries(USER_ROLES).map(
    ([key, value]) => ({
      id: key,
      label: value,
    })
  );
  