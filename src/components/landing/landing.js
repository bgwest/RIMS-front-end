import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthForm from '../auth-form/auth-form';
import * as routes from '../../routes';
import * as authActions from '../../action/auth';

class Landing extends React.Component {

  handleLogin = (user) => {
    return this.props.pDoLogin(user)
        .then(() => {
          this.props.history.push(routes.DASHBOARD);
        })
        .catch(console.error);
  };

  handleSignup = (user) => {
    return this.props.pDoSignUp(user)
      .then((response) => {
        this.props.history.push(routes.DASHBOARD);
        return response;
      })
      .then(() => {
        return this.props.pGetStatus();
      })
      .catch(console.error);
  };

  render() {
    const rootJSX = <div>
      <h2>Welcome to FlySorter IMP</h2>
      <Link to='/signup'>Create an account</Link>
      <Link to='/login'>Login</Link>
    </div>;

    const signUpJSX = <div>
      <h2>FlySorter Signup</h2>
      <AuthForm type='signup' onComplete={this.handleSignup}/>
      <p>Already have an account?</p>
      <Link to='/login'>Login to FlySorter</Link>
    </div>;

    const loginJSX = <div>
      <h2>Login to FlySorter</h2>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p>No account?</p>
      <Link to='/signup'>Create an account</Link>
    </div>;

    const { location } = this.props;

    return (
        <nav>
          { location.pathname === routes.ROOT ? rootJSX : undefined }
          { location.pathname === routes.SIGNUP_FRONTEND ? signUpJSX : undefined }
          { location.pathname === routes.LOGIN ? loginJSX : undefined }
        </nav>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  pDoSignUp: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
});

Landing.propTypes = {
  location: PropTypes.object,
  pDoSignUp: PropTypes.func,
  pDoLogin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
