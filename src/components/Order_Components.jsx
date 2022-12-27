import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import "../css/Order.scss"
import { Form } from './Form'
import { Spinner } from './Spinner'
import { cartArray, set_to_cart, remove_from_cart } from '../features/cart/cart_slice'
import { useCreateOrderMutation, useGetOrderQuery } from '../features/cart/payment_api';


export const Order_Items = ({ data }) => {

    const dispatch = useDispatch();

    if (data.isSuccess || data.length > 0) {
        return (
            <React.Suspense fallback={<Spinner />}>
                <h1>Order</h1>
                <div className='order_items row'>
                    <div className='order_column column'>
                        <Data data={data} dispatch={dispatch} />
                    </div>
                    <div className='order_count'>
                        <OrderCount data={data} />
                    </div>
                </div>
            </React.Suspense>
        )
    }

    if (data.isLoading) {
        return <Spinner />
    }

}

const OrderCount = ({ data }) => {

    // const data = props.data
    const cart = useSelector(cartArray);
    const [create_order] = useCreateOrderMutation();

    let i = 0
    data.map((obj) => {
        i += obj.price * obj.quantity
    })


    return (
        <div className='column'>
            <div className='order_list row'>
                <span>Articles</span>
                <span>{i}</span>
            </div>
            <div className='order_list row'>
                <span>Lieferung</span>
                <span>7</span>
            </div>
            <div className='order_footer column'>
                <div className='order_list row'>
                    <span>Total</span>
                    <span>{i + 7}</span>
                </div>
                <div className='order_list row'>
                    <Link to="/address" className='opacity' onClick={() => create_order(cart)}>Pay</Link>
                </div>
            </div>
        </div>
    )
}

export const Data = ({ data, dispatch }) => {

    return data.map((obj) =>
        <div className="order_item row" key={obj._id}>
            <img className='order_image' src={`http://${process.env.PUBLIC_URL}/img/${obj.photos[0]}`}></img>
            <h3 id="title">{obj.name}</h3>
            <div className='row'>
                <select value={obj.quantity} onChange={(e) => dispatch(set_to_cart({ _id: obj._id, quantity: e.target.value }))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>
                <h3 className='close_menu'>{obj.price * obj.quantity}</h3>
                <div className='row'>
                    <button onClick={() => dispatch(remove_from_cart({ _id: obj._id }))}>Remove </button>
                </div>
            </div>
            <div className='row open_menu'>
                <h3>{obj.price * obj.quantity}</h3>
            </div>
        </div>
    )
}

export const Payment = () => {
    return (
        <div>Payment</div>
    )
}

const Step = ({ number, children }) => {
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

export const Address = () => {

    const { t, i18n } = useTranslation();
    const [input, setInput] = React.useState({});

    const value = useGetOrderQuery();

    const add_to_state = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = async (event) => {
        event.preventDefault()

        if (Object.keys(input).length >= 1) {

            await axios.put(`http://${process.env.PUBLIC_URL}/payment/update_order`, { address: input }, { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } }).then(

                function (fulfilled) {

                    return <Navigate to="/account" replace={true} />
                },
                function (error) {
                    return alert(error.response.data.message)
                }
            )
        } else {
            return alert("Error!!! Empty fields")
        }
    }

    if (value.isSuccess) {
        
        let i = 0
        value.data.products.map((obj) => {
            i += obj.product.price * obj.quantity
        })

        return (
            <Step number={2}>
                <div className='address row'>
                    <div className='column'>
                        <h1>Address</h1>
                        <Form onChange={add_to_state} onSubmit={send_to_backend}>
                            <input type="text" placeholder="Country" id='country' onChange={add_to_state} />
                            <div className='row'>
                                <input type="text" placeholder="Name" id='name' onChange={add_to_state} />
                                <input type="text" placeholder="Surname" id='surname' onChange={add_to_state} />
                            </div>
                            <div className='row'>
                                <input type="number" placeholder="ZIP-Code" id='zip' onChange={add_to_state} />
                                <input type="text" placeholder="City" id='city' onChange={add_to_state} />
                                <input type="text" placeholder="Street & housenumber" id='house' onChange={add_to_state} />
                            </div>

                            <div className='form_buttons row'>
                                <button className="cart_button opacity" type='submit'>
                                    <span>Pay</span>
                                </button>
                            </div>
                        </Form>
                    </div>
                    <div className='column'>
                        {value.data.products.map((obj) =>
                            <div className="order_item row" key={obj._id}>
                                <img className='order_image' src={`http://${process.env.PUBLIC_URL}/img/${obj.product.photos[0]}`}></img>
                                <div className='row'>
                                    <h3 id="title">{obj.product.name}</h3>
                                    <h3>{obj.product.price * obj.quantity}</h3>
                                </div>
                            </div>
                        )}
                        <div className='order_count'>
                            {/* <OrderCount data={data} /> */}
                            <div className='column'>
                                <div className='order_list row'>
                                    <span>Articles</span>
                                    <span>{i}</span>
                                </div>
                                <div className='order_list row'>
                                    <span>Lieferung</span>
                                    <span>7</span>
                                </div>
                                <div className='order_footer column'>
                                    <div className='order_list row'>
                                        <span>Total</span>
                                        <span>{i + 7}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Step>
        )
    }
}

export const Delivery = () => {
    return (
        <Step number={3}>
            <div className='column'>
                Delivery
            </div>
        </Step>
    )
}

