import React from 'react';
import { connect } from 'react-redux';
import * as dataActions from '../../action/data';
import PropTypes from "prop-types";
import NavUi from '../nav-ui/nav-ui';
import SiteBranding from '../site-branding/site-branding';
import './manage-accounts.scss';
import * as routes from '../../routes';

class ManageAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.showList = false;
  }

  handleShowList = () => {
    this.state.showList = true;
    this.setState(this.state);
  };

  genUserList = () => {
    const storedUsers = this.props.users;
    return storedUsers.map((eachUser) => {
        return <p key={Math.ceil(Math.random() * 1000000)}>{eachUser.username}</p>
      })
  };

  render() {
    const { location } = this.props;
    return (
      <section className="centered">
        <NavUi location={location}/>
        <br/>
        <br/>
        <section className="genUserList">
          <button className="genUserListButton" onClick={this.handleShowList}>Gen User List</button>
        </section>
        {this.state.showList === true ? this.genUserList() : null}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  pGetUsers: users => dispatch(dataActions.getUsers(users)),
});

ManageAccounts.propTypes = {
  location: PropTypes.object,
  pGetUsers: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccounts);
