import React, { Suspense } from "react";

import "./Login.css"
import { LoginForm } from "../../components/auth/LoginForm";
import { Spinner } from "../../components/other/Spinner/Spinner";


const Login = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <div className="responsible_form">
                <LoginForm />
            </div>
        </Suspense>
    )
}

export default Login