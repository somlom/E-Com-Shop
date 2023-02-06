import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import "./Footer.css"
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { IoIosLocate } from 'react-icons/io';
import { Input } from '../../Other/Form/Form';
import { Column, Row } from '../../Other/Structure/Flex-Box/Flex-Box';


const Footer = () => {
  const [t] = useTranslation();

  return (
    <Column className='footer'>

      <Row className='company_data'>
        <div><AiOutlinePhone size={20} /> <span>21321983213821</span></div>
        <div><AiOutlineMail size={20} /> <span>interecom.ohg@gmail.com</span></div>
        <div><IoIosLocate size={20} /> <span>71337 Casabbb</span></div>
      </Row>

      <Column className='footer_content'>
        <Row>

          <Column>
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
          </Column>

          <Column>
            <p>{t("newsletter_text")}</p>
            <div className='form column'>
              <Input.Text placeholder='E-Mail' />
            </div>
            <p>{t("payment_methods")}</p>
          </Column>

        </Row>
      </Column>

    </Column>
  )
}

export default Footer