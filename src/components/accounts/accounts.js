import React from 'react';
import { connect } from 'react-redux';

// actions
import * as dataActions from '../../action/data';
import PropTypes from "prop-types";

class Accounts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( <section>
        <p>This will be the Accounts page.</p>
        {this.props.pGetUsers()}
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

Accounts.propTypes = {
  location: PropTypes.object,
  pGetUsers: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
