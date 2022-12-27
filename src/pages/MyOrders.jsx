import React from 'react'

import { Spinner } from '../components/Spinner'
import { useGetOrderQuery } from '../features/cart/payment_api'


export const MyOrders = () => {

    const value = useGetOrderQuery();

    if (value.isError) {
        return <h1>Sorry, try later </h1>
    }

    if (value.isLoading) {
        return <Spinner />
    } else {
        return (
            <>
                {value.data.map((obj) => {
                    return (
                        <div key={obj._id}>
                            <div className='column'>
                                <div className='column'>
                                    <div className='row'>
                                        <p>{obj.updatedAt}</p>
                                        <p>{obj._id}</p>
                                        {/* <p>{obj.updatedAt}</p> */}
                                    </div>
                                </div>
                                <div className='column'>
                                    <div className='row'>
                                        <p>{obj.tags.payed === false ? "unpaid" : "paid"}</p>
                                        <p>{obj.tags.pending === false ? "unpeding" : "pending"}</p>
                                        <p>{obj.tags.rejected === false ? "unrejected" : "rejected"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }
}
