import { useState, useEffect } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import "./Navigation.css"
import { Modal } from '../Modal/Modal'
import { cartArray } from '../../../features/cart_slice';
import { Cart } from '../Cart/Cart';
import { usePostCountMutation } from '../../../features/cart_api';
import { Button } from '../../Other/Buttons/Standart';
import { NavElement } from '../../Other/Buttons/With_Icon/NavElement';
import { Column, Row } from '../../Other/Structure/Flex-Box/Flex-Box';


export const Navigation = () => {

  const [modal_state, handle_modal] = useState(false);

  const [t] = useTranslation();
  const cart = useSelector(cartArray);

  const [sendIt, result] = usePostCountMutation();

  useEffect(() => {
    sendIt(cart)
  }, [cart])

  const count = result.data?.quantity

  return (
    <Row className='nav'>
      <div className='nav_column'>
        <Link className="link column" to="/account">
          <NavElement>
            <AiOutlineUser size={20} />
            <span>{t("account")}</span>
          </NavElement>
        </Link>
      </div>
      <div className='nav_column'>
        <Link to="/">
          <Column>
            <h1>E</h1>
            <span>interEcom</span>
          </Column>
        </Link>
      </div>

      {/* <div className='nav_column'> */}
      <div className="nav_column">
        <Link className="link column" onClick={() => handle_modal(true)}>
          <NavElement>
            <Row className={"cart_button"}>
              <MdOutlineShoppingCart size={23} />
              <span>{count}</span>
            </Row>
          </NavElement>
        </Link>
      </div>
      {/* </div> */}
      {modal_state &&
        <Modal handle_modal={handle_modal} modal_state={modal_state} title={<span>{t("total")} {count} {t("items")}</span>}>
          <Cart handle_close={handle_modal} />
        </Modal>}
    </Row>
  )
}
