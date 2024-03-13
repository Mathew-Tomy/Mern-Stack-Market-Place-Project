import React, { useContext, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';
import DashboardPage from './pages/DashboardPage';
import TypographyPage from './pages/TypographyPage'
import LoginPage from './pages/auth/LoginPage'
import ResetPassword from './pages/auth/ResetPassword';
import ProfilePage from './pages/profile/ProfilePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import UserPreferencesPage from './pages/profile/UserPreferencesPage'
import AdminBlankPage from './pages/AdminBlankPage';
import RegisterPage from './pages/auth/RegisterPage'
import LogOut from './common/Logout'
import { Context } from '../ContextAdminStore';
import CreateLocation from './pages/Create-location';



function AdminRoute() {
  const { adminData } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (!adminData) {
      // Redirect to login page if not logged in
      history.push('/admin/login');
    }
  }, [adminData, history]);

  return (
            
                <Switch>
                  
                    
                <Route path="/admin" exact component={DashboardPage} />
              
                <Route exact path='/admin/login' component={LoginPage} />
             
                <Route exact path='/admin/register' component={RegisterPage} />
                <Route exact path='/reset-password' component={ResetPassword} />
                <Route exact path='/admin/profile' component={ProfilePage} />
                <Route exact path='/admin/change-password'component={ChangePasswordPage} />
                <Route exact path='/admin/preferences' component={UserPreferencesPage} />
                <Route exact path='/admin/typography' component={TypographyPage} />
                <Route exact path='/admin/create-category' component={AdminBlankPage} />  
                <Route exact path='/admin/create-location' component={CreateLocation} />  
                <Route exact path='/admin/logout' component={LogOut} /> 
              
                </Switch>
               
    )
}

export default AdminRoute;