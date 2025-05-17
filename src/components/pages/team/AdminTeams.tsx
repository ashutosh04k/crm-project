import { Col, Row, Table, Typography, Modal } from 'antd';
import type { TableProps } from 'antd';
import { FetchAllExecutiveByManagerId, FetchAllTeamLead } from '../../../services/Api_Service';
import { useEffect, useState } from 'react';

const { Title } = Typography;

interface DataType {
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

const AdminTeams = () => {
  const [teamLeads, setTeamLeads] = useState<DataType[]>([]);
  const [executives, setExecutives] = useState<ExecutiveType[]>([]);
  const [selectedTeamLeadName, setSelectedTeamLeadName] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNameClick = async (record: DataType) => {
    try {
      const response = await FetchAllExecutiveByManagerId(record.id);
      const formatted = response.map((item: any, index: number) => ({
        ...item,
        key: item.id || index.toString(),
      }));
      setExecutives(formatted);
      setSelectedTeamLeadName(record.name);
      setModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch executives:", error);
    }
  };

  const teamLeadColumns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record) => (
        <a style={{ cursor: 'pointer', color: '#1890ff' }} onClick={() => handleNameClick(record)}>
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
    {
      title: 'Manager Name',
      dataIndex: 'manager',
      key: 'manager',
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
        const response = await FetchAllTeamLead();
        const formatted = response.map((item: any, index: number) => ({
          ...item,
          key: item.id || index.toString(),
        }));
        setTeamLeads(formatted);
      } catch (error) {
        console.error("Failed to fetch team leads:", error);
      }
    };
    fetchTeamLeads();
  }, []);

  return (
    <>
      <Row gutter={[16, 24]} style={{ margin: '0 auto', minHeight: '100vh' }}>
        <Col span={24}>
          <Title level={3}>Team Leads</Title>
          <Table<DataType> columns={teamLeadColumns} dataSource={teamLeads} />
        </Col>
      </Row>

      <Modal
        title={`Executives under ${selectedTeamLeadName}`}
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Table<ExecutiveType>
          columns={executiveColumns}
          dataSource={executives}
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </>
  );
};

export default AdminTeams;
