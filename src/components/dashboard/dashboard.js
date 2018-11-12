import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>You are logged in to FlySorter</p>
        <p>SEARCH FUNCTIONALITY HERE</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(Dashboard);
