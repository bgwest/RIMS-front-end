import React from 'react';
import { connect } from 'react-redux';

// actions
import * as dataActions from '../../action/data';
import PropTypes from "prop-types";

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    // NOTE:
    //   called immediately to update store
    //   this.props.getUsers() should eventually be moved to our
    //   app.js or landing.js along with our future search query...
    //   that will ensure this data is in store and ready to be used
    //   on these components
    // this.props.pGetUsers();
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
        return <p>{eachUser.username}</p>
      })
  };

  render() {

    return (
        <div>
          <button onClick={this.handleShowList}>Gen User List</button>
          <p>This will be the Accounts page.</p>
          {this.state.showList === true ? this.genUserList() : null}
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
