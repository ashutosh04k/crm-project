import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { GetReportOfExecutive } from "../../../services/Api_Service";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const [executiveData, setExecutiveData] = useState<any>(null);
  const userId = useSelector((state: any) => state.auth?.user?.id);

  const FetchExecutiveData = async (userId: any) => {
    try {
      const response = await GetReportOfExecutive(userId);
      setExecutiveData(response?.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) FetchExecutiveData(userId);
  }, [userId]);

  const cards = executiveData
    ? [
        { title: "Total Leads Assigned", value: executiveData.totalLeadsAssigned },
        { title: "New Leads", value: executiveData.totalNewLeads },
        { title: "In Progress Leads", value: executiveData.totalInProgressLeads },
        { title: "Converted Leads", value: executiveData.totalLeadsConverted },
        { title: "Unconverted Leads", value: executiveData.totalLeadsUnconverted },
        { title: "Closed Leads", value: executiveData.totalLeadsClosed },
        { title: "Total Calls Made", value: executiveData.totalCallsMade },
        { title: "Calls Completed", value: executiveData.totalCallsCompleted },
        { title: "Calls Not Connected", value: executiveData.totalCallsNotConnected },
        { title: "Calls Disconnected", value: executiveData.totalCallsDisconnected },
        { title: "Calls Switch Off", value: executiveData.totalCallsSwitchOff },
        // { title: "Calls Not Reachable", value: executiveData.totalCallsNotReachable },
        { title: "Calls User Busy", value: executiveData.totalCallsUserBusy },
      ]
    : [];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ margin: '0 auto', maxWidth: '100%', overflowX: 'hidden',minHeight:'100%',padding:"30px 0px",borderRadius:'12px',marginTop:'10px' }}>
        {cards.map((card, index) => (
          <Col span={6} key={index} className="flex justify-center items-center" >
            <Card title={card.title} hoverable size="small" variant="borderless" className="p-6" style={{ width: 250,background:"#FCF6F5"}}>
              <p className="text-center text-2xl font-bold">{card.value}</p>
            </Card>
          </Col>
        ))}
        
      </Row>
    </div>
  );
};

export default UserDashboard;