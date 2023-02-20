import { lazy, useEffect, Suspense } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import "../../Components/Order/Order.css"
import { Spinner } from '../../Components/Other/Spinner/Spinner'
import { usePostCartMutation } from '../../features/cart_api';
import { cartArray } from '../../features/cart_slice';
import { Column, Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box';
import { Pay } from '../../Components/Other/Buttons/Pay/Pay';


const OrderCount = lazy(() => import("../../Components/Order/OrderCount"))
const OrderData = lazy(() => import("../../Components/Order/OrderData"))

export const Order = () => {

    const [t] = useTranslation();
    const cart = useSelector(cartArray);
    const [get_cart, cart_data] = usePostCartMutation();

    const create_order = async (order) => {
        await axios.post(process.env.API_URL + "/payment/set_order", { cart: order }, { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } })
    }

    const pay_order = () => {
        axios.get(`${process.env.API_URL}/payment/pay`, { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } }).then(
            (resp) => window.location.replace(resp.data.data),

            () => toast.error(t("smth_went_wrong"))
        )
    }

    useEffect(() => {

        get_cart(cart)
        create_order(cart)

    }, [cart])


    if (cart_data.isError === true) {

        return <h1>{t("error")}</h1>

    } else if ((cart_data.isLoading) || cart_data.isUninitialized) {

        return <Spinner />

    }
    else if (cart_data.data.length === 0) {
        return <h1>{t("no_items")}</h1>
    }
    else {

        return (
            <Suspense fallback={<Spinner />}>
                <h1>{t("order")}</h1>
                <Row className='order_items'>
                    <Column className='order_column'>
                        <OrderData data={cart_data.data} />
                    </Column>
                    <div className='order_count'>
                        <OrderCount data={cart_data.data}>
                            <Pay onClick={pay_order}>{t("pay")}</Pay>
                        </OrderCount>
                    </div>
                </Row>
            </Suspense>
        )
    }
}
