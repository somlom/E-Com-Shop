import React from "react"
import { Navigate, Outlet, redirect, useLocation } from "react-router-dom";

import { usePostData } from "./Data"
import { Auth } from "../pages/Auth";
import { Spinner } from "../components/Spinner";



export const ProtectedRoute = ({ children }) => {


    const result = usePostData("http://localhost:4000/auth/check_token", { token: localStorage.getItem("user") });

    if (result.value.response === true) {

        return <Outlet/>;

    } else if (result.value.response === false) {

        const location = useLocation()
        console.log(location.pathname)

        return <Navigate to={"/login"} />

    } else {

        return <Spinner />

    }
};