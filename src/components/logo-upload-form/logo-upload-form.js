import React from 'react';
import PropTypes from 'prop-types';

class LogoUploadForm extends React.Component {
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

  render() {
    console.log('this.state:');
    console.log(this.state);
    return (
      <div>
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
            <label htmlFor="file"><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span></label>
            <br/>
            <br/>
            <button className="box__button" type="submit">Upload</button>
          </div>
          {/* <div className="box__uploading">Uploading</div> */}
          {/* <div className="box__success">Done!</div> */}
          {/* <div className="box__error">Error!</div> */}
        </form>
      </div>
    );
  }
}

LogoUploadForm.propTypes = {
  onComplete: PropTypes.func,
};

export default LogoUploadForm;
