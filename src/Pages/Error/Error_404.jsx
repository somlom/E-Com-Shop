import React from 'react'
import { Link } from 'react-router-dom'
import { CgSmileSad } from "react-icons/cg"
import { useTranslation } from 'react-i18next';

import "./Error_404.css"


const Error_404 = () => {

    const [t] = useTranslation();

    return (
        <div id='error'>
            <div className='error_title'>
                    <CgSmileSad size={40}/>
                    <h1 className='title'>{t("404_error")}</h1>
            </div>

            <p>{t("sorry")}</p>
            <Link to={"/"}>{t("back_to_homepage")}</Link>
        </div>
    )
}

export default Error_404