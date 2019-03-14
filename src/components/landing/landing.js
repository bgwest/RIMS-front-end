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
    this.state.tempPw = false;
    // setup store with needed DB data
    //   this just ensure that the username isn't blank so the getUser request fires
    //   additional role security will need to be added to back-end moving forward
    this.props.pGetUsers(this.props.token || [ { username: 'landing' } ]);
    this.props.pGetRoles();
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

  handleForgotMyPassword = (user) => {
    console.log('action: handleForgotMyPassword()');
    return this.props.handleForgotMyPassword(user)
    // if successful, action should return with temporary password to display for user
      .then((tempPw) => {
        const testComponent = <section className="tempPwDiv">
          <p><span className="tempPwText">NOTE:</span></p>
          <p>Save the below <span className="tempPw">pw</span> immediately.</p>
          <p>You will be locked from your account if you do not retain it before the page refreshes.</p>
          <p>We recommend heading to the reset-pw page and using this temporary pw immediately reset your account pw.</p>
          <p className="tempPw">{tempPw}</p>
        </section>;
        this.setState({tempPw: testComponent});
      })
      .catch((error) => {
        return error;
      });
  };

  returnDefaultLogo = () => {
    return <Link to='/'>
      <img src={defaultLogo} className='logo'/>
    </Link>;
  };

  render() {
    const rootJSX = <div className='centered'>
      {this.returnDefaultLogo()}
      <Link to='/signup' className='centered button'>Create an account</Link>
      <br/>
      <Link to='/login' className='centered button'>Login</Link>
    </div>;

    const signUpJSX = <div className='centered'>
      {this.returnDefaultLogo()}
      <AuthForm type='signup' onComplete={this.handleSignup}/>
      <span className='base'>Already have an account?</span>
      <Link className="spacing" to='/login'>Login to RIMS</Link>
    </div>;

    const loginJSX = <div className='centered'>
      {this.returnDefaultLogo()}
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <span className='base'>Help me with something else?</span>
      <Link className="spacing" to='/signup'>Create an account</Link>
      <Link className="spacing" to='/reset-pw'>Reset password</Link>
    </div>;

    const resetPwJSX = <div div className='centered'>
      {this.returnDefaultLogo()}
      <ResetPwForm type="reset" onComplete={this.handlePwResetAndLogin}/>
      <span className='base'>Help me with something else?</span>
      <Link className="spacing" to='/login'>Login to RIMS</Link>
      <Link className="spacing" to='/forgot-pw'>Forgot Password</Link>
    </div>;

    const forgotPwJSX = <div div className='centered'>
      {this.returnDefaultLogo()}
      {this.state.tempPw ? this.state.tempPw : null}
      {
        !this.state.tempPw ?  <ResetPwForm type="forgot" onComplete={this.handleForgotMyPassword}/>
        : null
      }
      <span className='base'>Help me with something else?</span>
      <Link className="spacing" to='/login'>Login to RIMS</Link>
      <Link className="spacing" to='/signup'>Signup for RIMS</Link>
      <Link className="spacing" to='/forgot-un'>Forgot Username</Link>
      <Link className="spacing" to='/reset-pw'>Reset password</Link>
    </div>;

    const forgotUnJSX = <div div className='centered'>
      {this.returnDefaultLogo()}
      <p style={ {'text-align': 'center'} }>
        Send username to email is currently not supported. Come back soon.
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
  pGetRoles: roles => dispatch(dataActions.getRoles(roles)),
  pGetSubAssy: subAssy => dispatch(dataActions.getSubAssy(subAssy)),
  pGetParts: parts => dispatch(dataActions.getParts(parts)),
  handleForgotMyPassword: user => dispatch(authActions.handleForgotMyPassword(user)),
});

Landing.propTypes = {
  location: PropTypes.object,
  pDoSignUp: PropTypes.func,
  pDoLogin: PropTypes.func,
  pGetUsers: PropTypes.func,
  pGetRoles: PropTypes.func,
  pGetSubAssy: PropTypes.func,
  pGetParts: PropTypes.func,
  handlePwResetAndLogin: PropTypes.func,
  handleForgotMyPassword: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
