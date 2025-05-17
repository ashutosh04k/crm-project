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
import { useSelector } from 'react-redux';
import { FeatureList, isFeatureAllowed } from '../../../helpers/utils/App.FeatureAuth';

type MenuItem = Required<MenuProps>['items'][number];

const CustomSider: React.FC<{ onSelectKey: (key: string) => void }> = ({ onSelectKey }) => {
  const navigate = useNavigate();
  
  // Get current role using Redux (this will help check if the feature is allowed)

  // Define the items array, conditionally adding "Create User" based on the current role and feature permissions
  const items: MenuItem[] = [
    { key: '/dashboard', icon: <PieChartOutlined />, label: 'Dashboard' },
    { key: '/leads', icon: <DesktopOutlined />, label: 'Leads' },
    { key: '/teams', icon: <UsergroupAddOutlined />, label: 'Team' },
    ...(isFeatureAllowed(FeatureList.ADMIN_AUTH) ? [

      { key: '/reports', icon: <ContainerOutlined />, label: 'Report' },
    ] : []),

    { key: '/users', icon: <UserOutlined />, label: 'Users' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
    
    // Conditionally render "Create User" based on the feature access for CRM_ADMIN
    ...(isFeatureAllowed(FeatureList.CRM_ADMIN) ? [
      { key: '/createUser', icon: <UserAddOutlined />, label: 'Create User' }
    ] : [])
  ];

  // Handle menu item click
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('Menu item clicked:', e);
    onSelectKey(e.key);
    navigate(e.key); 
  }

  return (
    <div className="h-screen flex flex-col bg-white relative p-1">
      {/* Menu */}
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        items={items}
        onClick={handleMenuClick}
      />

      {/* Avatar at the bottom */}
      {/* <div className="p-4 flex justify-start items-center absolute bottom-0 w-full">
        <UserDetails />
      </div> */}
    </div>
  );
};

export default CustomSider;
