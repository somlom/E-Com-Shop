import { useTranslation } from 'react-i18next';
import { format } from 'date-fns'

import "./Reviews.css"
import { Card } from '../../Layout/Card/Card';
import { Column, Row } from '../../Other/Structure/Flex-Box/Flex-Box'
import { Rating } from '../Rating/Rating';
import { useGetData } from '../../../hooks/Data';
import { Spinner } from '../../Other/Spinner/Spinner';


const Reviews = ({ id }) => {

    const { isSuccess, data } = useGetData("/reviews/" + id)
    const [t] = useTranslation()

    if (isSuccess && data.length > 0) {

        return (
            data.map(obj => (
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
            ))
        )
    } else if (isSuccess && data.length === 0) {
        return (
            <Card>
                <h2>{t("no_reviews")}</h2>
            </Card>
        )
    } else {
        return <Spinner />
    }

}

export default Reviews