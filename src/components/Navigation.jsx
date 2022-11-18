import React from 'react'
// import { FaUserCircle } from 'react-icons/fa';
//          ^ hier muss Iconnamen stehen     ^ erste Buchstaben der Icon(zb FaIcon => fa)
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

import "../css/Navigation.css"
import { Auth } from '../pages/Auth';
import { Modal } from './Modal'


export const Navigation = () => {

  const [modal_state, handle_modal] = React.useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div className='nav'>

      <div className='nav_column mobile'>
        <button type='button' className='mobile'><HiOutlineMenuAlt4 /> </button>
      </div>

      <div className='nav_column buttons'>
          <Link to="/"><h1 className='nav_title'>Nav</h1></Link>

          <Link className="link column" to="/">{t("nav test")}</Link>
          <Link className="link column" to="/">{t("nav test")}</Link>
          <Link className="link column" to="/">{t("nav test")}</Link>
          <Link className="link column" to="/">{t("nav test")}</Link>
          <Link className="link column" to="/">{t("nav test")}</Link>
          <Link className="link column" to="/">{t("nav test")}</Link>
          <Link className="link column" to="/">{t("nav test")}</Link>
          <Link className="link column" to="/">{t("nav test")}</Link>
      </div>

      <div className='nav_column login'>
        <button className='login_button opacity' type="button" onClick={() => handle_modal(true)}><MdOutlineShoppingCart /></button>
      </div>

      {/* <div className='nav_column add to cart'>
        <button className='add_to_cart' type="button">Add to cart <span><MdOutlineShoppingCart /></span></button>
      </div> */}

      {modal_state &&
        <Modal handle_modal={handle_modal}>
          <Auth />
        </Modal>
      }
    </div>
  )
}