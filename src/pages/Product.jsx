import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useTranslation } from 'react-i18next';

import "../css/Products.scss"
import { useGetData } from '../hooks/Data';
import { set_to_cart } from '../features/cart/cart_slice';
import { useState } from 'react';
import { Details } from '../components/Details';
import { Switch } from '../components/Switch';


export const Product = () => {

    const [t] = useTranslation();

    const { id } = useParams();
    const { value, Spinner } = useGetData("http://" + process.env.PUBLIC_URL + "/products/" + id)

    const [showPhoto, setPhoto] = useState("")

    const dispatch = useDispatch();

    if (value.length === 0) {
        return <Spinner />
    } else {
        return (
            <div>
                <div className='column'>
                    <div className='product_title row'>
                        <Link to="/"><AiOutlineArrowLeft size={35} /></Link>
                        <h1>{value.name}</h1>
                    </div>
                    <div className='product_on_page' >

                        <div className="row">

                            <div className="carousel column">
                                {value.photos.map(photo => {
                                    return (
                                        <img src={`http://${process.env.PUBLIC_URL}/img/${photo}`} onClick={() => {

                                            setPhoto(photo)
                                            return console.log(photo)
                                        }} />
                                    )
                                })}
                            </div>

                            <img src={`http://${process.env.PUBLIC_URL}/img/${value.photos[0] || showPhoto}`}></img>
                        </div>

                        <div className='buy column'>
                            <p>{value.text}</p>
                            <div className='buy_row'>
                                <h3>{value.price}</h3>
                                <button className='add_to_cart_button' type='button'>Buy now</button>
                                <button className='add_to_cart_button' type='button' onClick={() => { dispatch(set_to_cart({ _id: value._id })) }}>{t("add")}</button>
                            </div>
                        </div>
                    </div >
                </div>
                <div className='column'>
                    <Switch first={t("reviews")} second={t("details")}>
                        <p>some data</p>
                        <Details data={value.text} />
                    </Switch>
                </div>
            </div>
        )
    }

}