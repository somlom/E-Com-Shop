import React from "react"
import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "../components/Spinner";
import { useCheckTokenQuery } from "../features/cart/user_api";


export const ProtectedRoute = () => {

    const value = useCheckTokenQuery();

    if (value.isSuccess && value.data.response === true) {

        return <Outlet />;

    } else if (value.isError || value.response === false) {

        return <Navigate to={"/login"} />

    } else if (value.isLoading || value.isUninitialized) {

        return <Spinner />

    }
};