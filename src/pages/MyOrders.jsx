import React from 'react'

import { Spinner } from '../components/other/Spinner/Spinner'
import { useGetOrdersQuery } from '../features/payment/payment_api'


export const MyOrders = () => {

    const value = useGetOrdersQuery();

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
                                        <p>{obj.payed === false ? "unpaid" : "paid"}</p>
                                        <p>{obj.pending === false ? "unpeding" : "pending"}</p>
                                        <p>{obj.rejected === false ? "unrejected" : "rejected"}</p>
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
