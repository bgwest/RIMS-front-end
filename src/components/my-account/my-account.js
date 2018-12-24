// packages
import PropTypes from 'prop-types';
import React from 'react';

// custom components
import NavUi from '../nav-ui/nav-ui';
import MyAccountForm from '../my-account-form/my-account-form.js';

// styles
import './my-account.scss';

class MyAccount extends React.Component {
  render() {
    const { location } = this.props;
    console.log(location);
    return (
      <section className="centered">
        <NavUi location={location}/>
        <h1 className="myAccountPageHeader">View/Edit My Account</h1>
        <MyAccountForm/>
      </section>
    );
  }
}

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
