import { Col, Modal, Row, Table } from 'antd';
import type { TableProps } from 'antd';
import { FetchAllAdmin, FetchAllExecutiveByManagerId, FetchAllTeamLead } from '../../../services/Api_Service';
import { useEffect, useState } from 'react';

interface AdminType {
  key: string;
  name: string;
  phone: number;
  email: string;
  role: string;
  manager: string;
  id: string;

}
interface TeamLeadType {
  key: string;
  id: string;
  name: string;
  phone: number;
  email: string;
  role: string;
  manager: string;
}

interface ExecutiveType {
  key: string;
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  managerId: string;
}



const SuperAdminTeams = () => {

  const [TeamAdmins, setTeamAdmins] = useState([]);
  const [executives, setExecutives] = useState<ExecutiveType[]>([]);
  const [TeamLeads, setTeamLeads] = useState<TeamLeadType[]>([]);
  const [selectedAdminName, setSelectedAdminName] = useState<string | null>(null);
  const [selectedTeamLeadName, setSelectedTeamLeadName] = useState<string | null>(null);
  const [modalTeamLeadVisible, setModalTeamLeadVisible] = useState(false);
  const [modalExecutiveVisible, setModalExecutiveVisible] = useState(false);


  const handleAdminClick = async (record: AdminType) => {
    try {
      const response = await FetchAllTeamLead();
      const formatted = response.map((item: any, index: number) => ({
        ...item,
        key: item.id || index.toString(),
      }));
      setTeamLeads(formatted);
      setSelectedAdminName(record.name);
      setModalTeamLeadVisible(true);
    } catch (error) {

    }
  }

  const handleTeamLeadClick = async (record: TeamLeadType) => {
    try {
      const response = await FetchAllExecutiveByManagerId(record.id);
      const formatted = response.map((item: any, index: number) => ({
        ...item,
        key: item.id || index.toString(),
      }));
      setExecutives(formatted);
      setSelectedTeamLeadName(record.name);
      setModalExecutiveVisible(true);
    } catch (error) {
      console.error("Failed to fetch executives:", error);
    }
  };
  const columns: TableProps<AdminType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record) => (
        <a style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => handleAdminClick(record)}>
          {record.name}
        </a>
      ),
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
      title: 'Role',
      dataIndex: "role",
      key: 'role'
    },
    {
      title: 'Manager Name',
      dataIndex: 'manager',
      key: 'manager'
    },
  ];

  const TeamLeadColumns: TableProps<TeamLeadType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record) => (
        <a style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => handleTeamLeadClick(record)}>
          {record.name}
        </a>
      ),
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];


  const executiveColumns: TableProps<ExecutiveType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await FetchAllAdmin();
        setTeamAdmins(response)
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchTeamLeads();
  }, []);


  return (
    <>
      <Row gutter={[16, 16]} style={{ margin: '0 auto', minHeight: '100vh' }}>
        <Col span={24}>
          <Table<AdminType> columns={columns} dataSource={TeamAdmins} rowKey="id" />
        </Col>
      </Row>
      <Modal
        title={`TeamLead Under ${selectedAdminName}`}
        open={modalTeamLeadVisible}
        footer={null}
        onCancel={() => setModalTeamLeadVisible(false)}
        width={800}
      >
        <Table<TeamLeadType>
          columns={TeamLeadColumns}
          dataSource={TeamLeads}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </Modal>
      <Modal
        title={`Executives under ${selectedTeamLeadName}`}
        open={modalExecutiveVisible}
        footer={null}
        onCancel={() => setModalExecutiveVisible(false)}
        width={800}
      >
        <Table<ExecutiveType>
          columns={executiveColumns}
          dataSource={executives}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </Modal>
    </>)
}

export default SuperAdminTeams;