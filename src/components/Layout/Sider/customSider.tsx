import React from 'react';
import {
  ContainerOutlined,
  DesktopOutlined,
  UserOutlined,
  SettingOutlined,
  PieChartOutlined,
  UsergroupAddOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FeatureList, isFeatureAllowed } from '../../../helpers/utils/App.FeatureAuth';

type MenuItem = Required<MenuProps>['items'][number];

const baseMenuItems = [
  { key: '/dashboard', icon: <PieChartOutlined />, label: 'Dashboard', },
  { key: '/leads', icon: <DesktopOutlined />, label: 'Leads' },
];

const featureBasedMenuItems = (): MenuItem[] => {
  const items: MenuItem[] = [];

  if (isFeatureAllowed(FeatureList.TEAMLEAD_AUTH)) {
    items.push(
      { key: '/teams', icon: <UsergroupAddOutlined />, label: 'Team' },
    );
  }
  if (isFeatureAllowed(FeatureList.SUPERADMIN_AUTH)) {
    items.push(
      { key: '/users', icon: <UserOutlined />, label: 'Users' }
    );
  }

  if (isFeatureAllowed(FeatureList.ADMIN_AUTH)) {
    items.push({ key: '/reports', icon: <ContainerOutlined />, label: 'Report',disabled:true  });
  }

  if (isFeatureAllowed(FeatureList.CRM_ADMIN)) {
    items.push({ key: '/createUser', icon: <UserAddOutlined />, label: 'Create User' });
  }
  items.push(  { key: '/settings', icon: <SettingOutlined />, label: 'Settings',disabled:true }
);

  return items;
};

const CustomSider: React.FC<{ onSelectKey: (key: string) => void }> = ({ onSelectKey }) => {
  const navigate = useNavigate();

  const items: MenuItem[] = [...baseMenuItems, ...featureBasedMenuItems()];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    onSelectKey(e.key);
    navigate(e.key);
  };

  return (
    <div className="h-screen flex flex-col bg-white relative p-1">
      <Menu
        mode="inline"
        theme="light"
        items={items}
        onClick={handleMenuClick}
        defaultSelectedKeys={[window.location.pathname]}
      />
    </div>
  );
};

export default CustomSider;
