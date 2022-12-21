import React from 'react'
import { Order_Items } from '../components/Order_Components'
import { usePostData } from '../hooks/Data'

export const MyOrders = () => {

    const { value, Spinner } = usePostData(`http://${process.env.PUBLIC_URL}/payment/get_order`, { token: localStorage.getItem("user") })

    console.log(value)

    if (value[0] === undefined) {
        return <h1>Sorry, try later </h1>
    }

    if (value.length === 0){
        return <Spinner />
    }else{
        return (
            <React.Suspense fallback={<Spinner />}>
                <Order_Items data={value} />
                {/* <Address data={data} /> */}
            </React.Suspense>
        )
    }

    // return (
    //     <Order_Items />
    // )
}
