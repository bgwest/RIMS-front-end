// packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// custom components
import NavUi from '../nav-ui/nav-ui';
import MyAccountForm from '../my-account-form/my-account-form';

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
        <MyAccountForm token={this.props.token}/>
      </section>
    );
  }
}

MyAccount.propTypes = {
  location: PropTypes.object,
  token: PropTypes.array,
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(MyAccount);
