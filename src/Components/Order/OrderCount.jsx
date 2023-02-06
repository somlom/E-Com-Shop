import React from "react"
import { useTranslation } from 'react-i18next';
import { Column, Row } from "../Other/Structure/Flex-Box/Flex-Box";

import "./Order.css"
import "./OrderCount.css"


const OrderCount = ({ data, children }) => {

    const [t] = useTranslation();

    let i = 0
    data.map((obj) => {
        i += (obj.price || obj.product.price) * obj.quantity
    })

    return (
        <Column>
            <Row className='order_list'>
                <span>{t("article")}</span>
                <span>{i} &euro;</span>
            </Row>
            <Row className='order_list'>
                <span>{t("delivery")}</span>
                <span>0 &euro;</span>
            </Row>
            <Column className='order_footer'>
                <Row className='order_list'>
                    <span>{t("total")}</span>
                    <span>{i}  &euro;</span>
                </Row>
                <Row className='order_list'>
                    {children}
                </Row>
            </Column>
        </Column>
    )

}

export default OrderCount