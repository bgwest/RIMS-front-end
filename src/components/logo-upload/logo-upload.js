import React from 'react';
import PropTypes from 'prop-types';
import LogoUploadForm from '../logo-upload-form/logo-upload-form';
import NavUi from '../nav-ui/nav-ui';
import superagent from 'superagent';
import * as routes from '../../routes';
import { set } from '../../action/data';

// import * as routes from '../../routes';


class LogoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUpload(data) {
    console.log('got data');
    console.log('data.selectedFile');
    console.log(data.selectedFile);
    console.log('attempting upload');
    superagent.post(`http://localhost:3000${routes.POST_LOGO_BACKEND}`)
      .attach('image', data.selectedFile)
      .then((response) => {
        let getResponse = response;
        getResponse = JSON.parse(response.text);
        console.log('getResponse');
        console.log(getResponse);
      }).catch(console.error);
  }

  render() {
    return (
      <section>
        <NavUi location={this.props.location}/>
        <br/>
        <br/>
        <LogoUploadForm onComplete={this.handleUpload.bind(this)} type="upload"/>
      </section>
    );
  }
}

LogoUpload.propTypes = {
  location: PropTypes.object,
};

export default LogoUpload;
