import React from 'react';
import { Card, Avatar, Row, Col, Divider, Input } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

interface ProfileProps {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  bio?: string;
  role: string;
  managerId?: number;
}

const General: React.FC<ProfileProps> = ({ name, email, role, phone, avatarUrl, bio, managerId }) => {
  return (
    <Card>
      <Row align="middle" gutter={24}>
        <Col>
          <Avatar size={100} src={avatarUrl} icon={<UserOutlined />} />
        </Col>
        <Col flex="auto">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
              addonBefore="Name"
              value={name}
              readOnly
              size="large"
            />
            <Input
              addonBefore="Email"
              prefix={<MailOutlined />}
              value={email}
              size="large"
              readOnly
            />
           
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            <Input
              addonBefore="Phone"
              prefix={<PhoneOutlined />}
              value={phone}
              size="large"
              readOnly
            />
            <Input
              addonBefore="Role"
              value={role}
              size="large"
              readOnly
            />
          </div>
        </Col>
      </Row>
      <Divider />
    </Card>
  );
};

export default General;