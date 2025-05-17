import { Col, Row, Table } from 'antd';
import type { TableProps } from 'antd';
import { GetAllUser } from '../../../services/Api_Service';
import { useEffect, useState } from 'react';


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
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];


const Users = () => {

  const [users,setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUser();
        setUsers(response)
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
  <>
  <Row gutter={[16, 16]} style={{ margin: '0 auto',minHeight:'100vh' }}>
    <Col span={24}>
      <Table<DataType> columns={columns} dataSource={users} />
    </Col>
  </Row>
  </>)
}

export default Users;