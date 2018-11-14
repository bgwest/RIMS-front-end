import React from 'react';
import { connect } from 'react-redux';
import CreateForm from '../create-form/create-form';

class Create extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CreateForm/>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(Create);
