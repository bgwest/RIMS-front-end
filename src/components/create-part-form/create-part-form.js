import React from 'react';
import PropTypes from 'prop-types';
import './create-form.scss';

const emptyState = {
  partId: '',
  partDescription: '',
  partSub: '',
  partSrc: '',
  partMfgNum: '',
  partPrice: '',
  partCategory: '',
  partLocation: '',
  partCount: '',
  partLongLead: '',
  partNotes: '',
  subAssembly: ''
};

class CreatePartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.type === 'create') {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    }
  };

  render() {
    let { type } = this.props;
    type = type === 'create' ? 'create' : 'create';
return (
      <div className='create-form'>
        <form onSubmit={this.handleSubmit}>
        <li>
          <label htmlFor='partId'>Part ID</label>
          <input
            name='partId'
            placeholder='Part ID'
            type='text'
            value={this.state.partId}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partDescription'>Part Description</label>
          <input
            name='partDescription'
            placeholder='Part Description'
            type='text'
            value={this.state.partDescription}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partSub'>Part Sub</label>
          <input
            name='partSub'
            placeholder='Part Sub true or false'
            type='text'
            value={this.state.partSub}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partSrc'>Part Source</label>
          <input
            name='partSrc'
            placeholder='Part Source'
            type='text'
            value={this.state.partSrc}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partMfgNum'>Part Mfg Num</label>
          <input
            name='partMfgNum'
            placeholder='Part Mfg Num'
            type='text'
            value={this.state.partMfgNum}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partPrice'>Part Price</label>
          <input
            name='partPrice'
            placeholder='Part Price'
            type='text'
            value={this.state.partPrice}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partCategory'>Part Category</label>
          <input
            name='partCategory'
            placeholder='Part Category'
            type='text'
            value={this.state.partCategory}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partLocation'>Part Location</label>
          <input
            name='partLocation'
            placeholder='Part Location'
            type='text'
            value={this.state.partLocation}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partCount'>Part Count</label>
          <input
            name='partCount'
            placeholder='Part Count'
            type='text'
            value={this.state.partCount}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partLongLead'>Part Long Lead</label>
          <input
            name='partLongLead'
            placeholder='Part Long Lead true or false'
            type='text'
            value={this.state.partLongLead}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='partNotes'>Part Notes</label>
          <input
            name='partNotes'
            placeholder='Part Notes'
            type='text'
            value={this.state.partNotes}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label htmlFor='subAssembly'>Sub Assy</label>
          <input
            name='subAssembly'
            placeholder='Sub Assy'
            type='text'
            value={this.state.subAssembly}
            onChange={this.handleChange}
          />
        </li>
        <button type='submit'>{type}</button>
        </form>
        {type !== 'create' ? createJSX : undefined}
      </div>
  )}
}

CreatePartForm.propTypes = {
  onComplete: PropTypes.func,
};

export default CreatePartForm;
