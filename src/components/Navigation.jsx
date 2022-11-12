import React from 'react'

import { Modal } from './Modal'


export const Navigation = () => {

  const [modal_state, handle_modal] = React.useState(false);

  return (
    <div className='nav'>

      <div className='nav_column buttons'>
        <h1 className='nav_title'>Nav</h1>

        <a href='#'>test</a>
        <a className="link" href="#">mest</a>
        <a className="link" href="#">test</a>
        <a className="link" href="#">mest</a>
        <a className="link" href="#">test</a>
        <a className="link" href="#">mest</a>
      </div>

      <div className='nav_column login'>
        <button onClick={() => handle_modal(true)}>login</button>
        {modal_state &&
          <Modal handle_modal={handle_modal}>
            <div className='title'>
              <h1>Login</h1>
              <input type={"email"} placeholder="Email" />
              <input type={"password"} placeholder="Password" />
            </div>
          </Modal>
        }
      </div>

    </div>
  )
}
