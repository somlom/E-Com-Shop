import React, { useState } from 'react'

import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsBag, BsSearch } from 'react-icons/bs';
import { FaUser, FaUserAlt } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineFire, AiOutlineUser } from 'react-icons/ai';
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
  menu_state === true ? body.style.overflow = "hidden" : body.style.overflow = "auto";

  return (
    <>
      <div className='nav row'>

        <div className='open_menu nav_column' onClick={() => handle_menu(!menu_state)}>
          {menu_state === true ? <GrClose size={30} /> : <GiHamburgerMenu size={30} />}
        </div>

        <div className='nav_column' onClick={() => handle_menu(false)}>
          <Link to="/"><h1 className='nav_title'>Nav</h1></Link>
        </div>
        <div className='nav_column' id='pc'>
          <input className='nav_title form' type="text" placeholder="Search" />
        </div>
        <div className='row'>
          <div className='nav_column' id='pc' onClick={() => handle_menu(false)}>
            <div className='row'>
              <Link className="link column" to="/hot">
                <div className='with_icon'>
                  <AiOutlineFire size={20} />
                  <span>Hot deals</span>
                </div>
              </Link>
              <Link className="link column" to="/register">
                <div className='with_icon'>
                  <AiOutlineHeart size={20} />
                  <span>Whishlist</span>
                </div>
              </Link>
              <Link className="link column" to="/account">
                <div className='with_icon'>
                  <AiOutlineUser size={20} />
                  <span>Account</span>
                </div>
              </Link>
              <Link className="link column" to="/order">
                <div className='with_icon'>
                  <BsBag size={20} />
                  <span>Order</span>
                </div>
              </Link>
            </div>
          </div>
          <div className='nav_column'>
            <button className='cart_button opacity' type="button" onClick={() => handle_modal(true)}><MdOutlineShoppingCart size={15}/><span>{count.cart.length}</span></button>
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
        <Hamburger handle_menu={handle_menu} state={menu_state} />
      }
    </>
  )
}
