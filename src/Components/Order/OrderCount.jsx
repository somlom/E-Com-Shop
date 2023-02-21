import { useTranslation } from 'react-i18next';

import "./Order.css"
import "./OrderCount.css"
import { Column, Row } from "../Other/Structure/Flex-Box/Flex-Box";


const OrderCount = ({ data, children }) => {

    const [t] = useTranslation();
    
    const count_price = () => {
        let i = 0
        // deepcode ignore PureMethodReturnValueIgnored: <please specify a reason of ignoring this>
        data.map((obj) => i += (obj.price || obj.product.price) * obj.quantity)
        return Math.round(i * 100) / 100
    }

    return (
        <Column>
            <Row className='order_list'>
                <span>{t("article")}</span>
                <span>{count_price} &euro;</span>
            </Row>
            <Row className='order_list'>
                <span>{t("delivery")}</span>
                <span>0 &euro;</span>
            </Row>
            <Column className='order_footer'>
                <Row className='order_list'>
                    <span>{t("total")}</span>
                    <span>{count_price}  &euro;</span>
                </Row>
                <Row className='order_list'>
                    {children}
                </Row>
            </Column>
        </Column>
    )

}

export default OrderCount