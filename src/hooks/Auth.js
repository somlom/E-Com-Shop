import React from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";

import { Spinner } from "../components/other/Spinner";
import { useCheckTokenQuery } from "../features/cart/user_api";


export const ProtectedRoute = () => {
    const location = useLocation()
    const navigate = useNavigate();

    const value = useCheckTokenQuery();

    React.useEffect(() => {
        if (value.isError || value.response === false) {
            // navigate("/login", { state: { next: location.pathname, message: "You are have to be logged in to proceed" } })
            navigate("/login", { state: { next: location.pathname, message: "You are have to be logged in to proceed" } })
        }
    }, [value])

    if (value.isSuccess && value.data === true) {

        return <Outlet />;

    } else {

        return <Spinner />

    }
};

export const OnlyUnsignedRoute = () => {
    const navigate = useNavigate();

    const value = useCheckTokenQuery();

    React.useEffect(() => {
        if (value.isSuccess && value.data === true) {
            navigate("/account")
        }
    }, [value])

    if (value.isError || value.response === false) {

        return <Outlet />;

    } else {

        return <Spinner />

    }
};