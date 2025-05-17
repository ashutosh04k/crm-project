import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import React from 'react';

// 1. Define all roles
export enum RoleList {
  CRM_ADMINISTRATOR = "CRMAdministrator",
  SUPER_ADMIN = "SuperAdmin",
  ADMIN = "Admin",
  TEAM_LEADER = "TeamLead",
  EXECUTIVE = "Executive",
}

// 2. Define all features
export enum FeatureList {
  DELETE_LEAD = 'DELETE_LEAD',
  VIEW_REPORT = 'VIEW_REPORT',
  ADMIN_AUTH = 'ADMIN_AUTH',
  EDIT_USER = 'EDIT_USER',
  ASSIGN_TASK = 'ASSIGN_TASK',
  CRM_ADMIN = 'CRM_ADMIN',
  ADMIN= 'ADMIN'
}

// 3. Map features to roles
export const featureToRoleMap: Record<FeatureList, RoleList[]> = {
  [FeatureList.CRM_ADMIN]: [RoleList.CRM_ADMINISTRATOR],
  [FeatureList.ADMIN_AUTH] : [RoleList.CRM_ADMINISTRATOR,RoleList.ADMIN,RoleList.SUPER_ADMIN],
  [FeatureList.DELETE_LEAD]: [RoleList.SUPER_ADMIN, RoleList.ADMIN],
  [FeatureList.VIEW_REPORT]: [RoleList.SUPER_ADMIN, RoleList.ADMIN, RoleList.TEAM_LEADER],
  [FeatureList.ADMIN] : [RoleList.ADMIN],
  [FeatureList.EDIT_USER]: [RoleList.SUPER_ADMIN],
  [FeatureList.ASSIGN_TASK]: [RoleList.SUPER_ADMIN, RoleList.TEAM_LEADER],
};

// 4. Utility for use **outside** React (e.g., inside config arrays)
export const isFeatureAllowed = (feature: FeatureList): boolean => {
  const currentRole = useSelector((state: RootState) => state.auth?.user?.role);
  return featureToRoleMap[feature]?.includes(currentRole as RoleList) ?? false;
};

// 5. Component for use **inside** React JSX
interface FeatureAuthProps {
  feature: FeatureList;
  children: React.ReactNode;
}

export const FeatureAuth: React.FC<FeatureAuthProps> = ({ feature, children }) => {
  const currentRole = useSelector((state: any) => state.auth?.user?.role);
  const isAllowed = featureToRoleMap[feature]?.includes(currentRole as RoleList) ?? false;
  return isAllowed ? children : null;
};
