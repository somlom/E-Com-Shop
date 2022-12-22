import React from 'react'

import { Data, Order_Items } from '../components/Order_Components'
import { Spinner } from '../components/Spinner'
import { useGetOrderQuery } from '../features/cart/payment_api'
import { useGetData } from '../hooks/Data'


export const MyOrders = () => {

    const value = useGetOrderQuery();

    if (value.isError) {
        return <h1>Sorry, try later </h1>
    }

    if (value.isLoading) {
        return <Spinner />
    } else {
        return (
            <React.Suspense fallback={<Spinner />}>
                {/* <Order_Items data={value.data} /> */}
                <Data data={value.data} />
                {/* <Address data={data} /> */}
            </React.Suspense>
        )
    }

    // return (
    //     <Order_Items />
    // )
}
