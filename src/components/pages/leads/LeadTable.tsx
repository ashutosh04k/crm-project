import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Layout, message, Modal, Select, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { FeatureList, isFeatureAllowed } from '../../../helpers/utils/App.FeatureAuth';
import { FetchAllAdmin, FetchAllExecutiveByManagerId, FetchAllTeamLead, LeadAssign } from '../../../services/Api_Service';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useSelector } from 'react-redux';

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
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
}

const LeadTable: React.FC<LeadTableProps> = ({ leads, filter, CurrentRole }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedLead, setSelectedLead] = useState<DataType | null>(null);
  const [assignableUsers, setAssignableUsers] = useState<{ id: string; name: string }[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Option } = Select;
  const { id } = useSelector((state: any) => state.auth?.user);
  const [form] = Form.useForm();

  

  // const [processedLeads, setProcessedLeads] = useState<DataType[]>([]);

  // useEffect(() => {
  //   const fetchAssignedNames = async () => {
  //     const updatedLeads = await Promise.all(
  //       leads.map(async (lead) => {
  //         try {
  //           // const assignedByUser = await FetchUserById(lead.assignedBy);
  //           // const assignedToUser = await FetchUserById(lead.assignedTo);

  //           return {
  //             ...lead,
  //             // assignedByName: assignedByUser?.data?.name || 'Unknown',
  //             // assignedToName: assignedToUser?.data?.name || 'Unknown',
  //           };
  //         } catch (error) {
  //           console.error('Error fetching user:', error);
  //           return {
  //             ...lead,
  //             // assignedByName: 'Error',
  //             // assignedToName: 'Error',
  //           };
  //         }
  //       })
  //     );
  //     setProcessedLeads(updatedLeads);
  //   };

  //   fetchAssignedNames();
  // }, [leads]);


  const columns: TableColumnsType<DataType> = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
    },
    {
      title: 'Client Phone',
      dataIndex: 'clientPhone',
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
      render: (date: string) => formatReadableDate(date),
    },
    {
      title: 'Assigned By',
      dataIndex: 'assignedByName',
    },
    {
      title: 'Assigned To',
      dataIndex: "assignedToName",
    },
    {
      title: 'Status',
      dataIndex: "leadStatus",
    },
    ...(isFeatureAllowed(FeatureList.TEAMLEAD_AUTH)
      ? [
        {
          title: 'Action',
          dataIndex: 'Action',
          render: (_: any, record: DataType) => (
            <Button onClick={() => showModal(record)}>Assign</Button>
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

const handleAssign = async () => {
  try {
    const values = await form.validateFields();

    const leadId = selectedLead?.id?.toString(); 
    const assignedToId = values.assignedTo; // the selected user from dropdown
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
    // Optional: refresh leads or update state
  } catch (err) {
    console.error("Assignment failed:", err);
    message.error("Lead assignment failed.");
  }
};



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
        // assignedToName: selectedLead.assignedToName,
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
        rowSelection={rowSelection}
        columns={columns}
        dataSource={leads} // Use the preprocessed leads
      />
      <Modal
        title={`Assign Lead`}
        open={isModalVisible}
        footer={(_,) => (
          <>
            <Button onClick={handleAssign}>Assign</Button>
          </>
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

          {/* <Form.Item name="leadPriority" label="Lead Priority">
      <Input disabled />
    </Form.Item>

    <Form.Item name="leadSource" label="Lead Source">
      <Input disabled />
    </Form.Item>

    <Form.Item name="leadStatus" label="Lead Status">
      <Input disabled />
    </Form.Item> */}

          <Form.Item name="assignedByName" label="Assigned By">
            <Input disabled />
          </Form.Item>

          {/* <Form.Item name="assignedToName" label="Assigned To">
      <Input />
    </Form.Item> */}
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


    </>
  );
};

export default LeadTable;