import React, { Suspense } from "react";

import { ResetForm } from "../../components/auth/ResetForm";
import { Spinner } from "../../components/other/Spinner/Spinner";


export default Reset = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <div className="responsible_form">
                <ResetForm />
            </div>
        </Suspense>
    )
}