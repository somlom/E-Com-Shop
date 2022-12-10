import React, { useState } from 'react'

import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


import "../css/Navigation.scss"
import { Modal } from './Modal'
import { selectCount } from '../features/cart/cart_slice';
import { Cart } from '../pages/Cart';


export const Navigation = () => {

  const [modal_state, handle_modal] = useState(false);
  const [menu_state, handle_menu] = useState(false);

  const { t } = useTranslation();
  const count = useSelector(selectCount);

  return (
    <div>
      <div className='nav'>

        <div className='open_menu nav_column' onClick={() => handle_menu(!menu_state)}>
          {menu_state === true ? <GrClose size={30} /> : <GiHamburgerMenu size={30} />}
        </div>

        <div className='nav_column'>
          <Link to="/"><h1 className='nav_title'>Nav</h1></Link>
        </div>
        <div className='nav_column' id="pc">
          <input className='nav_title form' type="text" placeholder="Search" />
        </div>

        <div className='nav_column buttons'>
          <Link className="link column" to="/login">{t("login")}</Link>
          <Link className="link column" to="/register">{t("register")}</Link>
          <Link className="link column" to="/reset">{t("reset")}</Link>
          <Link className="link column" to="/products">{t("products")}</Link>
        </div>
        <div className='nav_column'>
          <button className='cart_button opacity' type="button" onClick={() => handle_modal(true)}><MdOutlineShoppingCart /><span>{count.cart.length}</span></button>
        </div>
        <div className='nav_column' id="mobile">
          <input className='nav_title form' type="text" placeholder='Search' />
        </div>
      </div>
      {menu_state &&
        <Modal handle_modal={handle_menu}>
          <h3>1 item</h3>
          <h3>1 item</h3>
          <h3>1 item</h3>
          <h3>1 item</h3>
          <h3>1 item</h3>
        </Modal>
      }

      {modal_state &&
        <Modal handle_modal={handle_modal} modal_state={modal_state}>
          <Cart />
        </Modal>
      }
    </div>
  )
}