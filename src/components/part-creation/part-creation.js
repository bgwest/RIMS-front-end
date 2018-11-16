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

  handleObjectIdLinkOnPartCreation = (partRequest) => {
    // here is where we receive the partRequest
    // we need to search for the associated subID on the sub assy schema
    // this will take care of auto assigning the ObjectID for the
    // schema link

    // closure var to get the ObjectID
    let objectID = null;
    this.props.subAssy.map((eachSubAssy) => {
      if (eachSubAssy.subId === partRequest.subIDRef) {
        objectID = eachSubAssy._id;
        partRequest.subAssembly = objectID;
      }
    });
    this.props.pCreatePart(partRequest);
  };

  render() {
    return (
      <div>
        <NavUi/>
        <CreatePartForm type='create' onComplete={this.handleObjectIdLinkOnPartCreation}/>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  subAssy: state.subAssy,
});

const mapDispatchToProps = dispatch => ({
  pCreatePart: part => dispatch(creationAction.createPart(part)),
});

PartCreation.propTypes = {
  location: PropTypes.object,
  pCreatePart: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PartCreation);
