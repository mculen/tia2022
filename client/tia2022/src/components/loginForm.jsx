import React, { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.logInFunction = props.logInFunction;
    this.switchToRegister = props.switchToRegister;
    this.state = { login: '', password: '' };
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLoginChange(event) {
      this.setState({ login: event.target.value, password: this.state.password });
      console.log(this.state);
  }

  handlePasswordChange(event) {
    this.setState({ login: this.state.login, password: event.target.value });
    console.log(this.state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    await this.logInFunction(this.state.login, this.state.password);
  }

  render() {
    return (
      <div className="lorFormOuter">
        <form className="lorForm" onSubmit={this.handleSubmit}>
            <div className="lorFormRow">Login: <input type="text" value={this.state.login} onChange={this.handleLoginChange} /></div>
            <div className="lorFormRow">Heslo: <input type="password" value={this.state.password} onChange={this.handlePasswordChange} /></div>
            <div className="lorFormButtons">
                <div className="lorFormSubmit"><input type="submit" value="Prihlásiť" /></div>
                <a href="#" className="lorFormSwitch" onClick={this.switchToRegister}>Registrovať</a>
            </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;