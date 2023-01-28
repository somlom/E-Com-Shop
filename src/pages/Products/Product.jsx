import React, { Suspense, useState, lazy } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useTranslation } from 'react-i18next';

import "./Products.css"
import { set_to_cart } from '../../features/cart/cart_slice';
import { useGetData } from '../../hooks/Data';
import { Switch } from '../../components/other/Switch/Switch';
import { Spinner } from '../../components/other/Spinner/Spinner';

const Reviews = lazy(() => import('../../components/Reviews/Reviews'));
const Details = lazy(() => import('../../components/Details'));

export const Product = () => {

    const [t] = useTranslation();

    const { id } = useParams();
    const { isLoading, isSuccess, isError, data } = useGetData("/products/" + id)

    const [showPhoto, setPhoto] = useState(false)

    const dispatch = useDispatch();

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
                                <h3>{data.price}</h3>
                                <Link to="/order" className='primary_button' onClick={() => { dispatch(set_to_cart({ id: data._id })) }}>Buy now</Link>
                                <a className='primary_button' onClick={() => { dispatch(set_to_cart({ id: data._id })) }}>{t("add")}</a>
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
