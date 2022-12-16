import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import "../css/Cart.scss"
import {
  add_to_cart, remove_from_cart, remove_one_from_cart, selectCount,
} from '../features/cart/cart_slice';
import { usePostCartMutation, useGetAllQuery } from '../features/cart/cart_api';
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';

export function Cart() {

  const cart = useSelector(selectCount);
  const [sendIt, result] = usePostCartMutation();

  React.useEffect(() => {
    const send_to_backend = async (cart) => {
      await sendIt(cart)
    }
    send_to_backend(cart.cart)

  }, [cart])
  console.log(result)
  return (
    <React.Suspense fallback={<Spinner />}>
      <div className='cart column'>
        {result.data === undefined ? <Spinner /> :
          result.data.length === 0 ? <h1 className='column'>No items</h1> : <Cart_Element data={result.data} />}

      </div>
    </React.Suspense>
  );
}

const Cart_Element = ({ data }) => {

  const dispatch = useDispatch();

  return (
    <>
      {data.map(data_val => (
        <div className="column" key={data_val._id}>

          <div className='product_row'>
            <img className='product_column' src={`http://${process.env.PUBLIC_URL}/img/${data_val.photos[0]}`}></img>

            <div className='product_column'>
              <h3>{data_val.name}</h3>
            </div>
            {/* <button className='remove_item_button' onClick={() => dispatch(remove_from_cart(data_val._id))}>Remove item</button> */}
            {/* <p>{data_val.price}</p> */}
            <div className='counter'>
              {/* <button className='decrease_amount_button' onClick={() => dispatch(remove_one_from_cart(data_val._id))}>-</button> */}
              {data_val.quantity === 1 ? "": <span>x{data_val.quantity}</span>}
              {/* <button className='increase_amount_button' onClick={() => dispatch(add_to_cart(data_val._id))}>+</button> */}
            </div>
          </div>

          <div className='product_row'>
          </div>

        </div>
      ))}
      <div className='cart_footer column'>
        <button><Link to="#">Check Out</Link></button>
        <Link to="/login">Login</Link>
      </div> </>
  )
}