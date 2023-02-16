import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import axios from 'axios'

import "./Order.css"
import { Column, Row } from "../../Components/Other/Structure/Flex-Box/Flex-Box"
import { useGetData } from "../../hooks/Data"
import { usePostCartMutation } from '../../features/cart_api'
import { cartArray } from '../../features/cart_slice'
import { Spinner } from '../../Components/Other/Spinner/Spinner'
import OrderCount from '../../Components/Order/OrderCount'
import { Pay } from '../../Components/Other/Buttons/Pay/Pay'
import { toast } from 'react-hot-toast'
import { Card } from '../../Components/Layout/Card/Card'
import OrderData from '../../Components/Order/OrderData'


export const Order_Status = () => {

  const params = new URLSearchParams(window.location.search)
  const order = params.get("order")
  const success = params.get("success")

  if (success === "true") {
    useGetData(`/payment/close_order/${order}`, { authorization: "Bearer " + localStorage.getItem("user") })

    return <Order_Success token={order} />
  } else {
    return <Order_Failed />
  }
}

const Order_Success = () => {

  const [t] = useTranslation()

  return (
    <Column className={"order_status"}>
      <Row className={"order_status_header"}>
        <span>success</span>
        <span>{t("thanks_for_order")}</span>
      </Row>
      <Row className={"order_status_body"}>
        <Column>
          <span>item</span>
          <span>item</span>
          <span>item</span>
          <span>item</span>
          <span>item</span>
        </Column>
        <Column>
          Coupon
        </Column>
      </Row>
    </Column>
  )
}

const Order_Failed = () => {

  const [t] = useTranslation()
  const cart = useSelector(cartArray);
  const [get_cart, cart_data] = usePostCartMutation();

  useEffect(() => {
    // return () => {
      get_cart(cart)
    // }
  }, [cart])

  const pay_order = async () => {
    const resp = await axios.get(`${process.env.API_URL}/payment/pay`, { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } })
    if (resp.data.status === true) {
      return window.location.replace(resp.data.data);
    } else {
      return toast.error(t("smth_went_wrong"))
    }
  }

  return (
    <Column className={"order_status"}>
      <Row className={"order_status_header"}>
        <span>Failed</span>
        <span>{t("failed_order")}</span>
      </Row>
      <Column className={"order_status_body"}>
        {cart_data.isSuccess ? (
          <Suspense fallback={<Spinner />}>
            <Card>
              <OrderData data={cart_data.data} />
            </Card>
            <Card>
              <OrderCount data={cart_data.data}>
                <Pay onClick={pay_order}>{t("try_to_pay_again")}</Pay>
              </OrderCount>
            </Card>
          </Suspense>
        ) : <Spinner />}
      </Column>
    </Column>
  )
}