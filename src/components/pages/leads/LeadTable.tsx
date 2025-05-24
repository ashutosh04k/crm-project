import React, { memo, useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Select, Table, Typography } from 'antd';
import type { TableColumnsType, TableProps, MenuProps } from 'antd';
import { FeatureList, isFeatureAllowed } from '../../../helpers/utils/App.FeatureAuth';
import { FetchAllAdmin, FetchAllExecutiveByManagerId, FetchAllTeamLead, LeadAssign, LeadStatusUpdate } from '../../../services/Api_Service';
import { useSelector } from 'react-redux';
import { EditOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { LEAD_PRIORITY_OPTIONS } from '../../../helpers/constants/userRoles.constant';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  id: string;
  clientName: string;
  clientPhone: string;
  projectInterested: string;
  leadPriority: string;
  leadSource: string;
  createdAt: string;
  leadStatus: string;
  assignedBy: string;
  assignedTo: string;
  assignedByName?: string; // Add a new field for the user name
}

interface UpdateLead{
  leadPriority:string,
  remarks:string,
}
interface LeadTableProps {
  leads: DataType[];
  filter: string;
  CurrentRole: "SuperAdmin" | "Admin" | "TeamLead" | "Executive";
}


function formatReadableDate(isoString: any) {
  if (!isoString) return '-';
  const date = new Date(isoString);
  return isNaN(date.getTime())
    ? '-'
    : date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: 'numeric',
      // minute: '2-digit',
      // hour12: true,
    });
}

