import { lazy, Suspense } from "react"
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns'

import "./Reviews.css"
import { Card } from '../../Layout/Card/Card';
import { Column, Row } from '../../Other/Structure/Flex-Box/Flex-Box'
import { useGetData } from '../../../hooks/Data';
import { Spinner } from '../../Other/Spinner/Spinner';

const Rating = lazy(() => import("../Rating/Rating"))


const Product_Reviews = lazy(() => import("../Product_Reviews/Product_Reviews"))

const Reviews = ({ id, product_data }) => {

    const { isSuccess, data } = useGetData("/reviews/" + id)
    const [t] = useTranslation()

    if (isSuccess && data.length > 0) {

        let i = 0
        const count = data.map(star => i += parseInt(star.rating))

        return (
            <Suspense fallback={<Spinner />}>
                <Row className="reviews">
                    <Product_Reviews rating={i / count.length} title={product_data.name} text={product_data.text} id={id} img={process.env.API_URL + "/img/" + product_data.photos[0]} />
                    <Column>
                        {data.map(obj => (
                            <Card key={obj._id}>
                                <Row className="review_head">
                                    <Column>
                                        <Rating length={obj.rating} />
                                        <h2>{obj.title}</h2>
                                    </Column>
                                    <span>{format(new Date(obj.createdAt), "dd/MM/yyyy hh:mm")}</span>
                                </Row>
                                <Column className={"review_body"}>
                                    <Row className={"review_photos"}>
                                        {obj.photos.map(photo => <img key="photo" src={process.env.API_URL + "/img/" + photo} />)}
                                    </Row>
                                    <p>{obj.text}</p>
                                </Column>
                            </Card>
                        ))}
                    </Column>
                </Row>

            </Suspense>
        )
    } else if (isSuccess && data.length === 0) {
        return (
            <Suspense fallback={<Spinner />}>
                <Row className="reviews">
                    <Product_Reviews rating={0} title={product_data.name} text={product_data.text} id={id} img={process.env.API_URL + "/img/" + product_data.photos[0]} />
                    <Column>
                        <Card>
                            <h2>{t("no_reviews")}</h2>
                        </Card>
                    </Column>
                </Row>
            </Suspense>
        )
    } else {
        return <Spinner />
    }

}

export default Reviews