import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import "./Cart.css"
import { cartArray } from '../../../features/cart/cart_slice';
import { usePostCartMutation } from '../../../features/cart/cart_api';


export function Cart({ handle_close }) {

  const [t] = useTranslation();

  const cart = useSelector(cartArray);
  const [sendIt, result] = usePostCartMutation();


  React.useEffect(() => {
    const send_to_backend = async (cart) => {
      await sendIt(cart)
    }
    send_to_backend(cart)

  }, [cart])

  if (result.isSuccess === true && result.data !== undefined) {
    return (

      <div className='cart column'>
        {result.data.length === 0 ? <h1 className='column'>{t("no_items")}</h1> : <Cart_Element data={result.data} handle_close={handle_close} />}
      </div>
    );
  } else if ((result.isLoading || result.isUninitialized) === true) {
    return (
      <div className='cart column'>
        <h1>Loading...</h1>
      </div>
    );
  }
  else {
    return <h1>error</h1>
  }
}

const Cart_Element = ({ data, handle_close }) => {

  const [t] = useTranslation();

  return (
    <>
      {data.map(data_val => (
        <div className="column" key={data_val._id}>

          <div className='product_row'>
            <img className='product_column' src={"../../../public/img/" + data_val.photos[0]}></img>

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
        <Link to="/order" className='opacity' onClick={() => handle_close()}>{t("pay")}</Link>
        <Link to="/account" onClick={() => handle_close()}>{t("account")}</Link>
      </div>
    </>
  )
}