import React from 'react'

import { Spinner } from '../../components/other/Spinner/Spinner'
import { useGetData } from "../../hooks/Data"

export const MyOrders = () => {

    const { isLoading, isSuccess, isError, data } = useGetData("/payment/get_orders", { Authorization: `Bearer ${localStorage.getItem("user")}` });

    if (isError) {

        return <h1>Sorry, try later </h1>

    } else if (isLoading) {

        return <Spinner />

    } else if (isSuccess) {

        return (
            <>
                {data.map((obj) => {
                    return (
                        <div key={obj._id}>
                            <div className='column'>
                                <div className='column'>
                                    <div className='row'>
                                        <p>{obj.updatedAt}</p>
                                        <p>{obj._id}</p>
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
