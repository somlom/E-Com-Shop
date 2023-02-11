import React from 'react'

import { useGetData } from "../../hooks/Data"


export const Order_Status = () => {

  const params = new URLSearchParams(window.location.search)
  const order = params.get("order")
  const success = params.get("success")

  if (success === "true") {
    const value = useGetData(`/payment/close_order/${order}`, { authorization: "Bearer " + localStorage.getItem("user") })

    console.log(value.data)
    return <Order_Success token={order} />
  } else {
    return <Order_Failed />
  }
}

const Order_Success = ({ token }) => {
  return (
    <div>
      success
      token {token}
    </div>
  )
}

const Order_Failed = () => {
  return (
    <div>
      failed
    </div>
  )
}