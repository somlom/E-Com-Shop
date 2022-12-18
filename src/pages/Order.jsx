import React from 'react'
import { useSelector } from 'react-redux';

import { Delivery } from '../components/Delivery'
import { Order_Info } from '../components/Order_Info'
import { Order_Items } from '../components/Order_Items'
import { Payment } from '../components/Payment'
import { Spinner } from '../components/Spinner'
import { usePostCartMutation, useGetAllQuery } from '../features/cart/cart_api';
import { selectCount } from '../features/cart/cart_slice';


export const Order = () => {

    const cart = useSelector(selectCount);
    const [sendIt, data] = usePostCartMutation();

    React.useLayoutEffect(() => {
        const send_to_backend = async (cart) => {
            await sendIt(cart)
        }
        send_to_backend(cart.cart)

    }, [cart])
    console.log(data)
    return (
        <React.Suspense fallback={<Spinner />}>
            <Order_Items data={data} />
            {/* <Order_Info />
            <Delivery />
            <Payment /> */}
        </React.Suspense>
    )
}
