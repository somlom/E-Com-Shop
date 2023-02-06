import { useTranslation } from 'react-i18next';
import React from 'react'

import "./Modal.css"
import { close_on_esc } from '../../../hooks/close_on_esc';
import { Column, Row } from '../../Other/Structure/Flex-Box/Flex-Box';


export const Modal = ({ children, handle_modal, title = "" }) => {

    const [t] = useTranslation();

    close_on_esc(handle_modal);

    return (
        <Column className='fade'>
            <Column className='modal column'>
                <Row className='modal_title'>
                    <span>{title}</span>
                    <button className="close_button opacity" onClick={() => handle_modal(false)}>&#x2715;</button>
                </Row>
                <div className='modal_content'>
                    {children}
                </div>
            </Column>
            <div className='filling' onClick={() => handle_modal(false)}></div>
        </Column>
    )
}
