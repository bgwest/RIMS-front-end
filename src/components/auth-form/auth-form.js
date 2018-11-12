import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import './auth-form.scss';

const emptyState = {
  username: '',
  usernamePristine: true,
  usernameError: 'Username is required',
  email: '',
  emailPristine: true,
  emailError: 'Email is required',
  password: '',
  passwordPristine: true,
  passwordError: 'A password is required',
  securityQuestion: '',
  securityQuestionPristine: true,
  securityQuestionError: 'A question is required',
};

const MIN_NAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 6;
const MIN_SECURITY_LENGTH = 6;

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
      case 'email':
        if (!validator.isEmail(value)) {
          return 'Please provide a valid email address';
        }
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH) {
          return `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
        }
      case 'securityQuestion':
        if (value.length < MIN_SECURITY_LENGTH) {
          return `Your question must be at least ${MIN_SECURITY_LENGTH} characters long`;
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
    const {usernameError, emailError, passwordError, securityQuestionError} = this.state;

    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError && !securityQuestionError)) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    }
    this.setState({
      usernamePristine: false,
      passwordPristine: false,
      emailPristine: false,
      securityQuestionPristine: false,
    })
  };

  render() {
    let { type } = this.props;
    type = type === 'login' ? 'login' : 'signup';

    const signupJSX =
      <div className='auth-form signup'>
        <li>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          placeholder='enter your email'
          type='email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        </li>
        { this.state.emailPristine ? undefined : <p className='validation'>{this.state.emailError}</p> }
        <li>
        <label htmlFor='securityQuestion'>Security Question</label>
        <input
            name='securityQuestion'
            placeholder='security question'
            type='text'
            value={this.state.securityQuestion}
            onChange={this.handleChange}
        />
        </li>
      </div>;
    return(
      <div className='auth-form'>
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
          { this.state.securityQuestionPristine ? undefined : <p className='validation'>{this.state.securityQuestionError}</p> }
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
