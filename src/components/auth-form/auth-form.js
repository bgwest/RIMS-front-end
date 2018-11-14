import React from 'react';
import PropTypes from 'prop-types';
import './auth-form.scss';

const emptyState = {
  username: '',
  usernamePristine: true,
  usernameError: 'Username is required',
  password: '',
  passwordPristine: true,
  passwordError: 'A password is required',
  recoveryQuestion: '',
  recoveryAnswer: '',
  recoveryAnswerPristine: true,
  recoveryAnswerError: 'A question is required',
};

const MIN_NAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 6;

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  handleValidation = (name, value) => {
    switch (name) {
      case 'username':
        if (value.length < MIN_NAME_LENGTH) {
          return `Your username must be a minimum of ${MIN_NAME_LENGTH} characters`;
        }
        return null;
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH) {
          return `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
        }
        return null;
      default:
        return null;
    }
  };

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
      [`${name}Pristine`]: false,
      [`${name}Error`]: this.handleValidation(name, value)
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {usernameError, passwordError, recoveryAnswerError} = this.state;

    if (this.props.type === 'login' || (!usernameError && !passwordError && !recoveryAnswerError)) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    }
    this.setState({
      usernamePristine: false,
      passwordPristine: false,
      recoveryAnswerPristine: false,
    })
  };

  render() {
    let { type } = this.props;
    type = type === 'login' ? 'login' : 'signup';

    const signupJSX =
      <div className='create-form signup'>
        <li>
          <label htmlFor='recoveryQuestion'>Choose a Question</label>
          <select
            name='recoveryQuestion'
            placeholder='recovery question'
            type='select'
            value={this.state.recoveryQuestion}
            onChange={this.handleChange}>
          <option value="recoveryQuestion">Name of your first pet?</option>
          <option value="recoveryQuestion">Street you grew up on</option>
          <option value="recoveryQuestion">Make of your first car</option>
          <option value="recoveryQuestion">Favorite Sports Team</option>
          </select>
        </li>
        <li>
        <label htmlFor='recoveryAnswer'>Recovery Answer</label>
        <input
            name='recoveryAnswer'
            placeholder='recovery answer'
            type='text'
            value={this.state.recoveryAnswer}
            onChange={this.handleChange}
        />
        </li>
      </div>;
    return(
      <div className='create-form'>
        <form onSubmit={this.handleSubmit}>
          <li>
          <label htmlFor='username'>User Name</label>
          <input
            name='username'
            placeholder='enter a username'
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
          />
          </li>
          { this.state.usernamePristine ? undefined : <p className='validation'>{this.state.usernameError}</p> }
          { type !== 'login' ? signupJSX : undefined }
          { this.state.recoveryAnswerPristine ? undefined : <p className='validation'>{this.state.recoveryAnswerError}</p> }
          <li>
          <label htmlFor='password'>Password</label>
          <input
              name='password'
              placeholder='please enter a password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
          />
          </li>
          { this.state.passwordPristine ? undefined : <p className='validation'>{this.state.passwordError}</p> }
          <button type='submit'>{ type }</button>
        </form>
      </div>
    );
  }
};

AuthForm.propTypes = {
  onComplete: PropTypes.func,
};

export default AuthForm;
