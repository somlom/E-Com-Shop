import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import "../../css/Order.scss"
import { cartArray } from '../../features/cart/cart_slice'
import { useCreateOrderMutation } from '../../features/cart/payment_api';


export const OrderCount = ({ data }) => {

    const cart = useSelector(cartArray);
    const [create_order] = useCreateOrderMutation();

    let i = 0
    data.map((obj) => {
        i += obj.price * obj.quantity
    })


    return (
        <div className='column'>
            <div className='order_list row'>
                <span>Articles</span>
                <span>{i}</span>
            </div>
            <div className='order_list row'>
                <span>Lieferung</span>
                <span>7</span>
            </div>
            <div className='order_footer column'>
                <div className='order_list row'>
                    <span>Total</span>
                    <span>{i + 7}</span>
                </div>
                <div className='order_list row'>
                    <a href="/order/address" className='opacity' onClick={() => create_order(cart)}>Pay</a>
                </div>
            </div>
        </div>
    )
}