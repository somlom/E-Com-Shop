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
        <p><AiOutlinePhone/> 21321983213821</p>
        <p><AiOutlineMail/> interecom.ohg@gmail.com</p>
        <p><IoIosLocate/> 71337 Casabbb</p>
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
            <p>{t("Newsletter_text")}</p>
            <input type="text" placeholder='E-Mail' />
            <p>{t("payment_methods")}</p>
          </div>
        </div>
      </div>

    </div>
  )
}
