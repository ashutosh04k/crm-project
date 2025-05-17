import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import General from './General';
import {  useSelector } from 'react-redux';

const onChange=(e:any)=>{
  console.log(e)
}
const Settings = () => {
  const {role,name,email,phone,managerId} = useSelector((state: any) => state.auth?.user);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'General',
      children: <General role={role} email={email} phone={phone} name={name} managerId={managerId}/>,
    },
    {
      key: '2',
      label: 'Control',
      children: 'Content of Tab Pane 2',
      disabled: true,
    },
    {
      key: '3',
      label: 'Access',
      children: 'Content of Tab Pane 3',
      disabled: true
    },
  ];
  return (
  <>
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
</>)
};

export default Settings;