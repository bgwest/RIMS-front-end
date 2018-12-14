import React from 'react';
import PropTypes from 'prop-types';
import LogoUploadForm from '../logo-upload-form/logo-upload-form';
import NavUi from '../nav-ui/nav-ui';

// import * as routes from '../../routes';


class LogoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section>
        <NavUi location={this.props.location}/>
        <LogoUploadForm type="upload"/>
      </section>
    );
  }
}

LogoUpload.propTypes = {
  location: PropTypes.object,
};

export default LogoUpload;
