import React from 'react'
import { useTranslation } from 'react-i18next'

import "./Product_Reviews.css"
import { Card } from '../../Layout/Card/Card'
import { Pay } from '../../Other/Buttons/Pay/Pay'
import { Rating } from '../Rating/Rating'


export const Product_Reviews = ({ title, rating, img, id }) => {

    const [t] = useTranslation();

    return (
        <Card classs={"product_reviews"}>
            <img src={img} />
            <Rating length={rating} />
            <h2>{title}</h2>
            <Pay to={"/products/add_review/" + id}>{t("click_to_leave_your_review")}</Pay>
        </Card>
    )
}