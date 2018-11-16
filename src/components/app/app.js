import '@babel/polyfill';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Accounts from '../accounts/accounts';
import PartCreation from '../part-creation/part-creation';
import SubCreate from '../subassy-creation/subassy-creation';
import Landing from '../landing/landing';
import AuthRedirect from '../auth-redirect/auth-redirect';
import '../../../style/base.scss';

class App extends React.Component {
  render() {
    return (
        <div>
          <BrowserRouter>
            <div>
              <Route path='*' component={AuthRedirect}/>
              <Route exact path='/' component={Landing}/>
              <Route path='/login' component={Landing}/>
              <Route path='/signup' component={Landing}/>
              <Route path='/dashboard' component={Dashboard}/>
              <Route path='/accounts' component={Accounts}/>
              <Route path='/part-create' component={PartCreation}/>
              <Route path='/subassy-create' component={SubCreate}/>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
