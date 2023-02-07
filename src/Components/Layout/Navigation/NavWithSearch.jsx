import React, { Suspense, useState, useEffect } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsBag } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


import "./Navigation.css"
import { Modal } from '../Modal/Modal'
import { cartArray } from '../../../features/cart_slice';
import { Cart } from '../Cart/Cart';
import { Spinner } from '../../Other/Spinner/Spinner';
import Hamburger from '../Hamburger';
import { usePostCountMutation } from '../../../features/cart_api';
import { Button } from '../../Other/Buttons/Standart';
import { Input } from '../../Other/Form/Form';
import { NavElement } from '../../Other/Buttons/With_Icon/NavElement';
import { Row } from '../../Other/Structure/Flex-Box/Flex-Box';


export const NavWithSearch = () => {

    const [modal_state, handle_modal] = useState(false);
    const [menu_state, handle_menu] = useState(false);

    const [t] = useTranslation();
    const cart = useSelector(cartArray);

    const [sendIt, result] = usePostCountMutation();

    useEffect(() => {
        sendIt(cart)
    }, [cart])

    const body = document.body;
    if (menu_state === true) {
        body.style.overflow = "hidden"
    } else {
        body.style.overflow = "auto";
    }

    return (
        <>
            <Row className='nav'>
                <div className='open_menu nav_column' onClick={() => handle_menu(prev => !prev)}>
                    {menu_state === true ? <GrClose size={30} /> : <GiHamburgerMenu size={30} />}
                </div>

                <div className='nav_column' onClick={() => handle_menu(false)}>
                    <Link to="/">
                        <div className='nav_title'>
                            <h1>E</h1>
                            <span>interEcom</span>
                        </div>
                    </Link>
                </div>

                <div className='nav_column form' id='pc'>
                    <Input.Text className={'nav_title'} placeholder={"Search"} />
                </div>

                <Row>
                    <div className='nav_column' id='pc' onClick={() => handle_menu(false)}>
                        <Row>

                            <Link className="link column" to="/account">
                                <NavElement>
                                    <AiOutlineUser size={20} />
                                    <span>{t("account")}</span>
                                </NavElement>
                            </Link>

                            <Link className="link column" to="/order">
                                <NavElement>
                                    <BsBag size={20} />
                                    <span>{t("order")}</span>
                                </NavElement>
                            </Link>

                        </Row>
                    </div>
                    <div className='nav_column'>
                        <Button.Primary type={"button"} onClick={() => handle_modal(true)}><MdOutlineShoppingCart />{result.data?.quantity}</Button.Primary>
                    </div>
                </Row>
                <div className='nav_column form' id="mobile">
                    <Input.Text className='nav_title' placeholder={t("search")} />
                </div>
            </Row>

            {modal_state &&
                <Modal handle_modal={handle_modal} modal_state={modal_state} title={<span>{t("total")} {result.data?.quantity} {t("items")}</span>}>
                    <Cart handle_close={handle_modal} />
                </Modal>
            }
            {menu_state &&
                <Suspense fallback={<Spinner />}>
                    <Hamburger handle_menu={handle_menu} state={menu_state} />
                </Suspense>
            }
        </>
    )
}
