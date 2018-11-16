import React from 'react';
import { connect } from 'react-redux';
import CreatePartForm from '../create-part-form/create-part-form';
import * as creationAction from "../../action/create";
import PropTypes from "prop-types";
import NavUi from '../nav-ui/nav-ui';

class PartCreation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavUi/>
        <CreatePartForm type='create' onComplete={this.props.pCreatePart}/>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  pCreatePart: part => dispatch(creationAction.createPart(part)),
});

PartCreation.propTypes = {
  location: PropTypes.object,
  pCreatePart: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(PartCreation);
