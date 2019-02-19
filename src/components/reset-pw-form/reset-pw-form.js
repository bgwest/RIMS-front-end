import React from 'react';

import './reset-pw-form.scss';

class ResetPwForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      currentPassword: '',
      newPassword: '',
      verifyNewPassword: '',
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
  };

  render() {
    return (
     <div className="createForm">
       <form className="auth-form" onSubmit={this.handleSubmit}>
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
       </form>
     </div>
    );
  }
}

export default ResetPwForm;
