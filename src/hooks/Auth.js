import React from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { Spinner } from '../components/other/Spinner/Spinner';
import { useGetProtectedData } from "./Data";


export const ProtectedRoute = () => {
    const location = useLocation()
    const navigate = useNavigate();

    const data = useGetProtectedData("/auth/check_token")

    React.useEffect(() => {
        if (data.isError) {
            navigate("/login", { state: { next: location.pathname, message: "You are have to be logged in to proceed" } })
        }
    }, [data])


    if (data.isSuccess === true) {

        return <Outlet />;

    } else {

        return <Spinner />

    }
};