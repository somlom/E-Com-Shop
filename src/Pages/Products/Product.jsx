import React, { Suspense, useState, lazy } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useTranslation } from 'react-i18next';

import "./Products.css"
import { set_to_cart } from '../../features/cart_slice';
import { useGetData } from '../../hooks/Data';
import { Switch } from '../../Components/Other/Buttons/Switch/Switch';
import { Spinner } from '../../Components/Other/Spinner/Spinner';
import { Column, Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box';

const Reviews = lazy(() => import('../../Components/Reviews/Reviews'));
const Details = lazy(() => import('../../Components/Details/Details'));

export const Product = () => {

    const [t] = useTranslation();

    const { id } = useParams();
    const { isLoading, isError, data, isSuccess } = useGetData("/products/" + id)

    const [showPhoto, setPhoto] = useState(false)

    const dispatch = useDispatch();

    if (isLoading) {
        return <Spinner />
    } else if (isError) {
        return <h1>{t("error")}</h1>
    } else if (data.length === 0) {
        return <h1>{t("empty_page")}</h1>
    } else if (isSuccess) {
        return (
            <div>
                <Column>
                    <Row className='product_title'>
                        <Link to="/"><AiOutlineArrowLeft size={35} /></Link>
                        <h1>{data.name}</h1>
                    </Row>
                    <div className='product_on_page' >

                        <div className="photos">
                            {data.photos.length > 1 ? (
                                <Column className="gallery">
                                    {data.photos.map(photo => <img src={process.env.API_URL + "/img/" + photo} className={(photo === showPhoto) ? "active" : ""} key={photo} onClick={() => { setPhoto(photo) }} />)}
                                </Column>
                            ) : ""}
                            <img src={showPhoto ? process.env.API_URL + "/img/" + showPhoto : process.env.API_URL + "/img/" + data.photos[0]}></img>
                        </div>

                        <Column className='buy'>
                            <p>{data.text}</p>
                            <div className='buy_row'>
                                <h3>{data.price} &euro;</h3>
                                <Link to={"/pay_as_guest/" + id} className='primary_button'>Buy now</Link>
                                <a className='primary_button' onClick={() => dispatch(set_to_cart({ id: data._id }))}>{t("add")}</a>
                            </div>
                        </Column>
                    </div>
                </Column>
                <Column>
                    <Switch first={t("reviews")} second={t("details")}>

                        <Suspense fallback={<Spinner />}>
                            <Reviews data={data} />
                        </Suspense>

                        <Suspense fallback={<Spinner />}>
                            <Details data={data.text} />
                        </Suspense>

                    </Switch>
                </Column>
            </div>
        )
    }

}
