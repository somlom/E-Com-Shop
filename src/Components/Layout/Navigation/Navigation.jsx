import React, { Suspense, useState } from 'react'

import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsBag } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


import "./Navigation.css"
import "../../Other/Form/Form.css"
import { Modal } from '../Modal/Modal'
import { selectCount } from '../../../features/cart_slice';
import { Cart } from '../Cart/Cart';
import { Spinner } from '../../Other/Spinner/Spinner';
import Hamburger from '../Hamburger';



export const Navigation = () => {

  const [modal_state, handle_modal] = useState(false);
  const [menu_state, handle_menu] = useState(false);

  const [t] = useTranslation();
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
          <Link to="/">
            <div className='nav_title'>
              <h1>E</h1>
              <span>interEcom</span>
            </div>
          </Link>
        </div>

        <div className='nav_column form' id='pc'>
          <input className='nav_title' type="text" placeholder="Search" />
        </div>

        <div className='row'>
          <div className='nav_column' id='pc' onClick={() => handle_menu(false)}>
            <div className='row'>
              {/* <Link className="link column" to="/hot">
                <div className='with_icon'>
                  <AiOutlineFire size={20} />
                  <span>{t("hot_deals")}</span>
                </div>
              </Link> */}
              <Link className="link column" to="/account">
                <div className='with_icon'>
                  <AiOutlineUser size={20} />
                  <span>{t("account")}</span>
                </div>
              </Link>
              <Link className="link column" to="/order">
                <div className='with_icon'>
                  <BsBag size={20} />
                  <span>{t("order")}</span>
                </div>
              </Link>
            </div>
          </div>
          <div className='nav_column'>
            <button className='button_opacity opacity primary' type="button" onClick={() => handle_modal(true)}><MdOutlineShoppingCart />{count}</button>
          </div>
        </div>
        <div className='nav_column form' id="mobile">
          <input className='nav_title' type="text" placeholder={t("search")} />
        </div>
      </div>

      {modal_state &&
        <Modal handle_modal={handle_modal} modal_state={modal_state} title={<span>{t("total")} {count} {t("items")}</span>}>
          <Cart handle_close={handle_modal} />
        </Modal>
      }
      {menu_state &&
        <Suspense fallback={<Spinner />}>
          <Hamburger handle_menu={handle_menu} state={menu_state} />
        </Suspense>
      }
    </>
  )
}
