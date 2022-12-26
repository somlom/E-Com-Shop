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
                {/* <Data data={value.data.products} />  */}
                <div key={value.data._id}>
                    {/* <p>Name: {value.data.address.name}</p>
                    <p>Surname: {value.data.address.surname}</p>
                    <p>Country: {value.data.address.country}</p>
                    <p>City: {value.data.address.city}</p>
                    <p>ZIP: {value.data.address.zip}</p>
                    <p>Street & House: {value.data.address.house}</p> */}
                    <Pr order={value.data.products} />
                    <div className='column'>
                        <p>{value.data.tags.payed === false ? "unpaid": "paid"}</p>
                        <p>{value.data.tags.pending === false ? "unpeding": "pending"}</p>
                        <p>{value.data.tags.rejected === false ? "unrejected": "rejected"}</p>
                    </div>
                </div>
            </>
        )
    }
}
const Pr = ({ order }) => {

    return order.map(obj => {
        return (
            <div className="order_item row" key={obj._id}>
                <img className='order_image' src={`http://${process.env.PUBLIC_URL}/img/${obj.product.photos[0]}`}></img>
                <h3 id="title">{obj.product.name}</h3>
                <div className='row'>
                    <select value="1">
                        <option value="1">{obj.quantity}</option>
                    </select>
                    <h3 className='close_menu'>{obj.product.price * obj.quantity}</h3>
                </div>
                <div className='row open_menu'>
                    <h3>{obj.product.price * obj.quantity}</h3>
                </div>
            </div>
        )
    })

}
