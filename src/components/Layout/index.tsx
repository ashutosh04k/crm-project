import React, { useState } from 'react';
import {  Layout } from 'antd';
import FooterComp from './Footer/footer';
import CustomSider from './Sider/customSider';
import HeaderComp from './headers/header';
import { Outlet } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '	#ffdddd',
};

const ContentStyle: React.CSSProperties ={
  padding:"0px 0px"
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  height:'auto',
  color: '#000',
  backgroundColor: 'rgb(247 247 247)',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000',
  padding:'0px 5px'
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  // // height: '100vh',
};

export const MainLayout: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('dashboard');
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleSelectKey = (key: string) => {
    const selectedkey = key.replace("/", "");
    setSelectedKey(selectedkey);
  };

  return (
    <Layout style={layoutStyle}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        theme='light'
      >
        <CustomSider onSelectKey={handleSelectKey} />
      </Sider>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', }}>
        {/* <Header style={headerStyle} className='rounded-lg'><HeaderComp/></Header> */}
        <Layout style={contentStyle}>
        <Header style={headerStyle} className='rounded-lg'>
            <HeaderComp/>
          </Header>
          <Content style={ContentStyle}>
            <Outlet />
            </Content>
          <Footer style={footerStyle}>
            <FooterComp/>
          </Footer>
        </Layout>
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
    </Layout>
  );
};
