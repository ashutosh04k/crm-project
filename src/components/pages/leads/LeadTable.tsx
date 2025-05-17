import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { FeatureList, isFeatureAllowed } from '../../../helpers/utils/App.FeatureAuth';
import { FetchUserById } from '../../../services/Api_Service';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  clientName: string;
  clientPhone: string;
  projectInterested: string;
  leadPriority: string;
  leadSource: string;
  createdAt: string;
  leadStatus: string;
  assignedBy: string;
  assignedTo : string;
  assignedByName?: string; // Add a new field for the user name
}

interface LeadTableProps {
  leads: DataType[];
  filter: string;
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

const LeadTable: React.FC<LeadTableProps> = ({ leads, filter }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
  console.log(leads,"from table")
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
    {
      title: 'Priority',
      dataIndex: 'leadPriority',
    },
    {
      title: 'Lead Source',
      dataIndex: 'leadSource',
    },
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
      title:'Status',
      dataIndex :"leadStatus",
    },
    ...(isFeatureAllowed(FeatureList.ADMIN_AUTH)
      ? [
          {
            title: 'Action',
            dataIndex: 'Action',
            render: () => <Button onClick={showModal}>Assign</Button>,
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={leads} // Use the preprocessed leads
      />
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default LeadTable;