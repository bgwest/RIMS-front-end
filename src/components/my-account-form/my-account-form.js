import React from 'react';

class MyAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.emptyState = {
      username: '',
      oldPassword: '',
      newPassword: '',
      oldRecoveryQuestion: '',
      oldRecoveryAnswer: '',
      newRecoveryQuestion: '',
      newRecoveryAnswer: '',
    };
    this.state = this.emptyState;
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.setState(this.emptyState);
  }

  render() {
    return (
      <section className="create-form">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <li>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              placeholder="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange.bind(this)}
            />
          </li>
          <li>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              name="oldPassword"
              placeholder="old password"
              type="text"
              value={this.state.oldPassword}
              onChange={this.handleChange.bind(this)}
            />
          </li>
          <li>
            <label htmlFor="newPassword">New Password</label>
            <input
              name="newPassword"
              placeholder="new password"
              type="text"
              value={this.state.newPassword}
              onChange={this.handleChange.bind(this)}
            />
          </li>
          <li>
            <label htmlFor="oldRecoveryQuestion">Old Recovery Question</label>
            <input
              name="oldRecoveryQuestion"
              placeholder="old recovery question"
              type="text"
              value={this.state.oldRecoveryQuestion}
              onChange={this.handleChange.bind(this)}
            />
          </li>
          <li>
            <label htmlFor="oldRecoveryAnswer">Old Recovery Answer</label>
            <input
              name="oldRecoveryAnswer"
              placeholder="old recovery answer"
              type="text"
              value={this.state.oldRecoveryAnswer}
              onChange={this.handleChange.bind(this)}
            />
          </li>
          <li>
            <label htmlFor="newRecoveryQuestion">New Recovery Question</label>
            <input
              name="newRecoveryQuestion"
              placeholder="new recovery question"
              type="text"
              value={this.state.newRecoveryQuestion}
              onChange={this.handleChange.bind(this)}
            />
          </li>
          <li>
            <label htmlFor="newRecoveryAnswer">New Recovery Answer</label>
            <input
              name="newRecoveryAnswer"
              placeholder="new recovery answer"
              type="text"
              value={this.state.newRecoveryAnswer}
              onChange={this.handleChange.bind(this)}
            />
          </li>
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
}

export default MyAccountForm;
