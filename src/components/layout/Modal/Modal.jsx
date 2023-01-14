import { useTranslation } from 'react-i18next';
import React from 'react'

import "./Modal.css"
import { close_on_esc } from '../../../hooks/close_on_esc';
import { Spinner } from '../../other/Spinner/Spinner';


export const Modal = ({ children, handle_modal, title = "" }) => {

    const [t] = useTranslation();

    close_on_esc(handle_modal);

    return (
        <React.Suspense fallback={<Spinner />}>
            <div className='fade column'>
                <div className='modal column'>
                    <div className='modal_title row'>
                        <span>{title}</span>
                        <button className="close_button opacity" onClick={() => handle_modal(false)}>&#x2715;</button>
                    </div>
                    <div className='modal_content'>
                        {children}
                    </div>
                </div>
                <div className='filling' onClick={() => handle_modal(false)}></div>
            </div>
        </React.Suspense>
    )
}
