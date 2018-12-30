import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultLogo from '../../../assets/defaultLogo.png';
import './landing.scss';

import AuthForm from '../auth-form/auth-form';
import * as routes from '../../routes';

// actions
import * as authActions from '../../action/auth';
import * as dataActions from '../../action/data';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // setup store with needed DB data
    this.props.pGetUsers();
  }
  handleLogin = (user) => {
    return this.props.pDoLogin(user)
        .then(() => {
          this.props.history.push(routes.DASHBOARD_FRONTEND);
        })
        .catch(console.error);
  };

  handleSignup = (user) => {
    return this.props.pDoSignUp(user)
      .then((response) => {
        this.props.history.push(routes.DASHBOARD_FRONTEND);
        return response;
      })
      .catch(console.error);
  };

  render() {
    const rootJSX = <div className='centered'>
      <img src={defaultLogo} className='logo'/>
      <Link to='/signup' className='centered button'>Create an account</Link>
      <br/>
      <Link to='/login' className='centered button'>Login</Link>
    </div>;

    const signUpJSX = <div className='centered'>
      <img src={defaultLogo} className='logo'/>
      <AuthForm type='signup' onComplete={this.handleSignup}/>
      <p className='base'>Already have an account?</p>
      <Link to='/login'>Login to RIMS</Link>
    </div>;

    const loginJSX = <div className='centered'>
      <img src={defaultLogo} className='logo'/>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p className='base'>No account?</p>
      <Link to='/signup'>Create an account</Link>
    </div>;

    const { location } = this.props;

    return (
        <nav>
          { location.pathname === routes.SIGNUP_FRONTEND ? signUpJSX : undefined }
          { location.pathname === routes.LOGIN_FRONTEND ? loginJSX : undefined }
        </nav>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  users: state.users,
  subAssy: state.subAssy,
  parts: state.parts,
});

const mapDispatchToProps = dispatch => ({
  pDoSignUp: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
  pGetUsers: users => dispatch(dataActions.getUsers(users)),
  pGetSubAssy: subAssy => dispatch(dataActions.getSubAssy(subAssy)),
  pGetParts: parts => dispatch(dataActions.getParts(parts)),
});

Landing.propTypes = {
  location: PropTypes.object,
  pDoSignUp: PropTypes.func,
  pDoLogin: PropTypes.func,
  pGetUsers: PropTypes.func,
  pGetSubAssy: PropTypes.func,
  pGetParts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
