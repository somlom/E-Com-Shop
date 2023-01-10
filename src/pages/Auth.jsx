import React from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";
import { ResetForm } from "../components/auth/ResetForm";

export const Login = () => {
    return (
        <div className="responsible_form">
            <LoginForm />
        </div>
    )
}

export const Register = () => {
    return (
        <div className="responsible_form">
            <RegisterForm />
        </div>
    )
}

export const Reset = () => {
    return (
        <div className="responsible_form">
            <ResetForm />
        </div>
    )
}