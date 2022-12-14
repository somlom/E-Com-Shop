import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Hamburger = ({ handle_menu, state }) => {


    const { t } = useTranslation();
    return (
        <div className='fade_it'>
            <div className="column hamburger">
                <Link className="link column" to="/login" onClick={() => handle_menu(false)}>{t("login")} </Link>
                <Link className="link column" to="/register" onClick={() => handle_menu(false)}>{t("register")}</Link>
                <Link className="link column" to="/reset" onClick={() => handle_menu(false)}>{t("reset")}</Link>
                <Link className="link column" to="/products" onClick={() => handle_menu(false)}>{t("products")}</Link>
            </div>
        </div>
        // <ul class="menu">
        //     <li>One</li>
        //     <li>Two</li>
        //     <li>Three</li>
        //     <li>Four</li>
        //     <li>Five</li>
        // </ul>
    )
}
