import React from 'react';
import PropTypes from 'prop-types';
import './sub-create.scss';

const emptyState = {
  subId: '',
  subPart: '',
  subVersion: '',
  subQuantity: '',
  subMinutes: '',
};

class SubCreateForm extends React.Component {
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

    if (this.props.type === 'subcreate') {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    }
  };

  render() {
    let { type } = this.props;
    type = type === 'subcreate' ? 'subcreate' : 'subcreate';
    return (
      <div className='create-form'>
        <form onSubmit={this.handleSubmit}>
          <li>
            <label htmlFor='subId'>Sub Assembly ID</label>
            <input
              name='subId'
              placeholder='Sub Assembly ID'
              type='text'
              value={this.state.subId}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <label htmlFor='subPart'>Sub Assy Part Number</label>
            <input
              name='subPart'
              placeholder='Sub Assy Part Number'
              type='text'
              value={this.state.subPart}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <label htmlFor='subVersion'>Version</label>
            <input
              name='subVersion'
              placeholder='Sub Assy Version'
              type='text'
              value={this.state.subVersion}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <label htmlFor='subQuantity'>Quantity</label>
            <input
              name='subQuantity'
              placeholder='Quantity'
              type='text'
              value={this.state.subQuantity}
              onChange={this.handleChange}
            />
          </li>
          <li>
            <label htmlFor='subMinutes'>Minutes to create</label>
            <input
              name='subMinutes'
              placeholder='Minutes'
              type='text'
              value={this.state.subMinutes}
              onChange={this.handleChange}
            />
          </li>
          <button type='submit'>{ type }</button>
        </form>
        {type !== 'subcreate' ? subJSX : undefined}
      </div>
    )
  }
}


SubCreateForm.propTypes = {
  onComplete: PropTypes.func,
};

export default SubCreateForm;
