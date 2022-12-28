import React from 'react'
import { Link, Outlet } from 'react-router-dom'


export const Account = () => {

    return (
        <div className='column'>
            <h1>My account</h1>
            <div className='dropdown column'>
                <div className='width'>
                    <Link to="/account/orders">My orders</Link>
                </div>
                <div className='width'>
                    <Link to="/account/payments">Payments</Link>
                </div>
                <div className='width'>
                    <Link to="/account/wishlist">Wishlist</Link>
                </div>
                <div className='width'>
                    <Link to="/account/personal_data">Personal data</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}