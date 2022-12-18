import React from 'react'

import { Spinner } from './Spinner'
import "../css/Order.scss"
import { set_to_cart } from '../features/cart/cart_slice'
import { useDispatch } from 'react-redux'


export const Order_Items = ({ data }) => {

  const dispatch = useDispatch();

  // const [count]

  // const handleChange = () => {

  // }

  if (data.isSuccess) {
    return (
      <React.Suspense fallback={<Spinner />}>
        <h1>Order</h1>
        <div className='order_items row'>
          <div className='order_column column'>
            <Data data={data.data} dispatch={dispatch} />
          </div>
          <div className='order_count column'>
            <OrderCount data={data.data} />
          </div>
        </div>
      </React.Suspense>
    )
  }

  if (data.isLoading) {
    return <Spinner />
  }

}

const OrderCount = ({data}) => {

  // const data = props.data

  let i = 0
  data.map((obj) => {
    console.log(obj)
    i += obj.price * obj.quantity
  })
  return (
    <div className='column'>
      <div className='order_list row'>
        <p>Articles</p>
        <span>{i}</span>
      </div>
    </div>
  )
}

const Data = ({ data, dispatch }) => {

  return data.map((obj) =>
    <div className="order_item row" key={obj._id}>
      <img className='order_image' src={`http://${process.env.PUBLIC_URL}/img/${obj.photos[0]}`}></img>
      <h3>{obj.name}</h3>
      {/* <input type="ratio" value={obj.quantity} /> */}
      <select value={obj.quantity} onChange={(e) => dispatch(set_to_cart({_id:obj._id, quantity: e.target.value}))}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </select>
      <h3>{obj.price*obj.quantity}</h3>
    </div>
  )
}



