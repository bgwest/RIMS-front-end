import { Link } from 'react-router-dom';
import React from 'react';
import './nav-ui.scss';
import PropTypes from 'prop-types';
import * as routes from '../../routes';

class NavUi extends React.Component {
  // CSS classNames for each nav instance can be unique for custom looks
  whichMenuSet(location) {
    const homeSet = <nav className ='homeSetNavigation'>
      <Link to={routes.ACCOUNTS_PAGE_FRONTEND} className='navLink'>Accounts</Link>
      <Link to={routes.PART_CREATION_FRONTEND} className='navLink'>Create: Part</Link>
      <Link to={routes.SUBASSY_CREATION_FRONTEND} className='navLink'>Create: Sub Assembly</Link>
    </nav>;

    const creationSet = <nav className ='homeSetNavigation'>
      <Link to={routes.DASHBOARD_FRONTEND} className='navLink'>⬅ Dashboard</Link>
      <Link to={routes.ACCOUNTS_PAGE_FRONTEND} className='navLink'>Accounts</Link>
      <Link to={routes.PART_CREATION_FRONTEND} className='navLink'>Create: Part</Link>
      <Link to={routes.SUBASSY_CREATION_FRONTEND} className='navLink'>Create: Sub Assembly</Link>
    </nav>;

    const accountSet = <nav className ='accountSetNavigation'>
      <Link to={routes.DASHBOARD_FRONTEND} className='navLink'>⬅ Dashboard</Link>
      <Link to={routes.BRANDING_FRONTEND} className='navLink'>Site Branding</Link>
    </nav>;

    const logoUploadSet = <nav className ='accountSetNavigation'>
      <Link to={routes.ACCOUNTS_PAGE_FRONTEND} className='navLink'>⬅ Accounts</Link>
      <Link to={routes.DASHBOARD_FRONTEND} className='navLink'>Dashboard</Link>
    </nav>;

    if (location.pathname === routes.ACCOUNTS_PAGE_FRONTEND) {
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
      <div>
        {this.whichMenuSet(location)}
      </div>
    );
  }
}

NavUi.propTypes = {
  location: PropTypes.object,
};

export default NavUi;
