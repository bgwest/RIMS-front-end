import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../routes';

class AuthRedirect extends React.Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    let destinationRoute = null;

    if (pathname === routes.LOGIN || pathname === routes.SIGNUP_FRONTEND
      || pathname === routes.ROOT) {
      if (token) {
        if (pathname === routes.CREATE_FRONTEND) {
          destinationRoute = routes.CREATE_FRONTEND;
        } // else
        destinationRoute = routes.DASHBOARD;
      }
    } else if (!token && pathname === routes.CREATE_PART_FRONTEND) {
      destinationRoute = routes.CREATE_PART_FRONTEND;
    } else if (!token && pathname === routes.CREATE_FRONTEND) {
      destinationRoute = routes.ROOT;
    } else if (!token && pathname === routes.ACCOUNTS_BACKEND) {
      destinationRoute = routes.ROOT;
    } else if (!token && pathname === routes.CREATE_SUBASSY_FRONTEND) {
      destinationRoute = routes.CREATE_SUBASSY_FRONTEND;
    }

    return (
        <div>
          { destinationRoute ? <Redirect to={destinationRoute}/> : undefined }
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
