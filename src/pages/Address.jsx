import React from 'react'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link } from 'react-router-dom'

import "../css/Order.scss"
import { Form } from '../components/Form'
import { useGetLastUsersOpenOrderQuery } from '../features/cart/payment_api';
import { Step } from '../components/order/Step';
import { Spinner } from '../components/Spinner';
import { OrderCount } from '../components/order/OrderCount';


export const Address = () => {

    const [t] = useTranslation();
    const [input, setInput] = React.useState({});
    const [value, setValue] = React.useState(null);

    const { refetch } = useGetLastUsersOpenOrderQuery()

    React.useEffect(() => {
        refetch().then((y) => {
            setValue(y)
        })
    }, [])

    const add_to_state = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = async (event) => {
        event.preventDefault()

        if (Object.keys(input).length >= 1) {

            await axios.put(`http://${process.env.PUBLIC_URL}/payment/update_order`, { address: input }, { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } })
            return alert("response")

        } else {
            return alert("Error!!! Empty fields")
        }
    }

    if (value === null || value.isFetching || value.isUninitialized) {
        return <Spinner />
    } else if (value.isSuccess && value.data !== null) {

        return (
            <React.Suspense fallback={<Spinner />}>
                <Step number={2}>
                    <div className='column'>
                        <div className='address row'>
                            <div className='column'>
                                <h1>{t("address")}</h1>
                                <Form onChange={add_to_state} onSubmit={send_to_backend} >
                                    <input type="text" placeholder={t("country")} id='country' onChange={add_to_state} />
                                    <div className='row'>
                                        <input type="text" placeholder={t("name")} id='name' onChange={add_to_state} />
                                        <input type="text" placeholder={t("surname")} id='surname' onChange={add_to_state} />
                                    </div>
                                    <div className='row'>
                                        <input type="number" placeholder={t("zip-code")} id='zip' onChange={add_to_state} />
                                        <input type="text" placeholder={t("city")} id='city' onChange={add_to_state} />
                                    </div>
                                    <input type="text" placeholder={t("house")} id='house' onChange={add_to_state} />
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
                                    <OrderCount data={value.data.products}>
                                        <Link to="/order/address" className='opacity' onClick={send_to_backend}>{t("next_point")}</Link>
                                    </OrderCount>
                                </div>
                            </div>
                        </div>
                        <div className='order_count'>
                            <OrderCount data={value.data.products}>
                                <Link to="/order/address" className='opacity' onClick={send_to_backend}>{t("next_point")}</Link>
                            </OrderCount>
                        </div>
                    </div>
                </Step>
            </React.Suspense>
        )
    } else {
        return <h1>{t("loading_error")}</h1>
    }
}
