import React from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import SiteBrandingUploadForm from '../site-branding-upload-form/site-branding-upload-form';
import NavUi from '../nav-ui/nav-ui';
import * as routes from '../../routes';
import './site-branding.scss';


class SiteBranding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.logo = null;
  }

  handleUpload(data) {
    console.log('got data');
    console.log('data.selectedFile');
    console.log(data.selectedFile);
    console.log('attempting upload');
    superagent.post(`${API_URL}${routes.POST_LOGO_BACKEND}`)
      .attach('image', data.selectedFile)
      .then((response) => {
        let getResponse = response;
        getResponse = JSON.parse(response.text);
        // console.log('getResponse');
        // console.log(getResponse);
        superagent.get(`${API_URL}${routes.GET_LOGO_BACKEND}`)
          .then((uploadedImage) => {
            const logo = uploadedImage.body.base64;
            this.setState({ logo });
          }).catch(console.error);
      }).catch(console.error);
  }

  renderLogo() {
    const base64String = `base64,${this.state.logo}`;
    return <img alt='image' src={`data:image/jpeg;${base64String}`} />;
  }

  render() {
    return (
      <section id="siteBranding">
        <NavUi location={this.props.location}/>
        <h1 className="siteBrandingHeader">Update Branding</h1>
        <br/>
        <br/>
        <SiteBrandingUploadForm onComplete={this.handleUpload.bind(this)} type="upload"/>
        {this.state.logo ? this.renderLogo() : null}
      </section>
    );
  }
}

SiteBranding.propTypes = {
  location: PropTypes.object,
};

export default SiteBranding;
