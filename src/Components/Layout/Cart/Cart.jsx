import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUser } from "react-icons/fa"

import "./Cart.css"
import { cartArray } from '../../../features/cart_slice';
import { usePostCartMutation } from '../../../features/cart_api';
import { Column } from '../../Other/Structure/Flex-Box/Flex-Box';


export function Cart({ handle_close }) {

  const [t] = useTranslation();

  const cart = useSelector(cartArray);
  const [sendIt, result] = usePostCartMutation();

  useEffect(() => {
    const send_to_backend = async (cart) => {
      await sendIt(cart)
    }
    send_to_backend(cart)

  }, [cart])

  if (result.isSuccess === true && result.data !== undefined) {
    return (

      <Column className='cart'>
        {result.data.length === 0 ? <h1 className='column'>{t("no_items")}</h1> : <Cart_Element data={result.data} handle_close={handle_close} />}

        <Column className='cart_footer'>
          {
            result.data.length > 0 &&
            <Link to="/order" className='opacity' onClick={() => handle_close()}>{t("pay")}</Link>
          }
          <Link className='row' to="/account" onClick={() => handle_close()}><FaUser size={20} />{t("account")}</Link>

        </Column>

      </Column>
    );
  } else if ((result.isLoading || result.isUninitialized) === true) {
    return (
      <Column className='cart'>
        <h1>{t("loading")}</h1>
      </Column>
    );
  }
  else {
    return <h1>{t("error")}</h1>
  }
}

const Cart_Element = ({ data }) => {

  return (
    <>
      {data.map(data_val => (
        <Column key={data_val._id}>

          <div className='product_row'>
            <img className='product_column' src={process.env.API_URL + "/img/" + data_val.photos[0]} alt="aa"></img>

            <Column className='product_column'>
              <h3>{data_val.name}</h3>
              {data_val.quantity === 1 ? "" : <span>x{data_val.quantity}</span>}
            </Column>
          </div>
        </Column>
      ))}
    </>
  )
}