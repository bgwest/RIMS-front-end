import React from 'react';
import { connect } from 'react-redux';
import './dashboard.scss';
import flySorterLogo from '../../../assets/flysorter-logo.png';
import { Link } from 'react-router-dom';
import DataTable from '../data-table/data-table';
import PropTypes from "prop-types";

// actions
import * as dataActions from "../../action/data";
import NavUi from '../nav-ui/nav-ui';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // waits to load data-table until props have refreshed
    // this is for user experience and to combat stale data
    this.state.loadDataTable = false;
    this.props.pGetSubAssy()
        .then((waitForSubToReturn) => {
          return this.props.pGetParts();
        }).then((waitForPartsToReturn) => {
          this.state.loadDataTable = true;
          this.setState(this.state);
        })
  }

  handleRenderingDataTableMsg() {
    return <p>Updating data...</p>
  }

  render() {

    return (
        <div className='create-form centered'>
          <NavUi/>
          <img src={flySorterLogo} className='logo'/>
          <Link to='/accounts' className='centered'>Accounts</Link>
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
});

Dashboard.propTypes = {
  location: PropTypes.object,
  pGetUsers: PropTypes.func,
  pGetParts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
