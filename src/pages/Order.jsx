import React from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import "../components/Order/Order.scss"
import { Spinner } from '../components/other/Spinner'
import { usePostCartMutation } from '../features/cart/cart_api';
import { cartArray } from '../features/cart/cart_slice';
import { OrderCount } from "../components/Order/OrderCount";
import { OrderData } from '../components/Order/OrderData';
import { useCreateOrderMutation } from '../features/payment/payment_api';


export const Order = () => {

    const [t] = useTranslation();
    const cart = useSelector(cartArray);
    const [sendIt, data] = usePostCartMutation();
    const [create_order] = useCreateOrderMutation();

    const send_data = async () => {
        const resp = await axios.get(`http://${process.env.PUBLIC_URL}/payment/pay`, { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } })
        console.log(resp.data)
        return window.location.replace(resp.data);
    }

    React.useEffect(() => {
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
                            <a className='opacity' onClick={send_data}>{t("pay")}</a>
                        </OrderCount>
                    </div>
                </div>
            </React.Suspense>
        )
    }
}
