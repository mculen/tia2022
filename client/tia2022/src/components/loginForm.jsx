import React, { useState } from "react";

const LoginForm = (props) => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  async function handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    const response = await props.logInFunction(login, password);
    console.log(response);
    if (!response.success) {
      setError(response.error);
    } else {
      setError("");
    }
  }

 return (
   <div className="lorFormOuter">
     <form className="lorForm" onSubmit={handleSubmit}>
         <div className="lorFormRow">Login: <input type="text" value={login} onChange={(event) => setLogin(event.target.value)} /></div>
         <div className="lorFormRow">Heslo: <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></div>
         <div className="lorFormButtons">
             <div className="lorFormSubmit"><input type="submit" value="Prihlásiť" /></div>
             <a href="#" className="lorFormSwitch" onClick={props.switchToRegister}>Registrovať</a>
         </div>
         <div className="lorFormError">{error}</div>
     </form>
   </div>
 );
}

export default LoginForm;