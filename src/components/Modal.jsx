import { useTranslation } from 'react-i18next';
import React from 'react'

import "../css/Modal.scss"
import { close_on_esc } from '../hooks/close_on_esc';


export const Modal = ({ children, handle_modal }) => {
    const modal_element = document.getElementsByClassName("modal");
    const body = document.getElementsByTagName("body");
    console.log(body[0].offsetWidth, body)
    if (body[0].offsetWidth <= 767) {
        // Disable scroll
        body[0].style.overflow = "hidden";

    }else{
        body[0].style.overflow = "auto";
    }

    const { t } = useTranslation();

    close_on_esc(handle_modal);

    return (
        <div className='fade'>
            <div className='modal'>
                <div className='modal_title'>
                    <p>{t("modal_title")}</p>
                    <button className="close_button opacity" onClick={() => handle_modal(false)}>&#x2715;</button>
                </div>
                <div className='modal_content'>
                    {children}
                </div>
            </div>
            <div className='filling' onClick={() => handle_modal(false)}></div>
        </div>
    )
}
