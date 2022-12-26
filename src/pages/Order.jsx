import React from 'react'
import { useSelector } from 'react-redux';

import { Address, Order_Items } from '../components/Order_Components'
import { Spinner } from '../components/Spinner'
import { usePostCartMutation, useGetAllQuery } from '../features/cart/cart_api';
import { cartArray } from '../features/cart/cart_slice';


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
    } else if (data.isLoading || data.isUninitialized) {
        return <Spinner />
    } else {

        return (
            <React.Suspense fallback={<Spinner />}>
                <Order_Items data={data.data} />
            </React.Suspense>
        )
    }
}
