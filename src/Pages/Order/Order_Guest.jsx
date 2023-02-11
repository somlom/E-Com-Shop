import { Navigate, useParams } from 'react-router-dom';
import axios from "axios"


export const Order_Guest = () => {

    const { id } = useParams();

    const resp = axios.post(process.env.API_URL + "/payment/pay_for_item", { id: id, quantity: 1 }, {headers:{Authorization: "Bearer "+localStorage.getItem("user")}},)
    return resp.then(fulfilled => (
        window.location.replace(fulfilled.data.data)
    ), () => (
        <Navigate to={"/"}/>
    )
    )
}
