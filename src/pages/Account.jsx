import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { redirect } from "react-router-dom";
import { UseAuth } from './App'




export const Account = () => {


    return (
        <div className='column'>
            <h1>My account</h1>
            <div className='dropdown column'>
                <Link to="/account/orders">My orders</Link>
                <Link to="/account/payments">Payments</Link>
                <Link to="/account/wishlist">Wishlist</Link>
                <Link to="/account/personal_data">Personal data</Link>
            </div>
        </div>
    )
}