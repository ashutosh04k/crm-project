import { Col, Row, Table } from 'antd';
import type { TableProps } from 'antd';
import { FetchAllExecutiveByManagerId } from '../../../services/Api_Service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


interface DataType {
  key: string;
  name: string;
  phone: number;
  email : string;
  role: string;
  manager: string;

}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Phone No',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title:'Role',
    dataIndex : "role",
    key:'role'
  },
  {
    title:'Manager Name',
    dataIndex:'manager',
    key:'manager'
  },
];


const TeamLeadTeams = () => {

    const UserId = useSelector((state: any) => state.auth?.user?.id);

  const [TeamLeads,setTeamsLeads] = useState([]);
  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await FetchAllExecutiveByManagerId(UserId);
        console.log(response,"teamleads")
        setTeamsLeads(response)
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchTeamLeads();
  }, []);

  
  return (
  <>
  <Row gutter={[16, 16]} style={{ margin: '0 auto',minHeight:'100vh' }}>
    <Col span={24}>
      <Table<DataType> columns={columns} dataSource={TeamLeads} />
    </Col>
  </Row>
  </>)
}

export default TeamLeadTeams;