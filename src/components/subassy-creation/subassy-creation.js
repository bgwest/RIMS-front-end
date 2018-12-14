import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubCreateForm from '../sub-create-from/sub-create-form';
import * as creationAction from "../../action/create";
import NavUi from '../nav-ui/nav-ui';
import defaultLogo from '../../../assets/defaultLogo.png';


class SubassyCreation extends React.Component {

  render() {
    return (
      <div className='centered'>
        <NavUi/>
        <img src={defaultLogo} className='logo'/>
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
