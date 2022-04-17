import React, { useState, useEffect } from "react";
import './App.css';
import Header from "./components/header";
import ListOrUpload from "./components/listOrUpload";
import LoginOrRegister from "./components/loginOrRegister"

const App = (props) => {
  
  const [loggedUser, setLoggedUser] = useState({ logged_in: false });

  useEffect(() => {
    const tryLogIn = async () => {
      if (!loggedUser.logged_in)
      await this.logIn();
    }

    tryLogIn().catch(console.log);
  }, []);

  const logIn = async (login, password) => {
    var response;
    if (login && password) {
      response = await fetch('./login.php', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: "login=" + login + "&password=" + password
      });
    } else {
      response = await fetch('./login.php');
    }
    const data = await response.json();
    setLoggedUser(data);
  }

  const logOut = async () => {
    await fetch('./logout.php');
    setLoggedUser({ logged_in: false });
  }

  return (
    <div className="App">
      <Header logged_user={loggedUser} logOutFunction={logOut}/>
      {
        loggedUser.logged_in ?
          <ListOrUpload />
        : <LoginOrRegister logInFunction={logIn}/>
      }
    </div>
  );
}

export default App;
