import React, { useEffect, useState, useMemo } from 'react';
import { Row, Tabs, Col, Spin, message } from 'antd';
import { TabsProps } from 'antd';
import LeadTable from './LeadTable';
import { GetAllLead } from '../../../services/Api_Service';
import { useSelector } from 'react-redux';

const SuperAdminLeads: React.FC = () => {
  const [allLeads, setAllLeads] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id, role } = useSelector((state: any) => state.auth?.user || {});
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    const fetchAllLeads = async () => {
      try {
        setLoading(true);
        const response = await GetAllLead();
        // const leads = (response?.data || []).map((lead: any, index: number) => ({
        //   ...lead,
        //   key: lead._id || index,
        // }));
        setAllLeads(response);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
        message.error("Failed to fetch leads. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllLeads();
  }, []);

  const filterLeads = (status: string) => {
    if (status === 'Allleads') return allLeads?.data;
    return allLeads?.data.filter((lead:any) => lead.leadStatus === status);
  };

  const items: TabsProps['items'] = [
    { key: '1', label: 'New Leads', children: <LeadTable leads={filterLeads('New')} filter="New" CurrentRole={role} /> },
    { key: '2', label: 'In Progress Leads', children: <LeadTable leads={filterLeads('InProgress')} filter="InProgress" CurrentRole={role} /> },
    { key: '3', label: 'Converted Leads', children: <LeadTable leads={filterLeads('Converted')} filter="Converted" CurrentRole={role} /> },
    { key: '4', label: 'UnConverted Leads', children: <LeadTable leads={filterLeads('Unconverted')} filter="Unconverted" CurrentRole={role} /> },
    { key: '5', label: 'Past Leads', children: <LeadTable leads={filterLeads('Closed')} filter="Closed" CurrentRole={role} /> },
    { key: '6', label: 'All Leads', children: <LeadTable leads={filterLeads('Allleads')} filter="Allleads" CurrentRole={role} /> },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <Row gutter={[16, 16]} style={{ margin: '0 auto' }}>
      <Col span={24}>
        {loading ? (
          <Spin spinning={loading} tip="Loading leads..." />
        ) : (
          <Tabs
            activeKey={activeKey}
            onChange={handleTabChange}
            className="bg-white h-screen p-4"
            style={{ borderRadius: '10px', marginTop: '20px' }}
            items={items}
            size="large"
          />
        )}
      </Col>
    </Row>
  );
};

export default SuperAdminLeads;
