import React, { Component } from "react";
import './App.css';
import Header from "./components/header";
import DocumentList from "./components/documentList";
import LoginOrRegister from "./components/loginOrRegister"

class App extends Component {
  constructor() {
    super();
    this.state = { logged_user: { logged_in: false } };
  }

  async componentDidMount() {
    if (!this.state.logged_user.logged_in) {
      await this.logIn();
    }
  }

  async logIn(login, password) {
    var response;
    if (login && password) {
      console.log("lp login");
      response = await fetch('./login.php', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: "login=" + login + "&password=" + password
      });
    } else {
      console.log("autologin");
      response = await fetch('./login.php');
    }
    const data = await response.json();
    console.log("logIn", data);
    this.setState({ logged_user: data });
    console.log("logIn", data);
  }

  async logOut() {
    await fetch('./logout.php');
    this.setState({ logged_user: { logged_in: false } });
  }

  render() {
    console.log("render", this.state);
    return (
      <div className="App">
        <Header logged_user={this.state.logged_user} logOutFunction={this.logOut.bind(this)}/>
        {
          this.state.logged_user.logged_in ?
            <DocumentList />
          : <LoginOrRegister logInFunction={this.logIn.bind(this)}/>
        }
      </div>
    );
  }
}

export default App;
