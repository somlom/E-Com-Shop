import React from 'react'
import "../css/Footer.css"

export const Footer = () => {
  return (
    <div className='footer'>

      <div className='footer_content'>

        <div className='footer_data'>

          <a className="link" href="#">
            FAQ
          </a>
          <a className="link" href="#">
            Impressum
          </a>
          <a className="link" href="#">
            Customer rights
          </a>
          <a className="link" href="#">
            Support
          </a>

        </div>
      </div>
      
      <div className='company_data'>
        <p>Nav org</p>
        <p>71337 Snustown</p>
      </div>

    </div>
  )
}
