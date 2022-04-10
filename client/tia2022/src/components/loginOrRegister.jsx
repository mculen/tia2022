import React, { useState } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const LoginOrRegister = (props) => {
    const [isRegister, setRegister] = useState(false);

    function switchMode() {
        setRegister(!isRegister);
    }

    console.log("lor", props);
    const { logInFunction } = props;

    if (isRegister) {
        return <RegisterForm logInFunction={logInFunction} switchToLogin={switchMode} />;
    } else {
        return <LoginForm logInFunction={logInFunction} switchToRegister={switchMode} />;
    }
}

export default LoginOrRegister;