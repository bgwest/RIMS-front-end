import React from 'react';
import { connect } from 'react-redux';
import * as dataActions from '../../action/data';
import PropTypes from "prop-types";
import NavUi from '../nav-ui/nav-ui';
import './accounts.scss';

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
        return <p key={Math.ceil(Math.random() * 1000000)}>{eachUser.username}</p>
      })
  };

  render() {

    return (
        <div className='centered'>
          <NavUi/>
          <br/>
          <br/>
          <button className="genUserList" onClick={this.handleShowList}>Gen User List</button>
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
