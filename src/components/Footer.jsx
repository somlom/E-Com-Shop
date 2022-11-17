import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Footer.css"

export const Footer = () => {
  return (
    <div className='footer'>

      <div className='footer_content'>

        <div className='footer_data'>

          <Link to="/">
            <a className="link" >
              FAQ
            </a>
          </Link>
          <Link to="/">
            <a className="link" >
              Impressum
            </a>
          </Link>
          <Link to="/">
            <a className="link" >
              Customer rights
            </a>
          </Link>
          <Link to="/">
            <a className="link" >
              Support
            </a>
          </Link>

        </div>
      </div>

      <div className='company_data'>
        <p>Nav org</p>
        <p>71337 Snustown</p>
      </div>

    </div>
  )
}
