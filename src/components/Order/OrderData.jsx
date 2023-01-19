import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import "./Order.css"
import { set_to_cart, remove_from_cart } from "../../features/cart/cart_slice"


export const OrderData = ({ data }) => {

    const [t] = useTranslation();
    const dispatch = useDispatch();

    return data.map((obj) =>
        <div className="order_item row" key={obj._id}>
            <img className='order_image' src={`${process.env.API_URL}/img/${obj.photos[0]}`}></img>
            <h3 id="title">{obj.name}</h3>
            <div className='row'>
                <select value={obj.quantity} onChange={(e) => dispatch(set_to_cart({ id: obj._id, quantity: e.target.value }))}>
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
                    <button onClick={() => dispatch(remove_from_cart({ id: obj._id }))}>{t("remove")}</button>
                </div>
            </div>
            <div className='row open_menu'>
                <h3>{obj.price * obj.quantity}</h3>
            </div>
        </div>
    )
}