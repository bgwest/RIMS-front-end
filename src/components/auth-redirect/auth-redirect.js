import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../routes';

class AuthRedirect extends React.Component {
  render() {
    const { token } = this.props;

    return (
        <div>
          { !token ? <Redirect to={routes.LOGIN}/> : <Redirect to={routes.DASHBOARD}/> }
        </div>
    );
  }
}

AuthRedirect.propTypes = {
  token: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
