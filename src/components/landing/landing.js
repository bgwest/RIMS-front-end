import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthForm from '../auth-form/auth-form';
import * as routes from '../../routes';
import * as authActions from '../../action/auth';
import * as dungeonActions from '../../action/dungeon-traversal';

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
      <h2>Welcome to APIDnD!</h2>
      <Link to='/signup'>Sign up for APIDnD</Link>
      <Link to='/login'>Login to APIDnD</Link>
      <div>
         <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:4000/oauth/google&scope=openid%20email%20profile&client_id=341300853251-ofel2o78isg0si52k7qoq89dh6n0n4ve.apps.googleusercontent.com&prompt=consent&response_type=code">LOGIN WITH GOOGLE</a>
       </div>
    </div>;

    const signUpJSX = <div>
      <h2>Signup to APIDnD!</h2>
      <AuthForm type='signup' onComplete={this.handleSignup}/>
      <p>Already have an account?</p>
      <Link to='/login'>Login to APIDnD</Link>
      <div>
         <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:4000/oauth/google&scope=openid%20email%20profile&client_id=341300853251-ofel2o78isg0si52k7qoq89dh6n0n4ve.apps.googleusercontent.com&prompt=consent&response_type=code">LOGIN WITH GOOGLE</a>
       </div>
    </div>;

    const loginJSX = <div>
      <h2> Login to APIDnD</h2>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p> No account? </p>
      <Link to='/signup'>Signup for APIDnD</Link>
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
  dungeon: state.dungeon,
});

const mapDispatchToProps = dispatch => ({
  pDoSignUp: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
  pGetStatus: () => dispatch(dungeonActions.dungeonStartRequest()),
});

Landing.propTypes = {
  location: PropTypes.object,
  pDoSignUp: PropTypes.func,
  pDoLogin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
