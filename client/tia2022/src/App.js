import React, { useState, useEffect } from "react";
import './App.css';
import Header from "./components/header";
import ListOrUpload from "./components/listOrUpload";
import LoginOrRegister from "./components/loginOrRegister"

const App = (props) => {
  
  const [loggedUser, setLoggedUser] = useState({ logged_in: false });

  const logIn = async (login, password) => {
    var response;
    if (login && password) {
      var postData = new FormData();
      postData.append("login", login);
      postData.append("password", password);
      response = await fetch('./login.php', {
        method: 'POST',
        body: postData
      });
    } else {
      response = await fetch('./login.php');
    }
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.success) {
      setLoggedUser(responseJson.response);
    }
    return responseJson;
  }

  useEffect(() => {
    const tryLogIn = async () => {
      if (!loggedUser.logged_in) {
        await logIn();
      }
    }

    tryLogIn().catch(console.log);
  }, []);

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
