import React from 'react'
import { FaUserCircle } from 'react-icons/fa';

import "../css/Navigation.css"
import { Auth } from '../pages/Auth';
import { Modal } from './Modal'


export const Navigation = () => {

  const [modal_state, handle_modal] = React.useState(false);

  return (
    <div className='nav'>

      <div className='nav_column buttons'>
        <h1 className='nav_title'>Nav</h1>

        <a className="link" href="/">J-Key</a>
        <a className="link" href="">S-Key</a>
        <a className="link" href="#">M-Key</a>
        <a className="link" href="#">mest</a>
        <a className="link" href="#">test</a>
        <a className="link" href="#">mest</a>
      </div>

      <div className='nav_column login'>
        <button className='login_button opacity' type="button" onClick={() => handle_modal(true)}>Login <span><FaUserCircle /></span></button>
      </div>

      <div className='nav_column add to cart'>
        <button className='add_to_cart' type="button">Add to cart <span><FaUserCircle /></span></button>
      </div>

      {modal_state &&
        <Modal handle_modal={handle_modal}>
          <Auth />
        </Modal>
      }
    </div>
  )
}