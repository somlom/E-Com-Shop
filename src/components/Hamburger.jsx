import React from 'react'
import { useTranslation } from 'react-i18next';


export const Hamburger = ({ handle_menu, state }) => {
    

    const { t } = useTranslation();
    return (
        <div className='fade_it'>
            <div className="column hamburger">
                <a className="link column" href="/login">{t("login")}</a>
                <a className="link column" href="/register">{t("register")}</a>
                <a className="link column" href="/reset">{t("reset")}</a>
                <a className="link column" href="/products">{t("products")}</a>
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
