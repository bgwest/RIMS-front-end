import { Link } from 'react-router-dom';
import React from 'react';

class NavUi extends React.Component {
  render() {
    return (
      <nav>
        <Link to='/part-create' className='centered button'>Create A Part</Link>
        <Link to='/subAssy-create' className='centered button'>Create A Sub Assembly</Link>
       <Link to='/dashboard' className='centered button'>Dashboard</Link>
    </nav>
    );
  }
}

export default NavUi;
