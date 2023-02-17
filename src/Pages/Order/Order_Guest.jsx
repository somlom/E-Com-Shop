import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from "axios"

import { Spinner } from '../../Components/Other/Spinner/Spinner';


export const Order_Guest = () => {

    const { id } = useParams();

    useEffect(() => {

        return () => {
            axios.post(process.env.API_URL + "/payment/pay_for_item", { id: id, quantity: 1 },
                { headers: { Authorization: "Bearer " + localStorage.getItem("user") } })
                .then(
                    fulfilled => (
                        window.location.replace(fulfilled.data.data)
                    ),
                    () => (
                        <Navigate to={"/"} />
                    )
                )
        }

    }, [id])

    return <Spinner />

}
