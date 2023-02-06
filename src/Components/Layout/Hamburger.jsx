import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { Column, Row } from '../Other/Structure/Flex-Box/Flex-Box';


const Hamburger = ({ handle_menu }) => {


    const [t] = useTranslation();
    return (
        <div className='fade_it'>
            <Column className="hamburger">

                <Link className="link column" to="/register" onClick={() => handle_menu(false)}>
                    <Row>
                        <AiOutlineHeart size={25} />
                        <span>{t("wishlist")}</span>
                    </Row>
                </Link>

                <Link className="link column" to="/account" onClick={() => handle_menu(false)}>
                    <Row>
                        <AiOutlineUser size={25} />
                        <span>{t("account")}</span>
                    </Row>
                </Link>

                <Link className="link column" to="/order" onClick={() => handle_menu(false)}>
                    <Row>
                        <BsBag size={25} />
                        <span>{t("order")}</span>
                    </Row>
                </Link>

            </Column>
        </div>
    )
}

export default Hamburger