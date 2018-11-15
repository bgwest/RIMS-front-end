import React from 'react';
import { connect } from 'react-redux';
import SubCreateForm from '../sub-create/sub-create';

class SubCreate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SubCreateForm/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(SubCreate);
