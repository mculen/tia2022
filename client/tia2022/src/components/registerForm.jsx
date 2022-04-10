import React, { useState } from "react";

const RegisterForm = (props) => {

   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const [mail, setMail] = useState("");
console.log("reg", login, password);
   async function registerUser(login, password, name, mail) {
    const response = await fetch('./register.php', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: "login=" + login + "&password=" + password + "&name=" + name + "&mail=" + mail
    });
    const data = await response.json();
    await props.logInFunction(login, password);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await registerUser(login, password, name, mail);
  }

  return (
    <div className="lorFormOuter">
      <form className="lorForm" onSubmit={handleSubmit}>
          <div className="lorFormRow">Login: <input type="text" value={login} onChange={(event) => setLogin(event.target.value)} /></div>
          <div className="lorFormRow">Heslo: <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></div>
          <div className="lorFormRow">Meno: <input type="text" value={name} onChange={(event) => setName(event.target.value)} /></div>
          <div className="lorFormRow">E-mail: <input type="text" value={mail} onChange={(event) => setMail(event.target.value)} /></div>
          <div className="lorFormButtons">
              <div className="lorFormSubmit"><input type="submit" value="Registrovať" /></div>
              <a href="#" className="lorFormSwitch" onClick={props.switchToLogin}>Prihlásiť sa</a>
          </div>
      </form>
    </div>
  );
}

export default RegisterForm;