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
import { Hamburger } from './Hamburger';


export const Navigation = () => {

  const [modal_state, handle_modal] = useState(false);
  const [menu_state, handle_menu] = useState(false);

  const { t } = useTranslation();
  const count = useSelector(selectCount);

  const body = document.body;
  console.log(body)
  if (menu_state === true) {
    body.style.overflow = "hidden"
  }

  if (menu_state === false) {
    body.style.overflow = "auto"
  }

  return (
    <>
      <div className='nav row'>

        <div className='open_menu nav_column' onClick={() => handle_menu(!menu_state)}>
          {menu_state === true ? <GrClose size={30} /> : <GiHamburgerMenu size={30} />}
        </div>

        <div className='nav_column'>
          <Link to="/"><h1 className='nav_title'>Nav</h1></Link>
        </div>
        <div className='nav_column' id='pc'>
          <input className='nav_title form' type="text" placeholder="Search" />
        </div>
        <div className='row' style={{ flexWrap: "nowrap" }}>
          <div className='nav_column' id='pc'>
            <div className='row'>
              <Link className="link column" to="/login">{t("login")}</Link>
              <Link className="link column" to="/register">{t("register")}</Link>
              <Link className="link column" to="/reset">{t("reset")}</Link>
              <Link className="link column" to="/products">{t("products")}</Link>
            </div>
          </div>
          <div className='nav_column'>
            <button className='cart_button opacity' type="button" onClick={() => handle_modal(true)}><MdOutlineShoppingCart /><span>{count.cart.length}</span></button>
          </div>
        </div>
        <div className='nav_column' id="mobile">
          <input className='nav_title form' type="text" placeholder='Search' />
        </div>
      </div>

      {modal_state &&
        <Modal handle_modal={handle_modal} modal_state={modal_state} title={<span>Total {count.cart.length} items</span>}>
          <Cart />
        </Modal>
      }
      {menu_state &&
        <Hamburger handle_modal={handle_menu} state={menu_state} />
      }
    </>
  )
}

export const Menu = () => {

  const { t } = useTranslation();

  return (

    <div className='nav_column'>
      <a className="link column" href="/login">{t("login")}</a>
      <a className="link column" href="/register">{t("register")}</a>
      <a className="link column" href="/reset">{t("reset")}</a>
      <a className="link column" href="/products">{t("products")}</a>
    </div>
  )
}
