import React, { useEffect, useState } from 'react';
import { Row, Tabs, Col, Spin } from 'antd';
import type { TabsProps } from 'antd';
import LeadTable from './LeadTable';
import { FetchLeadById } from '../../../services/Api_Service';
import { useSelector } from 'react-redux';

const UserLeads: React.FC = () => {
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {UserId,role} = useSelector((state: any) => state.auth?.user);
  


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
    { key: '1', label: 'New Leads', children: <LeadTable leads={filterLeads('New')} filter="New" CurrentRole={role} /> },
    { key: '2', label: 'In Progress Leads', children: <LeadTable leads={filterLeads('InProgress')} filter="InProgress" CurrentRole={role} /> },
    { key: '3', label: 'Converted Leads', children: <LeadTable leads={filterLeads('Converted')} filter="Converted" CurrentRole={role} /> },
    { key: '4', label: 'UnConverted Leads', children: <LeadTable leads={filterLeads('Unconverted')} filter="Unconverted" CurrentRole={role} /> },
    { key: '5', label: 'Past Leads', children: <LeadTable leads={filterLeads('Closed')} filter="Closed" CurrentRole={role} /> },
    { key: '6', label: 'All Leads', children: <LeadTable leads={filterLeads('Allleads')} filter="Allleads" CurrentRole={role} /> },
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

export default UserLeads;
