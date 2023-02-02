import React, { Suspense, useState, lazy } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useTranslation } from 'react-i18next';

import "./Products.css"
import { set_to_cart } from '../../features/cart_slice';
import { useGetData } from '../../hooks/Data';
import { Switch } from '../../Components/other/Switch/Switch';
import { Spinner } from '../../Components/other/Spinner/Spinner';
import axios from 'axios';

const Reviews = lazy(() => import('../../Components/Reviews/Reviews'));
const Details = lazy(() => import('../../Components/Details'));

export const Product = () => {

    const [t] = useTranslation();

    const { id } = useParams();
    const { isLoading, isError, data, isSuccess } = useGetData("/products/" + id)

    const [showPhoto, setPhoto] = useState(false)

    const dispatch = useDispatch();

    const send_data = async () => {
        const resp = await axios.post(process.env.API_URL + "/payment/pay_as_guest", { id: id, quantity: 1 },)
        if (resp.data.status === true) {
            return window.location.replace(resp.data.data);
        } else {
            return window.location.replace("resp_data")
        }
    }

    if (isLoading) {
        return <Spinner />
    } else if (isError) {
        return <h1>Error</h1>
    } else if (data.length === 0) {
        return <h1>Sorry, here is empty</h1>
    } else if (isSuccess) {
        return (
            <div>
                <div className='column'>
                    <div className='product_title row'>
                        <Link to="/"><AiOutlineArrowLeft size={35} /></Link>
                        <h1>{data.name}</h1>
                    </div>
                    <div className='product_on_page' >

                        <div className="photos">
                            {data.photos.length > 1 ? (
                                <div className="gallery column">
                                    {data.photos.map(photo => <img src={process.env.API_URL + "/img/" + photo} className={(photo === showPhoto) ? "active" : ""} key={photo} onClick={() => { setPhoto(photo) }} />)}
                                </div>
                            ) : ""}
                            <img src={showPhoto ? process.env.API_URL + "/img/" + showPhoto : process.env.API_URL + "/img/" + data.photos[0]}></img>
                        </div>

                        <div className='buy column'>
                            <p>{data.text}</p>
                            <div className='buy_row'>
                                <h3>{data.price} &euro;</h3>
                                <button className='primary_button' onClick={send_data}>Buy now</button>
                                <a className='primary_button' onClick={() => dispatch(set_to_cart({ id: data._id }))}>{t("add")}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='column'>
                    <Switch first={t("reviews")} second={t("details")}>

                        <Suspense fallback={<Spinner />}>
                            <Reviews data={data} />
                        </Suspense>

                        <Suspense fallback={<Spinner />}>
                            <Details data={data.text} />
                        </Suspense>

                    </Switch>
                </div>
            </div>
        )
    }

}
