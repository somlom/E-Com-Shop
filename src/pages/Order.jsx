import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import "../css/Order.scss"
import { Spinner } from '../components/Spinner'
import { usePostCartMutation } from '../features/cart/cart_api';
import { cartArray } from '../features/cart/cart_slice';
import { OrderCount } from "../components/order/OrderCount";
import { OrderData } from '../components/order/OrderData';
import { useCreateOrderMutation } from '../features/cart/payment_api';
import { Link, useNavigate } from 'react-router-dom';


export const Order = () => {

    const [t] = useTranslation();

    const cart = useSelector(cartArray);

    const [sendIt, data] = usePostCartMutation();

    const navigate = useNavigate()
    const [create_order, order] = useCreateOrderMutation(cart);

    // React.useLayoutEffect(() => {
    //     if (order.isSuccess) {
    //         navigate("/order/address", { state: { data: order } })
    //     }
    // }, [order.isSuccess])

    const send_data = async () => {
        await create_order(cart)
        // if (!order.isSuccess) {
        //     return <Spinner />
        // }
    }

    React.useLayoutEffect(() => {
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
            <React.Suspense fallback={<Spinner />}>
                <h1>{t("order")}</h1>
                <div className='order_items row'>
                    <div className='order_column column'>
                        <OrderData data={data.data} />
                    </div>
                    <div className='order_count'>
                        <OrderCount data={data.data}>
                            <Link to={"/order/address"} className='opacity' onClick={send_data}>{t("pay")}</Link>
                            {/* <a className='opacity' onClick={send_data}>{t("pay")}</a> */}
                        </OrderCount>
                    </div>
                </div>
            </React.Suspense>
        )
    }
}
