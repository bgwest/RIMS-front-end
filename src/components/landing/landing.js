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
import ResetPwForm from '../reset-pw-form/reset-pw-form';

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

  handlePwResetAndLogin = (user) => {
    return this.props.handlePwResetAndLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_FRONTEND);
      })
      .catch((error) => {
        return new Error(error);
      });
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
      <span className='base'>Already have an account?</span>
      <Link className="spacing" to='/login'>Login to RIMS</Link>
    </div>;

    const loginJSX = <div className='centered'>
      <img src={defaultLogo} className='logo'/>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <span className='base'>Help me with something else?</span>
      <Link className="spacing" to='/signup'>Create an account</Link>
      <Link className="spacing" to='/reset-pw'>Reset password</Link>
    </div>;

    const resetPwJSX = <div div className='centered'>
      <img src={defaultLogo} className='logo'/>
      <ResetPwForm type="reset" onComplete={this.handlePwResetAndLogin}/>
      <span className='base'>Help me with something else?</span>
      <Link className="spacing" to='/login'>Login to RIMS</Link>
      <Link className="spacing" to='/forgot-pw'>Forgot Password</Link>
    </div>;

    const forgotPwJSX = <div div className='centered'>
      <img src={defaultLogo} className='logo'/>
      <ResetPwForm type="forgot"/>
      <span className='base'>Help me with something else?</span>
      <Link className="spacing" to='/signup'>Signup for RIMS</Link>
      <Link className="spacing" to='/forgot-un'>Forgot Username</Link>
      <Link className="spacing" to='/reset-pw'>Reset password</Link>
    </div>;

    const forgotUnJSX = <div div className='centered'>
      <img src={defaultLogo} className='logo'/>
      <p style={ {'text-align': 'center'} }>
        Send username to email is currently not support. Come back soon.
      </p>
      <span className='base'>Help me with something else?</span>
      <Link className="spacing" to='/login'>Login to RIMS</Link>
      <Link className="spacing" to='/signup'>Signup for RIMS</Link>
      <Link className="spacing" to='/forgot-pw'>Forgot Password</Link>
      <Link className="spacing" to='/reset-pw'>Reset password</Link>
    </div>;

    const { location } = this.props;

    return (
        <nav>
          { location.pathname === routes.SIGNUP_FRONTEND ? signUpJSX : null }
          { location.pathname === routes.LOGIN_FRONTEND ? loginJSX : null }
          { location.pathname === routes.RESET_PW_FRONTEND ? resetPwJSX : null}
          { location.pathname === routes.FORGOT_PW_FRONTEND ? forgotPwJSX : null}
          { location.pathname === routes.FORGOT_UN_FRONTEND ? forgotUnJSX : null}
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
  handlePwResetAndLogin: user => dispatch(authActions.handlePwResetAndLogin(user)),
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
  handlePwResetAndLogin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
