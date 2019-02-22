import React from 'react';

import './reset-pw-form.scss';

class ResetPwForm extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      username: '',
      currentPassword: '',
      newPassword: '',
      verifyNewPassword: '',
    };

    // these should really come from the database
    // refactor asap to be received in redux store from DB
    this.recoveryQuestionOptions = {
      pet: 'What is the name of your first pet?',
      car: 'What was the make of your first car?',
      street: 'What street did you grew up on?',
      sports: 'What is your favorite sports team?',
      college: 'What class in college did you graduate with high honors?',
    };

    this.state = this.defaultState;
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    this.props.onComplete(this.state);
  };

  resetPwForm = () => {
    return <form className="auth-form" onSubmit={this.handleSubmit}>
      <li>
        <label>Username</label>
        <input
          name="username"
          placeholder="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
      </li>
        <li>
          <label>Current Password</label>
          <input
            name="currentPassword"
            placeholder="Current Passsword"
            type="password"
            value={this.state.currentPassword}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label>New Password</label>
          <input
            name="newPassword"
            placeholder="New Passsword"
            type="password"
            value={this.state.newPassword}
            onChange={this.handleChange}
          />
        </li>
        <li>
          <label>Verify New Password</label>
          <input
            name="verifyNewPassword"
            placeholder="Verify New Password"
            type="password"
            value={this.state.verifyNewPassword}
            onChange={this.handleChange}
          />
        </li>
        <button type="submit">submit</button>
      </form>;
  };

  generateRecoveryQuestionOptions() {
    const recoveryQuestionOptions = Object.values(this.recoveryQuestionOptions);
    return recoveryQuestionOptions.map((option) => {
      return <option key={Math.ceil(Math.random() * 1000000)} value={option}>{option}</option>
    });
  }

  forgotPwForm = () => {
   return <form className="auth-form" onSubmit={this.handleSubmit}>
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
     <li>
       <label htmlFor='recoveryQuestion'>Recovery Question</label>
       <select
         name='recoveryQuestion'
         placeholder='recovery question'
         type='select'
         value={this.state.recoveryQuestion}
         onChange={this.handleChange}>
         { /* blank option needed to support state change... */ }
         <option value='blank'></option>
         { this.generateRecoveryQuestionOptions() }
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
     <button type='submit'>submit</button>
   </form>
  };

  getHeader(type) {
    if (type === 'reset') {
      return <h2 className="reset-form-header">
        Reset Password
      </h2>;
    }
    if (type === 'forgot'){
      return <h2 className="reset-form-header">
        Forgot My Password
      </h2>;
    } // else
    return null;
  }

  render() {
    const { type } = this.props;
    let h2 = this.getHeader(type);
    return (
      <div className="createForm">
        {h2}
        { type === 'reset' ? this.resetPwForm() : null }
        { type === 'forgot' ? this.forgotPwForm() : null }
      </div>
    );
  }
}

export default ResetPwForm;
