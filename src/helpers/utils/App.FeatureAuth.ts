import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import React from 'react';

export enum RoleList {
  CRM_ADMINISTRATOR = "CRMAdministrator",
  SUPER_ADMIN = "SuperAdmin",
  ADMIN = "Admin",
  TEAM_LEADER = "TeamLead",
  EXECUTIVE = "Executive",
}

export enum FeatureList {
  ADMIN_AUTH = 'ADMIN_AUTH',
  TEAMLEAD_AUTH = 'TEAMLEAD_AUTH',
  SUPERADMIN_AUTH = 'SUPERADMIN_AUTH',
  ASSIGN_TASK = 'ASSIGN_TASK',
  CRM_ADMIN = 'CRM_ADMIN',
  ADMIN= 'ADMIN'
}

export const featureToRoleMap: Record<FeatureList, RoleList[]> = {
  [FeatureList.TEAMLEAD_AUTH] : [RoleList.CRM_ADMINISTRATOR,RoleList.SUPER_ADMIN,RoleList.ADMIN,RoleList.TEAM_LEADER],
  [FeatureList.ADMIN_AUTH] : [RoleList.CRM_ADMINISTRATOR,RoleList.SUPER_ADMIN,RoleList.ADMIN],
  [FeatureList.SUPERADMIN_AUTH]: [RoleList.CRM_ADMINISTRATOR,RoleList.SUPER_ADMIN],
  [FeatureList.CRM_ADMIN]: [RoleList.CRM_ADMINISTRATOR],
  [FeatureList.ADMIN] : [RoleList.CRM_ADMINISTRATOR,RoleList.ADMIN],
  [FeatureList.ASSIGN_TASK]: [RoleList.SUPER_ADMIN, RoleList.TEAM_LEADER],
};

export const isFeatureAllowed = (feature: FeatureList): boolean => {
  const currentRole = useSelector((state: RootState) => state.auth?.user?.role);
  return featureToRoleMap[feature]?.includes(currentRole as RoleList) ?? false;
};

interface FeatureAuthProps {
  feature: FeatureList;
  children: React.ReactNode;
}

export const FeatureAuth: React.FC<FeatureAuthProps> = ({ feature, children }) => {
  const currentRole = useSelector((state: any) => state.auth?.user?.role);
  const isAllowed = featureToRoleMap[feature]?.includes(currentRole as RoleList) ?? false;
  return isAllowed ? children : null;
};
