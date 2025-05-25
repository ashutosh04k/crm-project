import { Button, Card, Col, Divider, Input, message, Modal, Row, Table, Typography } from 'antd';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import { useTeamLeads } from '../../hooks/useTeamLead';
import { useEffect, useState } from 'react';
import { CalendarOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { GetReportOfAdmin, GetReportOfTeamLead } from '../../../services/Api_Service';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const { Title } = Typography;

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [AdminData, setAdminData] = useState<any>(null);
  const [TeamLeadData, setTeamLeadData] = useState<any>(null);
  const [teamLeadIds, setTeamLeadIds] = useState<string[]>([]);
  const Teamleads = useTeamLeads();
  const [ExecutiveData, setExecutiveData] = useState<any>(null);

  useEffect(() => {
    if (Teamleads && Teamleads.length > 0) {
      const ids = Teamleads.map((lead: any) => lead.value);
      setTeamLeadIds(ids);
    }
  }, [Teamleads]);


  useEffect(() => {
    const fetchAllTeamLeadData = async () => {
      try {
        const response = await Promise.all(
          teamLeadIds.map(id => GetReportOfTeamLead(id))
        );
        setTeamLeadData(response);
        setExecutiveData(
          response
            .map((data: any) => data?.data?.executives || [])
            .flat()
        );
      } catch (error) {
        message.error("error in fetching Teamlead Data");
      }
    }
    if (teamLeadIds.length > 0) fetchAllTeamLeadData();
  }, [teamLeadIds])


  const showModal = () => {
    setOpen(true);
  };


  console.log(ExecutiveData, "executivedata")
  const FetchAdminData = async () => {
    try {
      const response = await GetReportOfAdmin();
      setAdminData(response?.data);
    } catch (error) { }
  };

  useEffect(() => {
    FetchAdminData();
  }, []);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
      if (value.length === 10) {
        setPhoneError('');
      } else {
        setPhoneError('Phone number must be exactly 10 digits');
      }
    }
  };

  const TeamLeadTab = () => {

    const columns: Array<{
      title: string;
      dataIndex: string[];
      key: string;
      align: 'left' | 'right' | 'center';
    }> = [
      {
        title: 'Name',
        dataIndex: ['data', 'teamLeadName'],
        key: 'teamLeadName',
        align: 'left',
      },
      {
        title: 'Total Leads Assigned',
        dataIndex: ['data', 'totalLeadsAssigned'],
        key: 'totalLeadsAssigned',
        align: 'center',
      },
      {
        title: 'New Leads',
        dataIndex: ['data', 'totalNewLeads'],
        key: 'totalNewLeads',
        align: 'center',
      },
      {
        title: 'In Progress Leads',
        dataIndex: ['data', 'totalInProgressLeads'],
        key: 'totalInProgressLeads',
        align: 'center',
      },
      {
        title: 'Converted Leads',
        dataIndex: ['data', 'totalLeadsConverted'],
        key: 'totalLeadsConverted',
        align: 'center',
      },
      {
        title: 'Unconverted Leads',
        dataIndex: ['data', 'totalLeadsUnconverted'],
        key: 'totalLeadsUnconverted',
        align: 'center',
      },
      {
        title: 'Closed Leads',
        dataIndex: ['data', 'totalLeadsClosed'],
        key: 'totalLeadsClosed',
        align: 'center',
      },
    ];
    return (
      <div>
        <Table dataSource={TeamLeadData} columns={columns} />
      </div>
    )
  };
  const ExecutiveTab = () => {

     const columns: Array<{
      title: string;
      dataIndex: string[];
      key: string;
      align: 'left' | 'right' | 'center';
    }> = [
      {
        title: 'Name',
        dataIndex: [ 'executiveName'],
        key: 'teamLeadName',
        align: 'left',
      },
      {
        title: 'Total Leads Assigned',
        dataIndex: [ 'totalLeadsAssigned'],
        key: 'totalLeadsAssigned',
        align: 'center',
      },
      {
        title: 'New Leads',
        dataIndex: [ 'totalNewLeads'],
        key: 'totalNewLeads',
        align: 'center',
      },
      {
        title: 'In Progress Leads',
        dataIndex: [ 'totalInProgressLeads'],
        key: 'totalInProgressLeads',
        align: 'center',
      },
      {
        title: 'Converted Leads',
        dataIndex: [ 'totalLeadsConverted'],
        key: 'totalLeadsConverted',
        align: 'center',
      },
      {
        title: 'Unconverted Leads',
        dataIndex: [ 'totalLeadsUnconverted'],
        key: 'totalLeadsUnconverted',
        align: 'center',
      },
      {
        title: 'Closed Leads',
        dataIndex: [ 'totalLeadsClosed'],
        key: 'totalLeadsClosed',
        align: 'center',
      },
    ];
    return (
      <div>
        <Table dataSource={ExecutiveData} columns={columns} />
      </div>
    )
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'TeamLead',
      children: <TeamLeadTab />,
    },
    {
      key: '2',
      label: 'Executive',
      children: <ExecutiveTab />,
    },
  ];
  const handleOk = () => {
    if (phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits');
      message.error('Please enter a valid 10-digit phone number');
      return;
    }
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setPhone('');
      setPhoneError('');
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const AdminCardDetails = [
    {
      title: 'Total Leads',
      value: AdminData?.totalLeads,
    },
    {
      title: 'New Leads',
      value: AdminData?.totalNewLeads,
    },
    {
      title: 'In Progress Leads',
      value: AdminData?.totalInProgressLeads,
    },
    {
      title: 'Converted Leads',
      value: AdminData?.totalLeadsConverted,
    },
    {
      title: 'Unconverted Leads',
      value: AdminData?.totalLeadsUnconverted,
    },
    {
      title: 'Closed Leads',
      value: AdminData?.totalLeadsClosed,
    },
    {
      title: 'Total Users',
      value: AdminData?.totalUsers,
    },
    {
      title: 'Total Teams',
      value: AdminData?.totalTeamLeads,
    },
    {
      title: 'Total Executive',
      value: AdminData?.totalExecutives,
    }
  ];

  return (
    <div className=' p-4 m-2 rounded-lg'>

      <Row justify="space-between" align="middle" className=" bg-white backdrop-white flex items-center p-4 rounded-2xl ">
        {/* Title */}
        <Col>
          <div className="text-2xl font-bold"> Dashboard</div>
        </Col>

        {/* Subtitle */}
        {/* <Col>
          <div className="text-lg">Welcome to the Super Admin Dashboard</div>
        </Col> */}

        {/* Button */}
        <Row>
          <Col>
            <Button type="default" className="bg-red-500 border-red-500 hover:bg-red-600 mr-2">
              Calender <CalendarOutlined />
            </Button>
          </Col>
          <Col>
            <Button type="default" onClick={showModal} className="bg-red-500 border-red-500 hover:bg-red-600 mr-2">
              Add New Lead <PlusOutlined />
            </Button>
          </Col>

          {" "}
          <Col>
            <Button type="primary" className="bg-red-500 border-red-500 hover:bg-red-600">
              Download Report <DownloadOutlined />
            </Button>
          </Col>
        </Row>
      </Row>
      <Divider />
      <Row gutter={[16, 16]} >
        {AdminCardDetails.map((card, index) => (
          <Col span={6} key={index} className="flex justify-center items-center">
            <Card key={index} title={card.title} hoverable size='small' variant="borderless" className='p-6' style={{ width: 250 }}>
              <p className="text-center text-2xl font-bold">{card.value}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Divider />
      <Row gutter={[24, 24]} className="bg-white shadow-md rounded-lg p-4 mt-4">
        <Col span={24}>
          <Title level={4} style={{ float: 'left' }}>OverView</Title>
          <Divider />
          <Tabs defaultActiveKey="1" items={items} className="w-full" />
        </Col>
      </Row>
      {/* <Row gutter={[24, 24]} className="mt-6">
        <Col span={12}>
          <Card title="Leads Overview" className="bg-white shadow-md rounded-lg p-4 mt-4">

            <Card>
              <div className="flex justify-between items-center mb-8 gap-2 flex-wrap">
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">New </span>
                </div>
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm">In Progress </span>
                </div>
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Visit Scheduled </span>
                </div>
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Converted </span>
                </div>
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Lost </span>
                </div>
              </div>

              <div className="h-48 flex items-end space-x-6 px-4">
                <div className="w-1/5 flex flex-col items-center space-y-1">
                  <div className="bg-blue-500 w-full" ></div>
                  <span className="text-xs text-gray-500">New</span>
                </div>
                <div className="w-1/5 flex flex-col items-center space-y-1">
                  <div className="bg-amber-500 w-full" ></div>
                  <span className="text-xs text-gray-500">In Progress</span>
                </div>
                <div className="w-1/5 flex flex-col items-center space-y-1">
                  <div className="bg-purple-500 w-full" ></div>
                  <span className="text-xs text-gray-500">Visit Scheduled</span>
                </div>
                <div className="w-1/5 flex flex-col items-center space-y-1">
                  <div className="bg-green-500 w-full" ></div>
                  <span className="text-xs text-gray-500">Converted</span>
                </div>
                <div className="w-1/5 flex flex-col items-center space-y-1">
                  <div className="bg-red-500 w-full" ></div>
                  <span className="text-xs text-gray-500">Lost</span>
                </div>
              </div>
            </Card>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Call Status" className="bg-white shadow-md rounded-lg p-4 mt-4">

            <Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-green-50 border-none shadow-sm">
                  <Card className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-100 p-3 rounded-full text-green-600 mb-3">
                        <PhoneCall size={24} />
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                      </div>
                      <div className="text-sm text-green-700">Connected</div>
                    </div>
                  </Card>
                </Card>

                <Card className="bg-red-50 border-none shadow-sm">
                  <Card className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-red-100 p-3 rounded-full text-red-600 mb-3">
                        <AlertTriangle size={24} />
                      </div>
                      <div className="text-2xl font-bold text-red-600">
                      </div>
                      <div className="text-sm text-red-700">Disconnected</div>
                    </div>
                  </Card>
                </Card>

                <Card className="bg-gray-50 border-none shadow-sm">
                  <Card className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gray-100 p-3 rounded-full text-gray-600 mb-3">
                        <PhoneCall size={24} className="opacity-50" />
                      </div>
                      <div className="text-2xl font-bold text-gray-600">
                      </div>
                      <div className="text-sm text-gray-700">Switched Off</div>
                    </div>
                  </Card>
                </Card>
              </div>

              <div className="h-36 relative mt-4">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Call history chart will be displayed here
                </div>
              </div>
            </Card>
          </Card>
        </Col>

      </Row> */}
      <Modal
        title="Add New Lead"
        open={open}
        onOk={handleOk}
        width={416}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className='justify-between'
      >
        <Input
          type='text'
          placeholder='Project Interested In'
          required
          style={{ marginBottom: '10px' }}
        />
        <Input
          type='text'
          placeholder='Lead Name'
          required
          style={{ marginBottom: '10px' }}
        />
        <Input
          type='text'
          placeholder='Phone No'
          required
          style={{ marginBottom: '10px' }}
          value={phone}
          maxLength={10}
          onChange={handlePhoneChange}
        />
        {phoneError && (
          <div style={{ color: 'red', marginBottom: 10 }}>{phoneError}</div>
        )}
        <Input
          type='text'
          placeholder='Budget Range'
          required
          style={{ marginBottom: '10px' }}
        />
        <Input
          type='text'
          placeholder='Type of Project'
          required
          style={{ marginBottom: '10px' }}
        />
        <Input
          type='text'
          placeholder='Source of Lead'
          required
          style={{ marginBottom: '10px' }}
        />
        <Input
          type='text'
          placeholder='Assigned To'
          required
          style={{ marginBottom: '10px' }}
        />
        <Input
          type='text'
          placeholder='Remarks'
          required
          style={{ marginBottom: '10px' }}
        />
      </Modal>
    </div>

  )
}

export default AdminDashboard