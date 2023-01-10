import React from 'react'
import { TiTick } from "react-icons/ti"
import { useTranslation } from 'react-i18next';

import "./Order.scss"


export const Step = ({ number, children }) => {

    const [t] = useTranslation();

    return (
        <div className='column'>
            <div className='list row'>
                <a>
                    <div className='column'>

                        {number > 1 ? <TiTick size={43} /> : <p>1</p>}
                        <span>{t("order")}</span>

                    </div>
                    {number > 1 ? <p></p> : <p>-</p>}
                </a>
                <a>
                    <div className='column'>
                        {number > 2 ? <TiTick size={20} /> : <p>2</p>}
                        <span>{t("information")}</span>
                    </div>
                </a>
                <a>
                    <div className='column'>
                        <p>{number > 3 ? <TiTick size={20} /> : "3"}</p>
                        <span>{t("payment")}</span>
                    </div>
                </a>
                <a>
                    <div className='column'>
                        <p>{number > 4 ? <TiTick size={20} /> : "4"}</p>
                        <span>{t("receipt")}</span>
                    </div>
                </a>
            </div>
            {children}
        </div>
    )
}