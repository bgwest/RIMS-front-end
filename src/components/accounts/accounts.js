import React from 'react';
import { connect } from 'react-redux';

// actions
import * as dataActions from '../../action/data';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

class Accounts extends React.Component {
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
        return <p>{eachUser.username}</p>
      })
  };

  render() {

    return (
        <div>
          <button onClick={this.handleShowList}>Gen User List</button>
          <p>This will be the Accounts page.</p>
          {this.state.showList === true ? this.genUserList() : null}
          <Link to='/dashboard' className='centered'>Dashboard</Link>
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
