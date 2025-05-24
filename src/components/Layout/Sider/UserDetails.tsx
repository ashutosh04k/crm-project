import React from 'react';
import {  Menu, message } from 'antd';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/hooks';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { logOutUser, setUser } from '../../../store/auth-slice/Authslice'; 
const availableRole: { id: number; role: string }[] = [
  { id: 1, role: 'SuperAdmin' },
  { id: 2, role: 'Admin' },
  { id: 3, role: 'TeamLead' },
  { id: 4, role: 'Executive' },
];

const UserDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const usersDetail = useSelector((store: { auth: { user: any } }) => store?.auth?.user)

  const handleLogOut = async () => {
    dispatch(logOutUser())
    .then(()=>{
      console.log("LogOut Successfully")
    })
    .catch((error)=>{
      console.error("LogOut Failed",error)
    })
    }
  const changeRole: MenuProps['onClick'] = (e) => {
    if (e.key === "LogOut") {
        
      handleLogOut();
    }
    if(e.key === "profile"){
      navigate('/settings')
    }
  
    if (e.key.startsWith("role-")) {
      const roleIndex = parseInt(e.key.split('-')[1]);
      const roleObj = availableRole[roleIndex];
  
      if (roleObj) {
        dispatch(setUser({
          user: {
            role: roleObj.role,
            id: localStorage.getItem("UserId")|| "anar",
            name:localStorage.getItem("Name") || "anar",
            email:localStorage.getItem("Email") || "anar",
          },
        }));
      }
    }
  };
  

  const items: MenuProps['items'] = [
    {
      key: 'Account',
      label: 'Account',
      icon: <UserOutlined />,
      children: [
        {
          key: 'role',
          label: usersDetail?.role,
          ...(usersDetail?.role === "CRMAdministrator"
            ? {
                children: [
                  {
                    type: 'group',
                    children: availableRole.map((role, index) => ({
                      key: `role-${index}`,
                      label: role.role,
                    })),
                  },
                ],
              }
            : {}), // explicitly avoid 'children' for non-CRMAdministrator
        },        
        {
            key:"profile",
            label:<>Profile</>
        },
        {
            key:"LogOut",
            label:<>LogOut</>
        }
      ],
    },
  ];

  return (
    <Menu
      theme="light"
      items={items}
      onClick={changeRole}
      style={{ width: 150,border:'1px solid red' }}
      mode="vertical"
      selectable={false}
      className='rounded-xl p-4'
      
    />
  );
};

export default UserDetails;
