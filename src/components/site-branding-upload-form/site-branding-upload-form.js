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
      classNames: 'dragHere',
      uploadComplete: false,
    };
    this.state = this.emptyState;
  }

  handleFile(event) {
    const files = event.target ? event.target.files[0] : event[0];
    this.setState({
      selectedFile: files,
      loaded: 0,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState({ ...this.emptyState, uploadComplete: true });
  }

  renderUploadButton() {
    return <button className="box__button" type="submit">Upload Logo</button>;
  }

  renderUploadPlaceHolder() {
    return <p className="uploadPlaceHolder">Upload Logo</p>;
  }

  dragDrop(event) {
    event.preventDefault();
    console.log('dragDrop ran');
    let data;
    // data = event.dataTransfer.getData('image/png');
    data = event.dataTransfer.files;

    // Do something with the data
    console.log(data);
    this.setState({ classNames: 'dragHere' });
    this.handleFile(data);
  }

  dragStart(event) {
    event.preventDefault();
    console.log('dragStart ran');
  }

  dragOver(event) {
    event.preventDefault();
    this.setState({ classNames: 'dragHere imageDrop' });
  }

  dragExit(event) {
    event.preventDefault();
    this.setState({ classNames: 'dragHere' });
  }

  fileIsLoaded(file) {
    return <h2><span className='loadedBaby'>{file}</span> loaded.</h2>;
  }

  dropText(type) {
    if (type === 'after') {
      return <span>drop :)</span>;
    }
    if (type === 'before') {
      return <span>&hellip; or drag here and &hellip;</span>;
    }
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
            {!this.state.selectedFile.name
              ? <input className="box__file"
                       onChange={this.handleFile.bind(this)}
                       type="file"
                       name="files[]"
                       id="file"
                       data-multiple-caption="{count} files selected" multiple/>
              : this.fileIsLoaded(this.state.selectedFile.name) }
            {!this.state.selectedFile.name
              ? <section className={this.state.classNames} draggable="true"
                         onDragOver={this.dragOver.bind(this)} onDragStart={this.dragStart}
                         onDrop={this.dragDrop.bind(this)} onDragExit={this.dragExit.bind(this)}>
            <label htmlFor="file">
              <span className="box__dragndrop">{this.state.classNames === 'dragHere imageDrop' ? this.dropText('after') : this.dropText('before')}</span>
            </label>
            </section>
              : null}
            <p><i>notes:</i></p>
            <p><i>- the image must be named: company-logo</i></p>
            <p><i>- accepted extensions: .jpg, .jpeg, .png</i></p>
            {this.state.selectedFile.name ? this.renderUploadButton() : this.renderUploadPlaceHolder()}
            {this.state.uploadComplete ? <h1 className='uploadComplete'>Upload complete.</h1> : null}
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
