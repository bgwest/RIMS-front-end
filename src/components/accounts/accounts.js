import React from 'react';
import { connect } from 'react-redux';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>This will be the Accounts page.</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(Accounts);
