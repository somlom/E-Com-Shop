import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import "../css/Cart.scss"
import { cartArray } from '../features/cart/cart_slice';
import { usePostCartMutation } from '../features/cart/cart_api';
import { Spinner } from '../components/Spinner';
import { useCheckTokenQuery } from '../features/cart/user_api';


export function Cart() {

  const cart = useSelector(cartArray);
  const [sendIt, result] = usePostCartMutation();

  React.useLayoutEffect(() => {
    const send_to_backend = async (cart) => {
      await sendIt(cart)
    }
    send_to_backend(cart)

  }, [cart])

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

  const query = useCheckTokenQuery();
  const value = query.data

  return (
    <>
      {data.map(data_val => (
        <div className="column" key={data_val._id}>

          <div className='product_row'>
            <img className='product_column' src={`http://${process.env.PUBLIC_URL}/img/${data_val.photos[0]}`}></img>

            <div className='product_column column'>
              <h3>{data_val.name}</h3>
              {data_val.quantity === 1 ? "" : <span>x{data_val.quantity}</span>}
            </div>
          </div>

          <div className='product_row'>
          </div>

        </div>
      ))}
      <div className='cart_footer column'>
        <button><Link to="/order">Check Out</Link></button>
        <Link to={value?.response === true ? "/account" : "/login"}>Account</Link>
      </div>
    </>
  )
}