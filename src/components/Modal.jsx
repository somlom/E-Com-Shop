import { useTranslation } from 'react-i18next';
import React from 'react'

import "../css/Modal.css"


export const Modal = ({ children, handle_modal }) => {

    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                handle_modal(false);
            };
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div className='fade_layer'>
            <div className='centered'>
                <div className='modal'>
                    <div className='modal_title'>
                        <p>{t("modal_title")}</p>
                        <button className="close_button opacity" onClick={() => handle_modal(false)}>&#x2715;</button>
                    </div>
                    <div className='modal_content'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
