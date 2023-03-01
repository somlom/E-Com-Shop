import { useEffect } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { Spinner } from '../Components/Other/Spinner/Spinner';
import { useGetData } from "./Data";


const ProtectedRoute = () => {
    const [t] = useTranslation();
    const location = useLocation()
    const navigate = useNavigate();

    const data = useGetData("/auth/check_token", {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
    })

    useEffect(() => {
        if (data.isError) {
            navigate("/login", { state: { next: location.pathname+location.search, message: t("login_to_proceed") } })
        }
    }, [data])


    if (data.isSuccess === true) {

        return <Outlet />;

    } else {

        return <Spinner />

    }
};

export const AdminRoute = () => {
    const navigate = useNavigate();

    const data = useGetData("/auth/admin", {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
    })

    useEffect(() => {
        if (data.isError) {
            navigate("/404")
        }
    }, [data])


    if (data.isSuccess === true) {

        return <Outlet />;

    } else {

        return <Spinner />

    }
};

export default ProtectedRoute;

// axios.post(`${process.env.API_URL}/auth/admin`, { token: totp }, { headers: { Authorization: "Bearer " + localStorage.getItem("user") } })