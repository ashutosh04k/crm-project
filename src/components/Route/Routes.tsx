import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../../auth/authlayout';
import { PAGE_PATH } from '../../helpers/constants/pagePath.constant';
import Login from '../pages/authentication/Login';
import Error from '../pages/errorfile/Error';
import { MainLayout } from '../Layout';
import Dashboard from '../pages/dashboard/Dashboard';
import Leads from '../pages/leads/Leads';
import Teams from '../pages/team/Teams';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/setting/Settings';
import Users from '../pages/user/Users';
import CreateUser from '../pages/createusers/CreateUser';
import CheckAuth from '../../helpers/utils/checkAuth';
import { checkAuth } from '../../store/auth-slice/Authslice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
const routes = () => {
  const {isAuthenticated} = useSelector((state:any) => state.auth); 
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(checkAuth());

  },[dispatch])
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
        <Routes>
            <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated}><AuthLayout/></CheckAuth>}>
                <Route path={PAGE_PATH.LOGIN} element={<Login/>} />
                <Route path={PAGE_PATH.REGISTER} element={<div>Register</div>} />
            </Route>
            <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} ><MainLayout/></CheckAuth>}>
                <Route path={PAGE_PATH.DASHBOARD} element={<Dashboard/>} />
                <Route path={PAGE_PATH.LEADS} element={<div><Leads/></div>} />
                <Route path={PAGE_PATH.TEAMS} element={<div><Teams/></div>} />
                <Route path={PAGE_PATH.REPORTS} element={<div><Reports/></div>}/>
                <Route path={PAGE_PATH.USERS} element={<div><Users/></div>}/>
                <Route path={PAGE_PATH.SETTINGS} element={<div><Settings/></div>}/>
                <Route path={PAGE_PATH.CREATEUSER} element={<div><CreateUser/></div>}/>
            </Route>
                <Route path="*" element={<Error/>} />
        </Routes>

    </div>
  )
}

export default routes