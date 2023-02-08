import React from 'react'
import { Card } from '../../Layout/Card/Card'
import { Column } from '../../Other/Structure/Flex-Box/Flex-Box'
import { Stars } from '../Stars/Stars'

export const Product_Reviews = ({ title, rating, img }) => {
    return (
        <Card>
            <img src={img} />
            <Stars length={rating} />
            <h2>{title}</h2>
        </Card>
    )
}
