import React from 'react';
import PropTypes from 'prop-types';
// styles
import './site-branding-upload-form.scss';

class SiteBrandingUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.emptyState = {
      selectedFile: [],
      loaded: 0,
    };
    this.state = this.emptyState;
  }

  handleFile(event) {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(this.emptyState);
  }

  renderUploadButton() {
    return <button className="box__button" type="submit">Upload Logo</button>;
  }

  renderUploadPlaceHolder() {
    return <p className="uploadPlaceHolder">Upload Logo</p>;
  }

  render() {
    console.log('this.state:');
    console.log(this.state);
    return (
      <div>
        <h1>Update Site Branding</h1>
        <form className="box"
              onSubmit={this.handleSubmit.bind(this)}
              method="post"
              action=""
              encType="multipart/form-data">
          <div className="box__input">
            <input className="box__file"
                   onChange={this.handleFile.bind(this)}
                   type="file"
                   name="files[]"
                   id="file"
                   data-multiple-caption="{count} files selected" multiple/>
            <section className="dragHere">
            <label htmlFor="file">
              <span className="box__dragndrop">&hellip; or drag it here :)</span>
            </label>
            </section>
            <p><i>notes:</i></p>
            <p><i>- the image must be named: company-logo</i></p>
            <p><i>- accepted extensions: .jpg, .jpeg, .png</i></p>
            {this.state.selectedFile.name ? this.renderUploadButton() : this.renderUploadPlaceHolder()}
          </div>
        </form>
      </div>
    );
  }
}

SiteBrandingUploadForm.propTypes = {
  onComplete: PropTypes.func,
};

export default SiteBrandingUploadForm;
