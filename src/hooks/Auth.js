import { useEffect } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { Spinner } from '../Components/Other/Spinner/Spinner';
import { useGetData } from "./Data";


export const ProtectedRoute = () => {
    const [t] = useTranslation();
    const location = useLocation()
    const navigate = useNavigate();

    const data = useGetData("/auth/check_token", {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
    })

    useEffect(() => {
        if (data.isError) {
            navigate("/login", { state: { next: location.pathname, message: t("login_to_proceed") } })
        }
    }, [data])


    if (data.isSuccess === true) {

        return <Outlet />;

    } else {

        return <Spinner />

    }
};