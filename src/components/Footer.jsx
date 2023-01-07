import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import "../css/Footer.scss"
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { IoIosLocate } from 'react-icons/io';


export const Footer = () => {
  const [t] = useTranslation();

  return (
    <div className='footer column'>

      <div className='company_data row'>
        <div><AiOutlinePhone size={20} /> 21321983213821</div>
        <div><AiOutlineMail size={20} /> interecom.ohg@gmail.com</div>
        <div><IoIosLocate size={20} /> 71337 Casabbb</div>
      </div>

      <div className='footer_content column'>
        <div className='row'>
          <div className='column'>
            <Link to="/faq" className="link">
              {t("faq")}
            </Link>
            <Link to="/impressum" className="link">
              {t("impressum")}
            </Link>
            <Link to="/customer_rights" className="link">
              {t("customer_rights")}
            </Link>
            <Link to="/support" className="link">
              {t("support")}
            </Link>
          </div>
          <div className='column'>
            <p>{t("newsletter_text")}</p>
            <div className='form column'>
              <input type="text" placeholder='E-Mail' />
            </div>
            <p>{t("payment_methods")}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
