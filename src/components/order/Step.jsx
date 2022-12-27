import React from 'react'
import { Link } from 'react-router-dom'

import "../../css/Order.scss"


export const Step = ({ number, children }) => {
    return (
        <div className='column'>
            <div className='list row'>
                <Link to="/order">
                    <div className='column'>

                        <p>{number > 1 ? "X" : "1"}</p>
                        <span>Order</span>

                    </div>
                    {number > 1 ? <p></p> : <p>-</p>}
                </Link>
                <Link to="/order">
                    <div className='column'>
                        <p>{number > 2 ? "X" : "2"}</p>
                        <span>Info</span>
                    </div>
                </Link>
                <Link to="/order">
                    <div className='column'>
                        <p>{number > 3 ? "X" : "3"}</p>
                        <span>Delivery</span>
                    </div>
                </Link>
                <Link to="/order">
                    <div className='column'>
                        <p>{number > 4 ? "X" : "4"}</p>
                        <span>Payment</span>
                    </div>
                </Link>
            </div>
            {children}
        </div>
    )
}