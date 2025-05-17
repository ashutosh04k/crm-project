import { Button, Card, Col, Divider, Input, Modal, Row } from 'antd';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import { useState } from 'react';
import { CalendarOutlined ,DownloadOutlined,PlusOutlined } from '@ant-design/icons'; 
const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const cardDetails = [
    {
      title: 'Total Leads',
      value: 100,
    },
    {
      title: 'New Leads',
      value: 50,
    },
    {
      title: 'In Progress Leads',
      value: 30,
    },
    {
      title: 'Converted Leads',
      value: 15,
    },
    {
      title: 'Unconverted Leads',
      value: 5,
    },
    {
      title: 'Past Leads',
      value: 20,
    },
    {
      title: 'Total Users',
      value: 200,
    },
    {
      title: 'Active Users',
      value: 150,
    },
    {
      title: 'Inactive Users',
      value: 50,
    },
    {
      title: 'Total Teams',
      value: 10,
    },
    {
      title: 'Active Teams',
      value: 8,
    },
    {
      title: 'Inactive Teams',
      value: 2,
    },
  ]
  return (
    <div className=' p-4 m-2 rounded-lg'>

      <Row justify="space-between" align="middle" className=" bg-white backdrop-white flex items-center p-4 rounded-2xl">
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
            Add New Lead <PlusOutlined/>
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
      <Divider/>
      {/* <Row justify="space-around" className=" flex flex-col">
        <Col span={24} className="text-center text-lg"></Col>
      </Row> */}
      <Row gutter={[16, 16]} >
        {cardDetails.map((card, index) => (
          <Col span={6} key={index} className="flex justify-center items-center">
            <Card key={index} title={card.title} hoverable size='small' variant="borderless" className='p-6' style={{ width: 250 }}>
              <p className="text-center text-2xl font-bold">{card.value}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[24,24]} className="mt-6">
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
                      {/* {Math.round(stats.todayCalls * 0.7)} */}
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
                      {/* {Math.round(stats.todayCalls * 0.2)} */}
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
                      {/* {Math.round(stats.todayCalls * 0.1)} */}
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

      </Row>
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
        style={{marginBottom:'10px'}}
        />
        <Input
        type='text'
        placeholder='Lead Name'
        required
        style={{marginBottom:'10px'}}
        />
        <Input
        type='text'
        placeholder='Phone No'
        required
        style={{marginBottom:'10px'}} 
        />
        <Input
        type='text'
        placeholder='Budget Range'
        required
        style={{marginBottom:'10px'}}
        />
        <Input
        type='text'
        placeholder='Type of Project'
        required
        style={{marginBottom:'10px'}}
        />
        <Input
        type='text'
        placeholder='Source of Lead'
        required
        style={{marginBottom:'10px'}}
        />
        <Input
        type='text'
        placeholder='Assigned To'
        required
        style={{marginBottom:'10px'}}
        />
        <Input
        type='text'
        placeholder='Remarks'
        required
        style={{marginBottom:'10px'}}
        />
      </Modal>
    </div>
    
  )
}

export default AdminDashboard