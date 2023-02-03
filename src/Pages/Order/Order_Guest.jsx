import { Navigate, useParams } from 'react-router-dom';
import axios from "axios"


export const Order_Guest = () => {

    const { id } = useParams();

    const resp = axios.post(process.env.API_URL + "/payment/pay_as_guest", { id: id, quantity: 1 },)
    return resp.then(fulfilled => (
        window.location.replace(fulfilled.data.data)
    ), () => (
        <Navigate to={"/"}/>
    )
    )
}
