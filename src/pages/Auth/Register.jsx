import React, { Suspense } from "react";

import { RegisterForm } from "../../components/auth/RegisterForm";
import { Spinner } from "../../components/other/Spinner/Spinner";


const Register = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <div className="responsible_form">
                <RegisterForm />
            </div>
        </Suspense>
    )
}

export default Register 