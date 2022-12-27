import React from 'react'
import { useSelector } from 'react-redux';

import "../css/Order.scss"
import { Spinner } from '../components/Spinner'
import { usePostCartMutation } from '../features/cart/cart_api';
import { cartArray } from '../features/cart/cart_slice';
import { OrderCount } from "../components/order/OrderCount";
import { OrderData } from '../components/order/OrderData';


export const Order = () => {

    const cart = useSelector(cartArray);
    const [sendIt, data] = usePostCartMutation();

    React.useLayoutEffect(() => {
        const send_to_backend = async (cart) => {
            await sendIt(cart)
        }
        send_to_backend(cart)

    }, [cart])

    if (data.isError === true) {

        return <h1>Sorry, try later </h1>

    } else if ((data.isLoading) || data.isUninitialized) {

        return <Spinner />

    } else {

        return (
            <React.Suspense fallback={<Spinner />}>
                <h1>Order</h1>
                <div className='order_items row'>
                    <div className='order_column column'>
                        <OrderData data={data.data} />
                    </div>
                    <div className='order_count'>
                        <OrderCount data={data.data} />
                    </div>
                </div>
            </React.Suspense>
        )
    }
}
