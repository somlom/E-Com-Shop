import React, { Suspense } from "react";

import "./Login.css"
import { LoginForm } from "../../components/auth/LoginForm";


const Login = () => {
    return (
        <div className="responsible_form">
            <LoginForm />
        </div>
    )
}

export default Login