const LeadTable: React.FC<LeadTableProps> = memo(({ leads, filter, CurrentRole }) => {

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [updateLead, setUpdateLead] = useState({
    remarks:"",
    leadPriority:""
  });
  const [selectedLead, setSelectedLead] = useState<DataType | null>(null);
  const [assignableUsers, setAssignableUsers] = useState<{ id: string; name: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModificationModalVisible, setModificationModalVisible] = useState(false);
  const { id } = useSelector((state: any) => state.auth?.user);
  const [form] = Form.useForm();
  const [updateform] = Form.useForm();

  const handlestatusUpdate = async (newStatus: string, leadId: string) => {
    const payload = {
      leadStatus: newStatus,
    };
    try {
      const response = await LeadStatusUpdate(leadId, payload);
      message.success('Lead status updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      message.error('Failed to update lead status.');
    }
  };

  const items: MenuProps['items'] = [
    { key: 'New', label: 'New' },
    { key: 'InProgress', label: 'InProgress' },
    { key: 'Converted', label: 'Converted' },
    { key: 'Unconverted', label: 'Unconverted' },
    { key: 'Closed', label: 'Closed' },
  ];

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
    },
    {
      title: 'Client Phone',
      dataIndex: 'clientPhone',
      render: (_: any, record: DataType) => (
        <Typography.Text
          style={{ color: '#1890ff', cursor: 'pointer' }}
          onClick={() => handleCall(record.clientPhone)}
        >
          {record.clientPhone}
        </Typography.Text>
      )
    },
    {
      title: 'Project Interested In',
      dataIndex: 'projectInterested',
    },
    // {
    //   title: 'Priority',
    //   dataIndex: 'leadPriority',
    // },
    // {
    //   title: 'Lead Source',
    //   dataIndex: 'leadSource',
    // },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      // sorter:true,
      render: (date: string) => formatReadableDate(date),
    },
    {
      title: 'Assigned By',
      dataIndex: 'assignedByName',
    },
    ...(isFeatureAllowed(FeatureList.SUPERADMIN_AUTH)
      ? [
        {
          title: 'Assigned To',
          dataIndex: "assignedToName",
        }
      ]
      : []),
    {
      title: 'Status',
      dataIndex: "leadStatus",
      render: (_: any, record: DataType) => (
        <Dropdown menu={{ items, onClick: ({ key }) => handlestatusUpdate(key, record.id) }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {record.leadStatus}<EditOutlined />
            </Space>
          </a>
        </Dropdown>
      )
    },
    ...(isFeatureAllowed(FeatureList.TEAMLEAD_AUTH)
      ? [
        {
          title: 'Assign',
          dataIndex: 'Assign',
          render: (_: any, record: DataType) => (
            <div className="flex items-center justify-center h-full w-full">
              <UsergroupAddOutlined onClick={() => showModal(record)} />
            </div>
          ),
        },

      ]
      : []),
    ...(isFeatureAllowed(FeatureList.ADMIN)
      ? [
        {
          title: 'Update',
          dataIndex: 'Update',
          render: (_: any, record: DataType) => (
            <div className='flex items-center justify-center h-full w-full'>
              <EditOutlined onClick={() => showModalModify(record)} />

            </div>
          ),
        },

      ]
      : []),
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          setSelectedRowKeys(changeableRowKeys.filter((_, index) => index % 2 === 0));
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          setSelectedRowKeys(changeableRowKeys.filter((_, index) => index % 2 !== 0));
        },
      },
    ],
  };

  const showModal = (lead: DataType) => {
    setIsModalVisible(true);
    setSelectedLead(lead);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalModify = (lead: DataType) => {
    setModificationModalVisible(true);
    setSelectedLead(lead);
  }

  const handleModifyOk = () => {
    setModificationModalVisible(false);
  }

  const handleModifycancel = () => {
    setModificationModalVisible(false);
  }
  const handleAssign = async () => {
    try {
      const values = await form.validateFields();

      const leadId = selectedLead?.id?.toString();
      const assignedToId = values.assignedTo;
      if (!leadId || !assignedToId) {
        console.error("Missing lead ID or assigned user ID");
        return;
      }

      const payload = {
        leadIds: [leadId],
      };


      const result = await LeadAssign(assignedToId, payload);

      setIsModalVisible(false);
      message.success("Lead assigned successfully!");
    } catch (err) {
      console.error("Assignment failed:", err);
      message.error("Lead assignment failed.");
    }
  };

  const handleCall = (phoneNumber: any) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleUpdate = async() =>{
    const leadId = selectedLead?.id?.toString();
    const remarksorpriority = updateLead?.remarks || updateLead?.leadPriority;
    if (!leadId || !remarksorpriority) {
      message.error("Lead ID or Remark or prority is missing.");
      return;
    }
    const payload = {
      remarks: updateLead?.remarks,
      leadPriority: updateLead?.leadPriority,
    }
    const result = await LeadStatusUpdate(leadId, payload);
      setUpdateLead({ remarks: "", leadPriority: "" });
  updateform.resetFields();
  setModificationModalVisible(false);
  }

  useEffect(() => {
    if (selectedLead) {
      form.setFieldsValue({
        clientName: selectedLead.clientName,
        clientPhone: selectedLead.clientPhone,
        projectInterested: selectedLead.projectInterested,
        leadPriority: selectedLead.leadPriority,
        leadSource: selectedLead.leadSource,
        leadStatus: selectedLead.leadStatus,
        assignedByName: selectedLead.assignedByName,
        createdAt: formatReadableDate(selectedLead.createdAt),
      });
    }
  }, [selectedLead, form]);

  useEffect(() => {
    const fetchAssignableUsers = async () => {
      try {
        let users = [];

        if (CurrentRole === 'SuperAdmin') {
          users = await FetchAllAdmin(); // You need to define this
        } else if (CurrentRole === 'Admin') {
          users = await FetchAllTeamLead();
        } else if (CurrentRole === 'TeamLead') {
          users = await FetchAllExecutiveByManagerId(id); // You need to define this
        }

        if (users) setAssignableUsers(users);
      } catch (error) {
        console.error("Error fetching assignable users:", error);
      }
    };

    fetchAssignableUsers();
  }, [CurrentRole]);


  return (
    <>
      <Table<DataType>
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={leads}
      />
      <Modal
        title={`Assign Lead`}
        open={isModalVisible}
        footer={(_,) => (
            <Button onClick={handleAssign}>Assign</Button>
        )}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="horizontal">
          <Form.Item name="clientName" label="Client Name">
            <Input disabled />
          </Form.Item>

          <Form.Item name="clientPhone" label="Client Phone">
            <Input disabled />
          </Form.Item>

          <Form.Item name="projectInterested" label="Project Interested">
            <Input disabled />
          </Form.Item>

          <Form.Item name="assignedByName" label="Assigned By">
            <Input disabled />
          </Form.Item>

          <Form.Item name="assignedTo" label="Assigned To">
            <Select
              placeholder={`Select ${CurrentRole === 'SuperAdmin' ? 'Admin' : CurrentRole === 'Admin' ? 'team lead' : 'executive'}`}
              onChange={(value, option) => {
                form.setFieldsValue({ assignedToName: option?.children });
              }}
            >
              {assignableUsers.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item name="createdAt" label="Created At">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={`Update Lead`}
        open={isModificationModalVisible}
        footer={(_,) => (
          <>
            <Button onClick={handleUpdate}>Update</Button>
          </>
        )}
        onOk={handleModifyOk}
        onCancel={handleModifycancel}
      >
        <Form form={updateform} layout='horizontal'>

        <Form.Item label="Lead Priority" name="leadPriority" rules={[{ required: true, message: 'Please input!' }]}>
          <Select
            placeholder={`Select the Priority`}
            onChange={(value) => setUpdateLead((prev) => ({ ...prev, leadPriority: value }))}
          >
            {LEAD_PRIORITY_OPTIONS.map((data) => (
              <Select.Option key={data.id} value={data.label}>
                {data.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Remarks"
          name="remarks"
          rules={[{ message: 'Please input!' }]}
          >
          <Input.TextArea onChange={(e)=>setUpdateLead((prev)=>({...prev,remarks:e.target.value}))}/>
        </Form.Item>
          </Form>
      </Modal>

    </>
  );
});

export default LeadTable;