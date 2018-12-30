import { Link } from 'react-router-dom';
import React from 'react';
import './nav-ui.scss';
import PropTypes from 'prop-types';
import * as routes from '../../routes';

class NavUi extends React.Component {
  // CSS classNames for each nav instance can be unique for custom looks
  whichMenuSet(location) {
    const homeSet = <nav className ='homeSetNavigation'>
      <Link to={routes.PART_CREATION_FRONTEND} className='navLink'>Create: Part</Link>
      <Link to={routes.SUBASSY_CREATION_FRONTEND} className='navLink'>Create: Sub Assembly</Link>
      <nav className="myAccountMenu">
        <Link to={routes.MY_ACCOUNT_FRONTEND} className='navLink myAccount'>My Account</Link>
        <ul className="dropdown">
          <Link to={routes.SETTINGS_FRONTEND} className='navLink'>Settings</Link>
        </ul>
      </nav>
    </nav>;

    const creationSet = <nav className ='homeSetNavigation'>
      <Link to={routes.DASHBOARD_FRONTEND} className='navLink'>⬅ Dashboard</Link>
      <Link to={routes.PART_CREATION_FRONTEND} className='navLink'>Create: Part</Link>
      <Link to={routes.SUBASSY_CREATION_FRONTEND} className='navLink'>Create: Sub Assembly</Link>
      <nav className="myAccountMenu">
        <Link to={routes.MY_ACCOUNT_FRONTEND} className='navLink myAccount'>My Account</Link>
        <ul className="dropdown">
          <Link to={routes.SETTINGS_FRONTEND} className='navLink'>Settings</Link>
        </ul>
      </nav>
    </nav>;

    const accountSet = <nav className ='accountSetNavigation'>
      <Link to={routes.DASHBOARD_FRONTEND} className='navLink'>Dashboard</Link>
      <Link to={routes.BRANDING_FRONTEND} className='navLink'>Site Branding</Link>
      <nav className="myAccountMenu">
        <Link to={routes.MY_ACCOUNT_FRONTEND} className='navLink myAccount'>My Account</Link>
        <ul className="dropdown">
          <Link to={routes.SETTINGS_FRONTEND} className='navLink'>Settings</Link>
        </ul>
      </nav>
    </nav>;

    const logoUploadSet = <nav className ='accountSetNavigation'>
      <Link to={routes.DASHBOARD_FRONTEND} className='navLink'>Dashboard</Link>
      <nav className="myAccountMenu">
        <Link to={routes.MY_ACCOUNT_FRONTEND} className='navLink myAccount'>My Account</Link>
        <ul className="dropdown">
          <Link to={routes.SETTINGS_FRONTEND} className='navLink'>Settings</Link>
        </ul>
      </nav>
    </nav>;

    if (location.pathname === routes.MY_ACCOUNT_FRONTEND) {
      console.log('loading accountSet');
      return accountSet;
    }

    if (location.pathname === routes.PART_CREATION_FRONTEND || location.pathname === routes.SUBASSY_CREATION_FRONTEND) { // eslint-disable-line max-len
      return creationSet;
    }

    if (location.pathname === routes.BRANDING_FRONTEND) {
      return logoUploadSet;
    } // else ...

    return homeSet;
  }

  render() {
    const { location } = this.props;
    return (
      <div id="navControl">
        {this.whichMenuSet(location)}
      </div>
    );
  }
}

NavUi.propTypes = {
  location: PropTypes.object,
};

export default NavUi;
