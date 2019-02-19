// packages
import '@babel/polyfill';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// components
import Dashboard from '../dashboard/dashboard';
import ManageAccounts from '../manage-accounts/manage-accounts';
import MyAccount from '../my-account/my-account';
import PartCreation from '../part-creation/part-creation';
import SubCreate from '../subassy-creation/subassy-creation';
import Landing from '../landing/landing';
import AuthRedirect from '../auth-redirect/auth-redirect';

// styles
import '../../../style/base.scss';

// vars
import * as routes from '../../routes';


class App extends React.Component {
  render() {
    return (
        <div>
          <BrowserRouter>
            <div>
              <Route path='*' component={AuthRedirect}/>
              <Route exact path={routes.SITE_ROOT_FRONTEND} component={Landing}/>
              <Route path={routes.LOGIN_FRONTEND} component={Landing}/>
              <Route path={routes.SIGNUP_FRONTEND} component={Landing}/>
              <Route path={routes.RESET_PW_FRONTEND} component={Landing}/>
              <Route path={routes.FORGOT_PW_FRONTEND} component={Landing}/>
              <Route path={routes.DASHBOARD_FRONTEND} component={Dashboard}/>
              <Route path={routes.PART_CREATION_FRONTEND} component={PartCreation}/>
              <Route path={routes.SUBASSY_CREATION_FRONTEND} component={SubCreate}/>
              <Route path={routes.MANAGE_ACCOUNTS_FRONTEND} component={ManageAccounts}/>
              <Route path={routes.BRANDING_FRONTEND} component={MyAccount}/>
              <Route path={routes.MY_ACCOUNT_FRONTEND} component={MyAccount}/>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
