import React from 'react'
import { useTranslation } from 'react-i18next';

import { Column, Row } from '../Other/Structure/Flex-Box/Flex-Box'
import "./Reviews.css"


const Reviews = ({ data }) => {

    const [t] = useTranslation();

    const isEmpty = data.length === 0 ? true : false

    if (isEmpty) {
        return <h1>{t("leave_first_review")}</h1>
    } else {

        return (
            <Row className='reviews'>
                <Column>
                    <h2>dfsdfsdfdsfds</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae incidunt consequuntur ab tempora eaque. Culpa tempora hic rem quasi doloribus eveniet odio quos earum, totam placeat nulla assumenda molestias cupiditate?</p>
                </Column>
            </Row>
        )
    }
}

export default Reviews