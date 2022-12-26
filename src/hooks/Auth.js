import React from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { Spinner } from "../components/Spinner";
import { useCheckTokenQuery } from "../features/cart/user_api";


export const ProtectedRoute = () => {
    const location = useLocation()
    const navigate = useNavigate();

    const value = useCheckTokenQuery();

    if (value.isSuccess && value.data === true) {

        return <Outlet />;

    } else if (value.isError || value.response === false) {

        return navigate("/login", {state: {next: location.pathname} })

    } else if (value.isLoading || value.isUninitialized) {

        return <Spinner />

    }
};