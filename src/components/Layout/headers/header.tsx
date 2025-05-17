import { Col, Row } from 'antd'
import { useSelector } from 'react-redux';
import UserDetails from '../Sider/UserDetails';

const header = () => {
  const CurrentRole = useSelector((state: any) => state.auth?.user?.role);
  // const [selectedKey, setSelectedKey] = useState<string>('dashboard');

  return (
    <div>
      <Row justify="space-between" align="middle" className="bg-#ffdddd p-2 rounded-lg">
      <Col>
        <div className="text-lg font-semibold">{`Welcome to the ${CurrentRole}`}</div>
      </Col>
      <Col>
        <UserDetails />
      </Col>
    </Row></div>
  )
}

export default header