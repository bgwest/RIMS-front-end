import React from 'react';
import { connect } from 'react-redux';
import './dashboard.scss';
import flySorterLogo from '../../../assets/flysorter-logo.png';
import { Link } from 'react-router-dom';
import DataTable from '../data-table/data-table';
import PropTypes from "prop-types";

// actions
import * as dataActions from "../../action/data";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div className='create-form centered'>
          <img src={flySorterLogo} className='logo'/>
          <Link to='/accounts' className='centered'>Accounts</Link>
          <DataTable/>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  subAssy: state.subAssy,
});

const mapDispatchToProps = dispatch => ({
  pGetSubAssy: subAssy => dispatch(dataActions.getSubAssy(subAssy)),
});

Dashboard.propTypes = {
  location: PropTypes.object,
  pGetUsers: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
