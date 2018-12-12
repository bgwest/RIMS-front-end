import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import CreatePartForm from '../create-part-form/create-part-form';
import NavUi from '../nav-ui/nav-ui';
import * as creationAction from "../../action/create";
import * as dataActions from "../../action/data";
import defaultLogo from '../../../assets/defaultLogo.png';

class PartCreation extends React.Component {
  constructor(props) {
    super(props);

    // in the event a part is being added to a brand new sub assy,
    // this will refresh the sub assy list with fresh DB query
    this.props.pGetSubAssy();
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
      <div className='centered'>
        <NavUi/>
        <img src={defaultLogo} className='logo'/>
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
  pGetSubAssy: subAssy => dispatch(dataActions.getSubAssy(subAssy)),
});

PartCreation.propTypes = {
  location: PropTypes.object,
  pCreatePart: PropTypes.func,
  pGetSubAssy: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PartCreation);
