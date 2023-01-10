import React from "react"
import { useTranslation } from 'react-i18next';

import "../../css/Order.scss"


export const OrderCount = ({ data, children }) => {

    const [t] = useTranslation();

    let i = 0
    data.map((obj) => {
        i += (obj.price || obj.product.price) * obj.quantity
    })

    return (
        <div className='column'>
            <div className='order_list row'>
                <span>{t("article")}</span>
                <span>{i}</span>
            </div>
            <div className='order_list row'>
                <span>{t("delivery")}</span>
                <span>7</span>
            </div>
            <div className='order_footer column'>
                <div className='order_list row'>
                    <span>{t("total")}</span>
                    <span>{i + 7}</span>
                </div>
                <div className='order_list row'>
                    {children}
                </div>
            </div>
        </div>
    )

}