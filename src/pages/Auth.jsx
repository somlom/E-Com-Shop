import React from 'react'
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';

import { Form } from '../components/Form';
import "../css/Form.scss"


export const Auth = () => {

    const [input, setInput] = React.useState({});
    const { t, i18n } = useTranslation();

    const add_to_state = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = (event) => {
        if (Object.keys(input).length >= 1) {
            return alert("email: " + input.email + " password: " + input.password)
        } else {
            event.preventDefault();
            return alert("Error!!! Empty fields")
        }

    }

    return (
        <Form title={t("login")} onChange={add_to_state} onSubmit={send_to_backend}>
            <input type="email" placeholder="E-mail" id='email' onChange={add_to_state} />
            <input type="password" placeholder={t("password")} id='password' onChange={add_to_state} />
            <div className='form_buttons'>
                <button className="login_button opacity" type='submit'><span><FaUserPlus /></span>{t("login")}</button>
                <button className="no_acc_button" type='button'><span><FaUserPlus /></span>{t("dont_have_an_account")}</button>
            </div>
        </Form>
    )
}

export const Register = () => {
    const [input, setInput] = React.useState({});
    const { t, i18n } = useTranslation();

    const add_to_state = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const send_to_backend = () => {
        return alert("email: " + input.email + " password: " + input.password)
    }

    return (
        <div>
            <div className='form_content'>
                <h3 className='form_title'>Register</h3>
                <form onSubmit={send_to_backend} className="form">
                    <input type="email" placeholder="E-mail" id='email' onChange={add_to_state} />
                    <input type="password" placeholder={t("password")} id='password' onChange={add_to_state} />
                    <input type="password" placeholder={t("password_again")} id='password2' onChange={add_to_state} />
                    <button className="login_button opacity" type='submit'><span><FaUserPlus /></span>{t("register")}</button>
                </form>
            </div>
        </div>
    )
}


export const Reset = () => {
    const [input, setInput] = React.useState({});
    const { t, i18n } = useTranslation();

    const add_to_state = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const send_to_backend = () => {
        return alert("email: " + input.email + " password: " + input.password)
    }

    return (
        <div>
            <div className='form_content'>
                <h3 className='form_title'>Reset your password</h3>
                <form onSubmit={send_to_backend} className="form">
                    <input type="email" placeholder="E-Mail" id='email' onChange={add_to_state} />
                    <button className="login_button opacity" type='submit'><span><FaUserPlus /></span>{t("reset")}</button>
                </form>
            </div>
        </div>
    )
}