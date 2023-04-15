import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { BsBag } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'

import './Account.css'
import { Column } from '../../../Components/Other/Structure/Flex-Box/Flex-Box'

const Account = () => {
    const [t] = useTranslation()

    const logout_user = () => {
        localStorage.removeItem('user')
        return toast.success(t('logged_out'))
    }

    return (
        <Column>
            <h1>{t('my_account')}</h1>
            <div className="dropdown_data">
                <Column className="dropdown">
                    <Link className="width" to="/account/orders">
                        <BsBag />
                        {t('my_orders')}
                    </Link>
                    <Link className="width" to="/account/personal_data">
                        <AiOutlineUser />
                        {t('personal_data')}
                    </Link>

                    <Link
                        to="/"
                        className="dropdown_button"
                        onClick={logout_user}
                    >
                        <BiLogOut />
                        {t('logout')}
                    </Link>
                </Column>
                <Column className="account_content">
                    <Outlet />
                </Column>
            </div>
        </Column>
    )
}

export default Account
