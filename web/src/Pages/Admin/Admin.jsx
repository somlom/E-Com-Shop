import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import { AiFillDelete } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'

import { Card } from '../../Components/Other/Card/Card'
import Aros from '../../../public/svgexport-36.svg'
import { Spinner } from '../../Components/Other/Spinner/Spinner'
import { Column, Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box'

const Admin = () => {
    const Products = lazy(() => import('../Products/Products'))
    return (
        <div>
            <Suspense fallback={<Spinner />}>
                <Row style={Topbar}>
                    <img src={Aros} alt="Logos" height={'100px'} />
                    <Link to="/" style={Navbar_item}onClick={logout_user}>
                        <Column style={WithIcon}>
                            <BiLogOut />
                            <span>Log out</span>
                        </Column>
                    </Link>
                </Row>
                <Products />
            </Suspense>

            <Card style={Navbar}>
                <Link to="/admin/add" style={Navbar_item}>
                    <Column style={WithIcon}>
                        <IoMdAdd />
                        <span>Add</span>
                    </Column>
                </Link>
                <Link to="/admin/add" style={Navbar_item}>
                    <Column style={WithIcon}>
                        <AiFillDelete />
                        <span>Delete</span>
                    </Column>
                </Link>
            </Card>
        </div>
    )
}

const logout_user = () => {
    localStorage.removeItem('user')
    return toast.success(t('logged_out'))
}
const Navbar = {
    position: 'sticky',
    margin: 0,
    bottom: '-1px',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
}

const Topbar = {
    position: 'sticky',
    margin: 0,
    top: '-1px',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    zIndex: 1,
    borderBottom:"1px solid grey"
}
const Navbar_item = {
    borderRadius: '15px',
    padding: '10px',
}

const WithIcon = {
    justifyContent: 'center',
    alignItems: 'center',
}
export default Admin
