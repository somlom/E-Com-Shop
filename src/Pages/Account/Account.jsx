import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import '../../Components/Order/Order.css'


const Account = () => {

    const [t] = useTranslation();

    return (
        <div className='column'>
            <h1>My account</h1>
            <div className='row'>
                <div className='dropdown column'>
                    <div className='width'>
                        <Link to="/account/orders">{t("my_orders")}</Link>
                    </div>
                    <div className='width'>
                        <Link to="/account/payments">{t("payments")}</Link>
                    </div>
                    <div className='width'>
                        <Link to="/account/wishlist">{t("wishlist")}</Link>
                    </div>
                    <div className='width'>
                        <Link to="/account/personal_data">{t("personal_data")}</Link>
                    </div>
                </div>
                <div className='column'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Account