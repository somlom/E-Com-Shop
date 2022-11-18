import React from 'react'
// import { FaUserCircle } from 'react-icons/fa';
//          ^ hier muss Iconnamen stehen     ^ erste Buchstaben der Icon(zb FaIcon => fa)
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link, Navigate, NavLink } from 'react-router-dom';

import "../css/Navigation.css"
import { Auth } from '../pages/Auth';
import { Modal } from './Modal'


export const Navigation = () => {

  const [modal_state, handle_modal] = React.useState(false);

  return (
    <div className='nav'>

      <div className='nav_column mobile'>
        <button type='button' className='mobile'>- - -</button>
      </div>

      <div className='nav_column buttons'>
          <h1 className='nav_title'>Nav</h1>

          <Link className="link column" to="/">mest</Link>
          <Link className="link column" to="/">mest</Link>
          <Link className="link column" to="/">mest</Link>
          <Link className="link column" to="/">mest</Link>
          <Link className="link column" to="/">mest</Link>
          <Link className="link column" to="/">mest</Link>
          <Link className="link column" to="/">mest</Link>
          <Link className="link column" to="/">mest</Link>
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