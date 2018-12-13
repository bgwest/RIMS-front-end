import { Link } from 'react-router-dom';
import React from 'react';
import './nav-ui.scss';

class NavUi extends React.Component {
  render() {
    return (
      <nav className ='navigation'>
        <Link to='/dashboard' className='navLink'>Dashboard</Link>
        <Link to='/accounts' className='navLink'>Accounts</Link>
        <Link to='/part-create' className='navLink'>Create: Part</Link>
        <Link to='/subAssy-create' className='navLink'>Create: Sub Assembly</Link>
      </nav>
    );
  }
}

export default NavUi;
