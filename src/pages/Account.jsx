import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'


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
            <Outlet />
        </div>
    )
}