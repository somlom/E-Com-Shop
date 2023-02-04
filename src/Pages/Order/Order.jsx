import React, { lazy, useEffect, Suspense } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import "../../Components/Order/Order.css"
import { Spinner } from '../../Components/Other/Spinner/Spinner'
import { usePostCartMutation } from '../../features/cart_api';
import { cartArray } from '../../features/cart_slice';


const OrderCount = lazy(() => import("../../Components/Order/OrderCount"))
const OrderData = lazy(() => import("../../Components/Order/OrderData"))

export const Order = () => {

    const [t] = useTranslation();
    const cart = useSelector(cartArray);
    const [sendIt, data] = usePostCartMutation();

    const create_order = async (order) => {
        await axios.post(process.env.API_URL + "/payment/set_order", { cart: order }, { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } })
    }

    const send_data = async () => {
        const resp = await axios.get(`${process.env.API_URL}/payment/pay`, { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } })
        if (resp.data.status === true) {
            return window.location.replace(resp.data.data);
        } else {
            return window.location.replace("resp_data")
        }
    }

    useEffect(() => {
        const send_to_backend = async (cart) => {
            await sendIt(cart)
            await create_order(cart)
        }
        send_to_backend(cart)

    }, [cart])


    if (data.isError === true) {

        return <h1>{t("loading_error")}</h1>

    } else if ((data.isLoading) || data.isUninitialized) {

        return <Spinner />

    }
    else if (data.data.length === 0) {
        return <h1>No items</h1>
    }
    else {

        return (
            <Suspense fallback={<Spinner />}>
                <h1>{t("order")}</h1>
                <div className='order_items row'>
                    <div className='order_column column'>
                        <OrderData data={data.data} />
                    </div>
                    <div className='order_count'>
                        <OrderCount data={data.data}>
                            <a className='opacity' onClick={send_data}>{t("pay")}</a>
                        </OrderCount>
                    </div>
                </div>
            </Suspense>
        )
    }
}
