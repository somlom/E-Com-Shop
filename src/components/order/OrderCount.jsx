import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import "../../css/Order.scss"
import { cartArray } from '../../features/cart/cart_slice'
import { useCreateOrderMutation } from '../../features/cart/payment_api';
import { Spinner } from '../Spinner';


export const OrderCount = ({ data, cart }) => {

    const [create_order] = useCreateOrderMutation();

    const navigate = useNavigate()

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
                    <a className='opacity' onClick={() => create_order(cart).then((fulfilled) => navigate("/order/address", { state: { _id: fulfilled.data._id }, reloadDocument: true }))}>Pay</a>
                </div>
            </div>
        </div >
    )

}