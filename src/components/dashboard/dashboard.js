import React from 'react';
import { connect } from 'react-redux';
import './dashboard.scss';
import PropTypes from 'prop-types';
import defaultLogo from '../../../assets/defaultLogo.png';
import DataTable from '../data-table/data-table';
import * as dataActions from '../../action/data';
import NavUi from '../nav-ui/nav-ui';
import UnassociatedPartsTable from '../unassociated-parts-table/unassociated-parts-table';
import LogoUpload from '../logo-upload/logo-upload';
import * as routes from '../../routes';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.unassociatedParts = null;
    // refresh users ... may need to rework timing in future but will be fine for now
    this.props.pGetUsers();
    // waits to load data-table until props have refreshed
    // this is for user experience and to combat stale data
    this.state.loadDataTable = false;
    this.props.pGetSubAssy()
      .then((waitForSubToReturn) => { // eslint-disable-line no-unused-vars
        return this.props.pGetParts();
      }).then((waitForPartsToReturn) => { // eslint-disable-line no-unused-vars
        this.state.loadDataTable = true;
        this.setState(this.state);
      });
  }

  handleRenderingDataTableMsg() {
    return <p>Loading table...</p>;
  }

  getUnassociatedParts() {
    const unassociatedParts = this.props.parts.filter((part) => {
      if (!part.subIDRef) {
        return part;
      } // else
      return undefined;
    });
    return unassociatedParts;
  }

  shouldDataTableLoad() {
    return this.state.loadDataTable === false ? this.handleRenderingDataTableMsg() : <DataTable/>;
  }

  shouldUnAsssociatedPartsLoad() {
    return this.state.loadDataTable === true
      ? <UnassociatedPartsTable unassociatedParts={this.getUnassociatedParts()}/>
      : null;
  }

  render() {
    const { DASHBOARD_FRONTEND, LOGO_UPLOAD_FRONTEND } = routes;
    return (
        <div className='centered'>
          <NavUi location={this.props.location}/>
          <img src={defaultLogo} className='logo'/>
          {this.props.location.pathname === DASHBOARD_FRONTEND ? this.shouldDataTableLoad() : null}
          {/* wait for dataTable to finish gathering from store to get unassociatedParts */}
          {this.props.location.pathname === DASHBOARD_FRONTEND ? this.shouldUnAsssociatedPartsLoad() : null}
          {this.props.location.pathname === LOGO_UPLOAD_FRONTEND ? <LogoUpload/> : null }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  subAssy: state.subAssy,
  users: state.users,
  parts: state.parts,
});

const mapDispatchToProps = dispatch => ({
  pGetSubAssy: subAssy => dispatch(dataActions.getSubAssy(subAssy)),
  pGetParts: parts => dispatch(dataActions.getParts(parts)),
  pGetUsers: users => dispatch(dataActions.getUsers(users)),
});

Dashboard.propTypes = {
  location: PropTypes.object,
  pGetUsers: PropTypes.func,
  pGetParts: PropTypes.func,
  pGetSubAssy: PropTypes.func,
  parts: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
