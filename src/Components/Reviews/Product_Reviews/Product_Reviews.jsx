import React from 'react'
import { useTranslation } from 'react-i18next'

import { Card } from '../../Layout/Card/Card'
import { Pay } from '../../Other/Buttons/Pay/Pay'
import { Stars } from '../Stars/Stars'


export const Product_Reviews = ({ title, rating, img }) => {

    const [t] = useTranslation();

    return (
        <Card>
            <img src={img} />
            <Stars length={rating} />
            <h2>{title}</h2>
            <Pay>{t("click_to_leave_your_review!")}</Pay>
        </Card>
    )
}
