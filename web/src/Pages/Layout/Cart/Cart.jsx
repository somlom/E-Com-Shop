import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUser } from "react-icons/fa"

import "./Cart.css"
import { cartArray } from '../../../features/cart_slice';
import { usePostCartMutation } from '../../../features/cart_api';
import { Column, Row } from '../../../Components/Other/Structure/Flex-Box/Flex-Box';
import { Pay } from '../../../Components/Other/Buttons/Pay/Pay';


export function Cart({ handle_close }) {

  const [t] = useTranslation();

  const cart = useSelector(cartArray);
  const [sendIt, result] = usePostCartMutation();

  useEffect(() => {
    sendIt(cart)
  }, [cart])

  if (result.isSuccess === true && result.data !== undefined) {
    return (

      <Column className='cart'>
        {result.data.length === 0 ? <h1 className='column'>{t("no_items")}</h1> : <Cart_Element data={result.data} handle_close={handle_close} />}

        <Column className='cart_footer'>
          {
            result.data.length > 0 &&
            <Pay to="/order" onClick={() => handle_close()}>{t("pay")}</Pay>
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
    return (
      <Column className='cart'>
        <h1>{t("error")}</h1>
      </Column>
    )
  }
}

const Cart_Element = ({ data }) => {

  return (
    <>
      {data.map(data_val => (
        <Column key={data_val._id}>
          <Row className='product_row'>
            <img src={process.env.API_URL + "/img/" + data_val.photos} alt="aa"></img>

            <Column className='product_column'>
              <h3>{data_val.name}</h3>
              {data_val.quantity === 1 ? "" : <span>x{data_val.quantity}</span>}
            </Column>
          </Row>
        </Column>
      ))}
    </>
  )
}