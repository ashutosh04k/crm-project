import { Card, Col, Row, Table,Typography } from "antd";
import { useEffect, useState } from "react";
import {GetReportOfTeamLead } from "../../../services/Api_Service";
import { useSelector } from "react-redux";
import { title } from "process";

const {Title} = Typography;

const TeamLeadDashboard = () => {
  const [TeamLeadData, setTeamLeadData] = useState<any>(null);
  const [ExecutiveData, setExecutiveData] = useState<any>(null);
  const userId = useSelector((state: any) => state.auth?.user?.id);

  const FetchTeamLeadData = async (userId: any) => {
    try {
      const response = await GetReportOfTeamLead(userId);
      setTeamLeadData(response?.data);
      setExecutiveData(response?.data?.executives);
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) FetchTeamLeadData(userId);
  }, [userId]);

const columns = [
  {
    title: 'Name',
    dataIndex: 'executiveName',
    key: 'name',
  },
  {
    title: 'Total Lead',
    dataIndex: 'totalLeadsAssigned',
    key: 'age',
  },
  {
    title: 'New',
    dataIndex: 'totalNewLeads',
    key: 'New',
  },
  {
    title: 'Progress',
    dataIndex:'totalInProgressLeads',
    key: 'Progress'
  },
  {
    title: 'Converted',
    dataIndex : 'totalLeadsConverted',
    key: 'converted'
  },
  {
    title : 'Unconverted',
    dataIndex : 'totalLeadsUnconverted',
    key : 'unconverted'
  },
  {
    title : 'Closed',
    dataIndex : 'totalLeadsClosed',
    key : 'Closed'
  }
];
  const cards = TeamLeadData
    ? [
        { title: "Total Leads Assigned", value: TeamLeadData.totalLeadsAssigned },
        { title: "New Leads", value: TeamLeadData.totalNewLeads },
        { title: "In Progress Leads", value: TeamLeadData.totalInProgressLeads },
        { title: "Converted Leads", value: TeamLeadData.totalLeadsConverted },
        { title: "Unconverted Leads", value: TeamLeadData.totalLeadsUnconverted },
        { title: "Closed Leads", value: TeamLeadData.totalLeadsClosed },
        { title: "Total Calls Made", value: TeamLeadData.totalCallsMade },
        // { title: "Calls Completed", value: TeamLeadData.totalCallsCompleted },
        { title: "Calls Not Connected", value: TeamLeadData.totalCallsNotConnected },
        { title: "Calls Disconnected", value: TeamLeadData.totalCallsDisconnected },
        { title: "Calls Switch Off", value: TeamLeadData.totalCallsSwitchOff },
        { title: "Calls Not Reachable", value: TeamLeadData.totalCallsNotReachable },
        { title: "Calls User Busy", value: TeamLeadData.totalCallsUserBusy },
      ]
    : [];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ margin: '0 auto', maxWidth: '100%', overflowX: 'hidden',minHeight:'100%',padding:"30px 0px",borderRadius:'12px',marginTop:'10px' }}>
        {cards.map((card, index) => (
          <Col span={6} key={index} className="flex justify-center items-center">
            <Card title={card.title} hoverable size="small" variant="borderless" className="p-6" style={{ width: 250,background:"#FCF6F5" }}>
              <p className="text-center text-2xl font-bold">{card.value}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Col>
        <Title level={4} style={{float:"left",marginLeft:'10px'}}>Executive Overview</Title>
      <Table dataSource={ExecutiveData} columns={columns} className=" items-center justify-center" />
      </Col>
    </div>
  );
};

export default TeamLeadDashboard;