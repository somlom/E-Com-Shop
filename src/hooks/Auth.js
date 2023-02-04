import { useEffect } from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { Spinner } from '../Components/Other/Spinner/Spinner';
import { useGetData } from "./Data";


export const ProtectedRoute = () => {
    const location = useLocation()
    const navigate = useNavigate();

    const data = useGetData("/auth/check_token", {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
    })

    useEffect(() => {
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