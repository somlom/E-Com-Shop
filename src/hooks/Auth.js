import React from "react"
import { useLocation } from "react-router-dom";

import { usePostData } from "./Data"
import { Auth } from "../pages/Auth";
import { Spinner } from "../components/Spinner";



export const ProtectedRoute = ({ children }) => {


    const result = usePostData("http://localhost:4000/auth/check_token", { token: localStorage.getItem("user") });

    if (result.value.response === true) {

        return children;

    } else if (result.value.response === false) {

        const location = useLocation()

        return <Auth next={location.pathname} />

    } else {

        return <Spinner />

    }
};