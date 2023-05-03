import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { IoIosLocate } from 'react-icons/io';
import website_config from "../../../../config.json"

import "./Footer.css"
import { Text } from '../../../Components/Other/Form/Form';
import { Column, Row } from '../../../Components/Other/Structure/Flex-Box/Flex-Box';


const Footer = () => {
  const [t] = useTranslation();

  return (
    <Column className='footer'>

      <Row className='footer_header'>

        <div>
          <AiOutlinePhone size={20} />
          <span>{website_config.number}</span>
        </div>

        <div>
          <AiOutlineMail size={20} />
          <span>{website_config.website_email}</span>
        </div>

        <div>
          <IoIosLocate size={20} />
          <span>{website_config.address}</span>
        </div>

      </Row>

      <Row className='footer_body'>

        <Column className="footer_links">
          <a href={require("../../../static/files/AGB.pdf")} className="link">
            {t("agb")}
          </a>
          <a href={require("../../../static/files/DATENSCHUTZ.pdf")} className="link">
            {t("datenschutz")}
          </a>
          <Link to="/customer_rights" className="link">
            {t("customer_rights")}
          </Link>
          <Link to="/support" className="link">
            {t("support")}
          </Link>
        </Column>

        <Column className="footer_newsletter">

          <p>{t("newsletter_text")}</p>
          <Column className='form'>
            <Text placeholder='E-Mail' />
          </Column>

        </Column>
        <img src={require("../../../static/logo-stripe.png")} />

      </Row>


    </Column>
  )
}

export default Footer