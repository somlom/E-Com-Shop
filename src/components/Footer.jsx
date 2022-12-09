import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import "../css/Footer.scss"


export const Footer = () => {

  const { t, i18n } = useTranslation();

  return (
    <div className='column'>

      <div className='footer_content column'>
        <div className='footer_data row'>
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
      </div>

      <div className='company_data row'>
        <p>Nav org</p>
        <p>71337 Snustown</p>
      </div>

    </div>
  )
}
