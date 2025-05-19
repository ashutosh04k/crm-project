import React, { useEffect, useState } from 'react';
import { Row, Tabs, Col, Spin } from 'antd';
import type { TabsProps } from 'antd';
import LeadTable from './LeadTable';
import { FetchLeadById } from '../../../services/Api_Service';
import { useSelector } from 'react-redux';

const TeamLeads: React.FC = () => {
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const UserId = useSelector((state: any) => state.auth?.user?.id);


  useEffect(() => {
    const fetchAllLeads = async () => {
      try {
        setLoading(true);
        const response = await FetchLeadById(UserId);
        const leads = (response?.data || []).map((lead: any, index: number) => ({
          ...lead,
          key: lead._id || index,
        }));
        setAllLeads(leads);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLeads();
  }, []);

  const filterLeads = (status: string) => {
    if (status === 'Allleads') return allLeads;
    return allLeads.filter((lead) => lead.leadStatus === status);
  };

  const items: TabsProps['items'] = [
    { key: '1', label: 'All Leads', children: <LeadTable leads={filterLeads('Allleads')} filter="Allleads" /> },
    { key: '2', label: 'New Leads', children: <LeadTable leads={filterLeads('New')} filter="New" /> },
    { key: '3', label: 'In Progress Leads', children: <LeadTable leads={filterLeads('InProgress')} filter="InProgress" /> },
    { key: '4', label: 'Converted Leads', children: <LeadTable leads={filterLeads('Converted')} filter="Converted" /> },
    { key: '5', label: 'UnConverted Leads', children: <LeadTable leads={filterLeads('Unconverted')} filter="Unconverted" /> },
    { key: '6', label: 'Past Leads', children: <LeadTable leads={filterLeads('Closed')} filter="Closed" /> },
  ];

  return (
    <Row gutter={[16, 16]} style={{ margin: '0 auto' }}>
      <Col span={24}>
        {loading ? (
          <Spin tip="Loading leads..." />
        ) : (
          <Tabs
            className="bg-white h-screen"
            style={{ padding: '16px', borderRadius: '10px' }}
            defaultActiveKey="1"
            items={items}
            size="large"
          />
        )}
      </Col>
    </Row>
  );
};

export default TeamLeads;
