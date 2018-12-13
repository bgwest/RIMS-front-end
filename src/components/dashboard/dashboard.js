import React from 'react';
import { connect } from 'react-redux';
import './dashboard.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultLogo from '../../../assets/defaultLogo.png';
import DataTable from '../data-table/data-table';
import * as dataActions from '../../action/data';
import NavUi from '../nav-ui/nav-ui';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // refresh users ... may need to rework timing in future but will be fine for now
    this.props.pGetUsers();
    // waits to load data-table until props have refreshed
    // this is for user experience and to combat stale data
    this.state.loadDataTable = false;
    this.props.pGetSubAssy()
      .then((waitForSubToReturn) => {
        return this.props.pGetParts();
      }).then((waitForPartsToReturn) => {
        this.state.loadDataTable = true;
        this.setState(this.state);
      });
  }

  handleRenderingDataTableMsg() {
    return <p>Loading table...</p>;
  }

  render() {
    return (
        <div className='centered'>
          <NavUi/>
          <img src={defaultLogo} className='logo'/>
          {this.state.loadDataTable === false ? this.handleRenderingDataTableMsg() : <DataTable/>}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  subAssy: state.subAssy,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
