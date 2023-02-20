import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { MdDone, MdClose } from "react-icons/md"

import "./Order.css"
import { Column, Row } from "../../Components/Other/Structure/Flex-Box/Flex-Box"
import { useGetData, usePostData } from "../../hooks/Data"
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
    const res = useGetData(`/payment/close_order/${order}`, { authorization: "Bearer " + localStorage.getItem("user") })

    if (res.isLoading) {
      return <Spinner />
    } else if (res.isError) {
      <h1>Sorry, error</h1>
    } else if (res.isSuccess && res.data) {
      return <Order_Success data={res.data.products} />
    }
  } else {
    return <Order_Failed />
  }
}

const Order_Success = ({ data }) => {

  const [t] = useTranslation()
  const [get_cart, cart_data] = usePostCartMutation();
  useEffect(() => {
    get_cart(data)
  }, [data])
  if (cart_data.isSuccess) {
    return (
      <Column className={"order_status"}>
        <Row className={"order_status_header"}>
          <div className='order_img'><MdDone size={200} /></div>
          <span>{t("thanks_for_order")}</span>
        </Row>
        <Column className={"order_status_body"}>
          <Suspense fallback={<Spinner />}>
            <Card>
              <OrderData data={cart_data?.data} counter={false} remove_btn={false} />
            </Card>
            <Card>
              <OrderCount data={cart_data?.data} />
            </Card>
          </Suspense>
        </Column>
      </Column>
    )
  } else {
    return <Spinner />
  }
}

const Order_Failed = () => {

  const [t] = useTranslation()
  const cart = useSelector(cartArray);
  const [get_cart, cart_data] = usePostCartMutation();

  useEffect(() => {
    get_cart(cart)
  }, [cart])


  const pay_order = () => {
    axios.get(`${process.env.API_URL}/payment/pay`, { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } }).then(
      (resp) => window.location.replace(resp.data.data),

      () => toast.error(t("smth_went_wrong"))
    )
  }

  return (
    <Column className={"order_status"}>
      <Row className={"order_status_header"}>
        <div className='order_img'><MdClose size={200} /></div>
        <span>{t("failed_order")}</span>
      </Row>
      <Column className={"order_status_body"}>
        {cart_data.isSuccess ? (
          <Suspense fallback={<Spinner />}>
            <Card>
              <OrderData data={cart_data.data} counter={false} remove_btn={false} />
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