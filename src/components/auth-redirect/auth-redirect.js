import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../routes';

class AuthRedirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // If routes file was eventually better organized, there could
    //   be some type of Object.values / filter to auto-populate this.
    // For now, manually declare allowed navigation here which is NOT:
    //   '/', '/login', '/signup', or '/dashboard'.
    //   See additional handling below.
    this.approvedPaths = {
      [routes.LOGO_UPLOAD_FRONTEND]: routes.LOGO_UPLOAD_FRONTEND,
      [routes.ACCOUNTS_PAGE_FRONTEND]: routes.ACCOUNTS_PAGE_FRONTEND,
      [routes.SUBASSY_CREATION_FRONTEND]: routes.SUBASSY_CREATION_FRONTEND,
      [routes.PART_CREATION_FRONTEND]: routes.PART_CREATION_FRONTEND,
    };
  }

  // this method works predominantly because of the SPA nav
  // if we were constantly rendering to different pages, logic would get hairy
  handleRoutingCases(path, token) {
    let sendTo = null;

    // default for "un-authorized users"
    if (!token) {
      sendTo = routes.LOGIN_FRONTEND;
    }

    // default for new user sign-up
    if (!token && path === routes.SIGNUP_FRONTEND) {
      sendTo = routes.SIGNUP_FRONTEND;
    }

    // default for "authorized users"
    if (token) {
      sendTo = routes.DASHBOARD_FRONTEND;
    }

    // additional catch:
    // only allow additional 'site traveling' if path is on approvedPaths list
    if (token && this.approvedPaths[path]) {
      sendTo = path;
    }

    // final catch *:
    // if sendTo is still null, send to login and let above logic sort it out
    if (sendTo === null) {
      sendTo = routes.LOGIN_FRONTEND;
    }

    // update previousPath to prevent redundant redirects:
    if (sendTo !== null) {
      this.setState({ previousPath: sendTo });
    }

    return <Redirect to={sendTo}/>;
  }

  render() {
    const { token, location } = this.props;
    const path = location.pathname;

    return (
        <div>
          { /* prevents redundant redirects: */ }
          {path !== this.state.previousPath ? this.handleRoutingCases(path, token) : null}
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
