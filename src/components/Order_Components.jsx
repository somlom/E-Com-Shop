import React from 'react'
import { useTranslation } from 'react-i18next';

import { Spinner } from './Spinner'
import "../css/Order.scss"
import { set_to_cart } from '../features/cart/cart_slice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from './Form'


export const Order_Items = ({ data }) => {

    const dispatch = useDispatch();

    // const [count]

    // const handleChange = () => {

    // }

    if (data.isSuccess) {
        return (
            <React.Suspense fallback={<Spinner />}>
                <h1>Order</h1>
                <div className='order_items row'>
                    <div className='order_column column'>
                        <Data data={data.data} dispatch={dispatch} />
                    </div>
                    <div className='order_count column'>
                        <OrderCount data={data.data} />
                    </div>
                </div>import {useTranslation} from 'react-i18next';
            </React.Suspense>
        )
    }

    if (data.isLoading) {
        return <Spinner />
    }

}

const OrderCount = ({ data }) => {

    // const data = props.data

    let i = 0
    data.map((obj) => {
        console.log(obj)
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
                    <Link to="/address" className='opacity'>Pay</Link>
                </div>
            </div>
        </div>
    )
}

const Data = ({ data, dispatch }) => {

    return data.map((obj) =>
        <div className="order_item row" key={obj._id}>
            <img className='order_image' src={`http://${process.env.PUBLIC_URL}/img/${obj.photos[0]}`}></img>
            <h3>{obj.name}</h3>
            {/* <input type="ratio" value={obj.quantity} /> */}
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
            <h3>{obj.price * obj.quantity}</h3>
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
            <div className='row'>
                <div className='column'>
                    <p>{number === 1 ? "X" : "1"}</p>
                    <p>Order</p>
                </div>
                <div className='column'>
                    <p>{number === 2 ? "X" : "2"}</p>
                    <p>Info</p>
                </div>
                <div className='column'>
                    <p>{number === 3 ? "X" : "3"}</p>
                    <p>Delivery</p>
                </div>
                <div className='column'>
                    <p>{number === 4 ? "X" : "4"}</p>
                    <p>Payment</p>
                </div>
            </div>
            {children}
        </div>
    )
}

export const Address = () => {

    const { t, i18n } = useTranslation();
    const [input, setInput] = React.useState({});

    const add_to_state = (event) => {
        console.log(input)
        setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = async (event) => {
        event.preventDefault()
        console.log(input)

        if (Object.keys(input).length >= 1) {

            await axios.post(`http://${process.env.PUBLIC_URL}/auth/login`, input).then(

                function (fulfilled) {

                    localStorage.setItem("user", fulfilled.data.token)
                    alert(fulfilled.data)
                    console.log(next)

                    // return next === undefined || next?.length === 0 ? navigate("/") : navigate(next, { replace: true })
                    return navigate("#", { replace: true })
                },
                function (error) {
                    return alert(error.response.data.message)
                }
            )
        } else {
            return alert("Error!!! Empty fields")
        }
    }

    return (
        <Step number={2}>
            <div className='address column'>
                <div className='row'>
                    data
                </div>
                <h1>Address</h1>
                <Form onChange={add_to_state} onSubmit={send_to_backend}>
                    <input type="text" placeholder="Country" id='country' onChange={add_to_state} />
                    <input type="text" placeholder="Name" id='name' onChange={add_to_state} />
                    <input type="text" placeholder="Surname" id='surname' onChange={add_to_state} />
                    <input type="number" placeholder="ZIP-Code" id='zip' onChange={add_to_state} />
                    <select placeholder="ZIP-Code" id='zip' onChange={add_to_state}>
                        <option value="germany">Germany</option>
                    </select>
                    <input type="text" placeholder="Street" id='street' onChange={add_to_state} />
                    <input type="number" placeholder="Housenumber" id='housenumber' onChange={add_to_state} />
                    
                    <div className='form_buttons row'>
                        <button className="cart_button opacity" type='submit'>
                            <span>Pay</span>
                        </button>
                        <button className="no_acc_button " type='button'>
                            <span>{t("dont_have_an_account")}</span>
                        </button>
                    </div>
                </Form>
            </div>
        </Step>
    )
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

