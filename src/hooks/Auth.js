import React from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { Spinner } from '../components/other/Spinner/Spinner';
import { useCheckTokenQuery } from "../features/user/user_api";


export const ProtectedRoute = () => {
    const location = useLocation()
    const navigate = useNavigate();

    const value = useCheckTokenQuery();

    console.log(value)

    React.useEffect(() => {
        if (value.isError) {
            // navigate("/login", { state: { next: location.pathname, message: "You are have to be logged in to proceed" } })
            navigate("/login", { state: { next: location.pathname, message: "You are have to be logged in to proceed" } })
        }
    }, [value])

    if (value.isSuccess || value.data === true) {

        return <Outlet />;

    } else {

        return <Spinner />

    }
};