import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineFire, AiOutlineUser } from 'react-icons/ai';


export const Hamburger = ({ handle_menu, state }) => {


    const [t] = useTranslation();
    return (
        <div className='fade_it'>
            <div className="column hamburger">
                {/* <Link className="link column" to="/hot" onClick={() => handle_menu(false)}>
                    <div className='row'>
                        <AiOutlineFire size={25} />
                        <span>{t("hot_deals")}</span>
                    </div>
                </Link> */}
                <Link className="link column" to="/register" onClick={() => handle_menu(false)}>
                    <div className='row'>
                        <AiOutlineHeart size={25} />
                        <span>{t("wishlist")}</span>
                    </div>
                </Link>
                <Link className="link column" to="/account" onClick={() => handle_menu(false)}>
                    <div className='row'>
                        <AiOutlineUser size={25} />
                        <span>{t("account")}</span>
                    </div>
                </Link>
                <Link className="link column" to="/order" onClick={() => handle_menu(false)}>
                    <div className='row'>
                        <BsBag size={25} />
                        <span>{t("order")}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
