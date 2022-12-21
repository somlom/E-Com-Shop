import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useCreateOrderMutation } from '../features/cart/payment_api'
import { useSelector } from 'react-redux';
import {
    add_to_cart, remove_from_cart, remove_one_from_cart, selectCount,
} from '../features/cart/cart_slice';

export const Account = () => {

    const cart = useSelector(selectCount);

    const [sendIt, send] = useCreateOrderMutation();

    React.useLayoutEffect(() => {
        const send_to_backend = async (cart) => {
            await sendIt(cart)
        }
        send_to_backend(cart.cart)

    }, [cart])

    return (
        <div className='column'>
            <h1>My account</h1>
            <div className='dropdown column'>
                <Link to="/account/orders">My orders</Link>
                <Link to="/account/payments">Payments</Link>
                <Link to="/account/wishlist">Wishlist</Link>
                <Link to="/account/personal_data">Personal data</Link>
            </div>
            <Outlet />
        </div>
    )
}