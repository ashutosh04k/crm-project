import { Button, Col, Form, message, Modal, Row, Select, Table } from 'antd';
import type { TableProps } from 'antd';
import { AssignManager, DeleteUser, GetAllUser } from '../../../services/Api_Service';
import { useEffect, useState } from 'react';
import { ApiOutlined, DeleteOutlined } from '@ant-design/icons';
import { FeatureList, isFeatureAllowed } from '../../../helpers/utils/App.FeatureAuth';
import { useAdmins } from '../../hooks/useAdmin';
import { useTeamLeads } from '../../hooks/useTeamLead';


interface DataType {
  key: string;
  name: string;
  phone: number;
  email: string;
  role: string;
  manager: string;

}

const Users = () => {

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const teamLeads = useTeamLeads();
  const Admins = useAdmins();
  const [form] = Form.useForm();
  
  const AllManager = [
    ...Admins,
    ...teamLeads
  ];

  const handleDeleteUser = async (Record: any) => {
    try {
      const response = await DeleteUser(Record?.id);
      message.success("User Deleted Successfully ");
    } catch (error) {
      message.error("Error in delting the user");
    }
  }

  const handleOk = async () => {
  try {
    const values = await form.validateFields();
    const payload = {
      managerId: values.Assign_Manager,
    };
    
    if (selectedUserId) {
      await AssignManager(selectedUserId, payload);
    } else {
      message.error("No user selected for assigning manager.");
      return;
    }
    message.success("Manager assigned successfully!");
    setOpenModal(false);
    form.resetFields();
    setSelectedUserId(null);
  } catch (error) {
    message.error("Error in assigning Manager");
  }
};


  const showModal = (Record: any) => {
    setOpenModal(true);
    setSelectedUserId(Record?.id);
  };

const handleCancel = () => {
  setOpenModal(false);
  form.resetFields();
  setSelectedUserId(null);
};

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
      title: 'Role',
      dataIndex: "role",
      key: 'role'
    },
    {
      title: 'Manager Name',
      dataIndex: 'manager',
      key: 'manager',
    },
    ...(isFeatureAllowed(FeatureList.CRM_ADMIN)
      ? [
        {
          title: 'Action',
          dataIndex: "Action",
          render: (_: any, record: DataType) => (
            <Button onClick={() => handleDeleteUser(record)}><DeleteOutlined /></Button>
          ),
        },
      ]
      : []),
    ...(isFeatureAllowed(FeatureList.CRM_ADMIN)
      ? [
        {
          title: 'A.Manager',
          dataIndex: "Assign",
          render: (_: any, record: DataType) => (
            <Button onClick={() => showModal(record)}><ApiOutlined /></Button>
          ),
        },
      ]
      : []),
  ];
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUser();
        const filterddata = response.filter((item: any) => item.role !== "CRMAdministrator")
        setUsers(filterddata)
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Row gutter={[16, 16]} style={{ margin: '0 auto', minHeight: '100vh' }}>
        <Col span={24}>
          <Table<DataType> columns={columns} dataSource={users} />
        </Col>
      </Row>
      <Modal
  title="Assign Manager"
  open={openModal}
  onOk={handleOk}
  onCancel={handleCancel}
>
  <Form form={form} layout="horizontal">
    <Form.Item
      name="Assign_Manager"
      label="Assign Manager"
      rules={[{ required: true, message: "Please select a manager" }]}
    >
      <Select
        onChange={(value, option) => {
          form.setFieldsValue({ assignedToName: option?.children });
        }}
      >
        {AllManager.map((user:any) => (
          <Select.Option key={user?.value} value={user?.value}>
            {user.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  </Form>
</Modal>
    </>)
}

export default Users;