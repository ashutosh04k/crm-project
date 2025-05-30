import { Button, Card, Col, Divider, Typography, message, Modal, Row, Select, Tabs, TabsProps, Table } from 'antd';
import { AlertTriangle, Divide, PhoneCall } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CalendarOutlined, DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import CommonForm from '../../../helpers/utils/CommonForm';
import { CreateLeadControl } from '../../../config';
import { CreateLead, GetOverAllReport, GetReportOfAdmin, GetReportOfTeamLead, HandleExcellleadUpload } from '../../../services/Api_Service';
import { useTeamLeads } from '../../hooks/useTeamLead';

const { Title } = Typography;


const intialCreateLeadFormData = {
  clientName: " ",
  clientEmail: " ",
  clientPhone: " ",
  projectInterested: " "
}
const SuperAdminDashboard = () => {
  const [NewLeadopen, setNewLeadOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const Teamleads = useTeamLeads();

  const [NewLeadFormData, setNewLeadFormData] = useState<Record<string, string | boolean>>(intialCreateLeadFormData);
  const [NewLeadFromExcell, setNewLeadFromExcell] = useState(false);
  const [SuperAdminData, setSuperAdminData] = useState<any>(null);
  const [AdminData, setAdminData] = useState<any>(null);

  const [TeamLeadData, setTeamLeadData] = useState<any>(null);
  const [teamLeadIds, setTeamLeadIds] = useState<string[]>([]);
  const [ExecutiveData, setExecutiveData] = useState<any>(null);


  const [excelFile, setExcelFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    setExcelFile(e.target.files[0]);
  };
  const showNewLeadModal = () => {
    setNewLeadOpen(true);
  };

  console.log(excelFile,"file")

  const handleNewLeadOk = async (NewLeadFormData: any) => {
    // setConfirmLoading(true);
    setLoading(true);
    try {
      if (!/^\d{10}$/.test(NewLeadFormData.clientPhone as string)) {
        message.error("Phone number must be exactly 10 digits and numeric.");
        setLoading(false);
        return;
      }
      const response = await CreateLead(NewLeadFormData);
      message.success("Lead Added Successfully");
      setNewLeadFormData(intialCreateLeadFormData);
    } catch (error) {
      message.error("Something went wrong. while creating new lead");
    } finally {
      setLoading(false);
    }
    setNewLeadOpen(false)
    // setTimeout(() => {
    //   setNewLeadOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const AdminTab = () => {
    const columns: Array<{
      title: string;
      dataIndex: string[];
      key: string;
      align: 'left' | 'right' | 'center';
    }> = [
        {
          title: 'TotalLeads Assigned',
          dataIndex: ['totalLeads'],
          key: 'totalLeads',
          align: 'center',
        },
        {
          title: 'New Leads',
          dataIndex: ['totalNewLeads'],
          key: 'New Leads',
          align: 'center',
        },
        {
          title: 'In Progress Leads',
          dataIndex: ['totalInProgressLeads'],
          key: 'In Progress Leads',
          align: 'center',
        },
        {
          title: 'Converted Leads',
          dataIndex: ['totalLeadsConverted'],
          key: 'Converted Leads',
          align: 'center',
        },
        {
          title: 'Unconverted Leads',
          dataIndex: ['totalLeadsUnconverted'],
          key: 'Unconverted Leads',
          align: 'center',
        },
        {
          title: 'Closed Leads',
          dataIndex: ['totalLeadsClosed'],
          key: 'totalCalls',
          align: 'center',
        }
      ];
    return (
      <div>
        <Table
          dataSource={AdminData ? [AdminData] : []}
          columns={columns}
        />
      </div>
    )
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
          dataIndex: ['executiveName'],
          key: 'teamLeadName',
          align: 'left',
        },
        {
          title: 'Total Leads Assigned',
          dataIndex: ['totalLeadsAssigned'],
          key: 'totalLeadsAssigned',
          align: 'center',
        },
        {
          title: 'New Leads',
          dataIndex: ['totalNewLeads'],
          key: 'totalNewLeads',
          align: 'center',
        },
        {
          title: 'In Progress Leads',
          dataIndex: ['totalInProgressLeads'],
          key: 'totalInProgressLeads',
          align: 'center',
        },
        {
          title: 'Converted Leads',
          dataIndex: ['totalLeadsConverted'],
          key: 'totalLeadsConverted',
          align: 'center',
        },
        {
          title: 'Unconverted Leads',
          dataIndex: ['totalLeadsUnconverted'],
          key: 'totalLeadsUnconverted',
          align: 'center',
        },
        {
          title: 'Closed Leads',
          dataIndex: ['totalLeadsClosed'],
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

  const handleNewLeadCancel = () => {
    setNewLeadOpen(false);
  };
  const showExcellUploadModal = () => {
    setNewLeadFromExcell(true);
  }
const handleExcellUploadOk = async () => {
  if (!excelFile) {
    message.error("Please select a file first.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("sheet", excelFile); 
    console.log(formData)
    const response = await HandleExcellleadUpload(formData); 
    message.success("File uploaded successfully!");
    setNewLeadFromExcell(false);
    setExcelFile(null);
  } catch (error) {
    message.error("Error uploading file");
  }
};




  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Admin',
      children: <AdminTab />,
    },
    {
      key: '2',
      label: 'TeamLead',
      children: <TeamLeadTab />,
    },
    {
      key: '3',
      label: 'Executive',
      children: <ExecutiveTab />,
    },
  ];

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
  }, [teamLeadIds]);
  const FetchAdminData = async () => {
    try {
      const response = await GetReportOfAdmin();
      setAdminData(response?.data);
    } catch (error) {
      console.error("Error fetching admin data", error)
    }
  };

  const FetchOverAllData = async () => {
    try {
      const response = await GetOverAllReport();
      setSuperAdminData(response?.data)
    } catch (error) {

    }
  }
  useEffect(() => {
    FetchAdminData();
    FetchOverAllData();
  }, []);

  const SuperAdminCardDetails = [
    {
      title: 'Total Leads',
      value: SuperAdminData?.totalLeads,
    },
    {
      title: 'New Leads',
      value: SuperAdminData?.totalNewLeads,
    },
    {
      title: 'In Progress Leads',
      value: SuperAdminData?.totalInProgressLeads,
    },
    {
      title: 'Converted Leads',
      value: SuperAdminData?.totalLeadsConverted,
    },
    {
      title: 'Unconverted Leads',
      value: SuperAdminData?.totalLeadsUnconverted,
    },
    {
      title: 'Closed Leads',
      value: SuperAdminData?.totalLeadsClosed,
    },
    {
      title: 'Total Admin',
      value: SuperAdminData?.totalAdmins,
    },
    {
      title: 'Total Teams',
      value: SuperAdminData?.totalTeamLeads,
    },
    {
      title: 'Total Executive',
      value: SuperAdminData?.totalExecutives,
    },
    {
      title: 'Total Users',
      value: SuperAdminData?.totalUsers,
    },
  ];

  const handleExcellUploadCancel = () => {
    setNewLeadFromExcell(false);
  };

  return (
    <div className=' p-4 m-2 rounded-lg'>

      <Row justify="space-between" align="middle" className=" bg-white backdrop-white flex items-center p-4 rounded-2xl">

        <Col>
          <div className="text-2xl font-bold"> Dashboard</div>
        </Col>

        <Row>
          <Col>
            <Button type="default" className="bg-red-500 border-red-500 hover:bg-red-600 mr-2">
              Calender <CalendarOutlined />
            </Button>
          </Col>
          <Col className='mr-2'>
            <Select
              placeholder={`Add New`}
              onChange={(value) => {
                switch (value) {
                  case '1':
                    showNewLeadModal();
                    break;
                  case '2':
                    showExcellUploadModal();
                    break;

                  default:
                    break;
                }
              }}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                { value: '1', label: 'New Lead' },
                { value: '2', label: 'Uplaod Excel Sheet' },
              ]}
            />
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
        {SuperAdminCardDetails.map((card, index) => (
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

      <Modal
        title="Add New Lead"
        open={NewLeadopen}
        okText="Add New Lead"
        // onOk={handleNewLeadOk}
        width={375}
        // confirmLoading={confirmLoading}
        onCancel={handleNewLeadCancel}
        footer={null}
        closeIcon={null}
        className='justify-between'
      >
        <CommonForm
          formControls={CreateLeadControl}
          formData={NewLeadFormData}
          setFormData={setNewLeadFormData}
          onSubmit={handleNewLeadOk}
          buttonText={loading ? "Adding New Lead..." : "Add New Lead"}
          isBtnDisabled={loading}
        />
      </Modal>
      <Modal
        title="Upload Lead Using Excell"
        open={NewLeadFromExcell}
        onOk={handleExcellUploadOk}
        width={416}
        onCancel={handleExcellUploadCancel}
        className='justify-between'
        okText="Upload Sheet"
      >
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '10px' }}>
          {
            excelFile ?
            <span>{excelFile.name}</span>
            :
            <>
          <UploadOutlined style={{ fontSize: '16px' }} />
          <span>Choose Excel File</span>
            </>
          }
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>

      </Modal>
    </div>

  )
}

export default SuperAdminDashboard;



{/* <Row gutter={[24,24]} className="mt-6">
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