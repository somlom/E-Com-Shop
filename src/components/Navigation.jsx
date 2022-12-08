import React from 'react'

import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


import "../css/Navigation.scss"
import { Modal } from './Modal'
import { selectCount } from '../features/cart/cart_slice';
import { Cart } from '../pages/Cart';


export const Navigation = () => {

  const [modal_state, handle_modal] = React.useState(false);

  const [menu_state, menu_is_opened] = React.useState(false);

  const { t } = useTranslation();
  const count = useSelector(selectCount);

  return (
    <div>
      <div className='nav'>

        <div className='nav_column mobile'>
          <button type='button' className='mobile' onClick={() => menu_is_opened(!menu_state)}>{menu_state === true ? <AiOutlineClose className='in_mobile' /> : <HiOutlineMenuAlt4 className='in_mobile' />} </button>
        </div>

        <div className='nav_column buttons'>
          <Link to="/"><h1 className='nav_title'>Nav</h1></Link>

          <Link className="link column" to="/login">{t("login")}</Link>
          <Link className="link column" to="/register">{t("register")}</Link>
          <Link className="link column" to="/reset">{t("reset")}</Link>
          <Link className="link column" to="/products">{t("products")}</Link>
        </div>

        <div className='nav_column login'>
          <button className='login_button opacity' type="button" onClick={() => handle_modal(true)}><MdOutlineShoppingCart /><span>{count.cart.length}</span></button>
        </div>
      </div>
      {modal_state &&
        <Modal handle_modal={handle_modal} modal_state={modal_state}>
          <Cart />
        </Modal>
      }
    </div>
  )
}