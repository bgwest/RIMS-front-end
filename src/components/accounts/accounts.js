import React from 'react';
import { connect } from 'react-redux';

// actions
import * as dataActions from '../../action/data';
import PropTypes from "prop-types";

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.props.pGetUsers();
    this.state = {};
    // this.state.userList = [];
    this.state.showList = false;
  }

  // genUserList = () => {
  //   // run pGetUsers and created user list out of the data
  //   return this.props.pGetUsers()
  //       .then((users) => {
  //         console.log('returned users');
  //         console.log(users.payload);
  //         this.state.userList = users.payload;
  //         this.state.showList = true;
  //         this.setState(this.state);
  //         return users.payload;
  //       }).catch(console.errors)
  // };

  handleShowList = () => {
    this.state.showList = true;
    this.setState(this.state);
  };

  genPTags = () => {
    const storedUsers = this.props.users;
    console.log('storedUsers');
    console.log(storedUsers);
    return storedUsers.map((eachUser) => {
        console.log('eachUser:');
        console.log(eachUser);
        return <p>{eachUser.username}</p>
      })
  };

  // userList = this.genUserList();

  render() {

    const { token, users } = this.props;
    return (
        <div>
          <button onClick={this.handleShowList}>Gen User List</button>
          <p>This will be the Accounts page.</p>
          {this.state.showList === true ? this.genPTags() : null}
        </div>
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

Accounts.propTypes = {
  location: PropTypes.object,
  pGetUsers: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
