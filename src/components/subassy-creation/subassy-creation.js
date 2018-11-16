import React from 'react';
import { connect } from 'react-redux';
import SubCreateForm from '../sub-create-from/sub-create-form';
import * as creationAction from "../../action/create";
import PropTypes from "prop-types";

class SubassyCreation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SubCreateForm type='subcreate' onComplete={this.props.pCreateSubAssy}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pCreateSubAssy: subAssy => dispatch(creationAction.createSubAssy(subAssy)),
});

SubassyCreation.propTypes = {
  location: PropTypes.object,
  pCreateSubAssy: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(SubassyCreation);
