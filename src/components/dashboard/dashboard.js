import React from 'react';
import { connect } from 'react-redux';
import './dashboard.scss';
import PropTypes from 'prop-types';
import defaultLogo from '../../../assets/defaultLogo.png';
import SubAssembliesTable from '../sub-assemblies-table/sub-assemblies-table';
import * as dataActions from '../../action/data';
import NavUi from '../nav-ui/nav-ui';
import UnassociatedPartsTable from '../unassociated-parts-table/unassociated-parts-table';
import SiteBranding from '../site-branding/site-branding';
import TableSelectionForm from '../table-selection-form/table-selection-form';
import * as routes from '../../routes';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.state.tablesToRender = null;
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

  shouldSubAssembliesTableLoad() {
    return this.state.loadDataTable === false ? this.handleRenderingDataTableMsg() : <SubAssembliesTable/>;
  }

  shouldUnAsssociatedPartsLoad() {
    return this.state.loadDataTable === true
      ? <UnassociatedPartsTable unassociatedParts={this.getUnassociatedParts()}/>
      : null;
  }

  renderTables = (tablesToRender) => {
    // probably best to eventually create an object structure to easily organize renders,
    // but for now going to just hard code to prove concept
    return <section>
      {
    tablesToRender.map((table) => {
      if (table === 'subAssemblies') {
        return <SubAssembliesTable key={Math.ceil(Math.random() * 1000000)}/>;
      }
      if (table === 'unassociatedParts') {
        // wait for dataTable to finish gathering from store to get unassociatedParts
        return <UnassociatedPartsTable key={Math.ceil(Math.random() * 1000000)}
          unassociatedParts={this.getUnassociatedParts()}/>;
      }
    })
      }
      </section>
  };

  getTablesToRender(tables) {
    const getProperties = Object.keys(tables);
    const toRender = getProperties.filter((table) => {
      if (tables[table] === 'render') {
        return table;
      } // else
      return undefined;
    });
    this.setState({ tablesToRender: toRender});
  }

  render() {
    const { DASHBOARD_FRONTEND, BRANDING_FRONTEND } = routes;
    const { tablesToRender } = this.state;
    return (
        <div className='centered'>
          <NavUi location={this.props.location}/>
          <img src={defaultLogo} className='logo'/>
          {this.props.location.pathname === BRANDING_FRONTEND ? <SiteBranding/> : null }
          {this.props.location.pathname === DASHBOARD_FRONTEND ? <TableSelectionForm onComplete={this.getTablesToRender.bind(this)}/> : null}
          {tablesToRender ? this.renderTables(tablesToRender) : null}
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
