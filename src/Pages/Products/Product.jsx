import { Suspense, useState, lazy } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useTranslation } from 'react-i18next';

import "./Products.css"
import { set_to_cart } from '../../features/cart_slice';
import { GetTextTranslation, useGetData } from '../../hooks/Data';
import { Switch } from '../../Components/Other/Buttons/Switch/Switch';
import { Spinner } from '../../Components/Other/Spinner/Spinner';
import { Column, Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box';


const Reviews = lazy(() => import('../../Components/Reviews/Reviews/Reviews'));
const Details = lazy(() => import('../../Components/Details/Details'));

export const Product = () => {

    const [t] = useTranslation();

    const { id } = useParams();
    const { isLoading, isError, data, isSuccess } = useGetData("/products/" + id)
    // const revs = useGetData("/reviews/" + id)
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
            <>
                <Column className="">
                    <Row className='product_header'>
                        <Link to="/"><AiOutlineArrowLeft size={35} /></Link>
                        <h1>{data.name}</h1>
                    </Row>
                    <Column className="product_body">
                        <div className='product_text' >

                            <div className="product_photos">
                                {data.photos.length > 1 ? (
                                    <Column className="gallery">
                                        {data.photos.map(photo => <img src={process.env.API_URL + "/img/" + photo} className={(photo === showPhoto) ? "active" : ""} key={photo} onClick={() => { setPhoto(photo) }} />)}
                                    </Column>
                                ) : ""}
                                <img src={showPhoto ? process.env.API_URL + "/img/" + showPhoto : process.env.API_URL + "/img/" + data.photos[0]}></img>
                            </div>

                            <Column className='buy'>
                                <p>{data.text}</p>
                            </Column>
                        </div>
                        {data.product_text.map((obj) => {
                            return (
                                <Row className="product_text_element" key={obj._id}>
                                    <img src={process.env.API_URL + "/img/" + obj.pic} />

                                    <p>
                                        <GetTextTranslation src_lang='de' dest_lang='de' text={obj.text} />
                                    </p>

                                </Row>
                            )
                        })}
                    </Column>
                </Column>
                <Row>
                    <div>

                    </div>
                    <Switch first={t("reviews")} second={t("details")}>

                        <Suspense fallback={<Spinner />}>
                            <Reviews id={id} product_data={data} />
                        </Suspense>
                        <Suspense fallback={<Spinner />}>
                            <Details data={data.technical_data} />
                        </Suspense>

                    </Switch>
                </Row>
                <Row className='buy_row'>
                    <h3>{data.price} &euro;</h3>
                    <Link to={"/pay_for_item/" + id} className='primary_button'>{t("buy_now")}</Link>
                    <a className='primary_button' onClick={() => dispatch(set_to_cart({ id: data._id }))}>{t("add")}</a>
                </Row>
            </>
        )
    }

}