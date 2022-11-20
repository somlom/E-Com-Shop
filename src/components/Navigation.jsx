import React from 'react'
// import { FaUserCircle } from 'react-icons/fa';
//          ^ hier muss Iconnamen stehen     ^ erste Buchstaben der Icon(zb FaIcon => fa)
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';


import "../css/Navigation.css"
import { Auth } from '../pages/Auth';
import { Modal } from './Modal'
import { selectCount } from '../features/cart/cart_slice';


export const Navigation = () => {

  const [modal_state, handle_modal] = React.useState(false);
  const { t } = useTranslation();
  const count = useSelector(selectCount);

  return (
    <div className='nav'>

      <div className='nav_column dropdown'>
        <button type='button' className='dropdown'><HiOutlineMenuAlt4 /> </button>
        <Dropdown_Content/>
      </div>

      <div className='nav_column buttons'>
        <Link to="/"><h1 className='nav_title'>Nav</h1></Link>

        <Link className="link column" to="/login">{t("login")}</Link>
        <Link className="link column" to="/register">{t("register")}</Link>
        <Link className="link column" to="/reset">{t("reset")}</Link>
        <Link className="link column" to="/products">{t("products")}</Link>
        <Link className="link column" to="/redux">Redux (testing shopping cart)</Link>
      </div>

      <div className='nav_column login'>
        <button className='login_button opacity' type="button" onClick={() => handle_modal(true)}><MdOutlineShoppingCart />{count}</button>
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

export const Dropdown_Content = () => {

  const { t } = useTranslation();

  return (
    <div className="dropdown-content">
      <a href="/login">{t("login")}</a>
      <a href="/register">{t("register")}</a>
      <a href="/reset">{t("reset")}</a>
      <a href="/products">{t("products")}</a>
      <a href="/redux">Redux (testing shopping cart)</a>
    </div>
  )
}
