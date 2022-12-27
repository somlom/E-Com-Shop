import React from 'react'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Navigate } from 'react-router-dom'

import "../css/Order.scss"
import { Form } from '../components/Form'
import { useGetOrderQuery } from '../features/cart/payment_api';
import { Step } from '../components/order/Step';


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
