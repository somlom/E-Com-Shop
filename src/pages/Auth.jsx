import React from 'react'
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';

import { Form } from '../components/Form';
import "../css/Form.scss"
import { usePostData } from '../hooks/Data';
import axios from 'axios';


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
            <div className='form_buttons row'>
                <button className="cart_button opacity" type='submit'>
                    <FaUserPlus /><span>{t("login")}</span>
                </button>
                <button className="no_acc_button " type='button'>
                    <FaUserPlus /><span>{t("dont_have_an_account")}</span>
                </button>
            </div>
        </Form>
    )
}

export const Register = () => {
    const [input, setInput] = React.useState({});
    const { t, i18n } = useTranslation();
    // const { value } = usePostData("http://localhost:4000/auth/register", input);

    const add_to_state = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = async(event) => {
        event.preventDefault()
        if (Object.keys(input).length >= 1) {
            const res = await axios.post("http://localhost:4000/auth/register", input)
            console.log(res)
            return alert("value")
        } else {
            // event.preventDefault();
            return alert("Error!!! Empty fields")
        }

    }

    return (
        <Form title={t("register")} onChange={add_to_state} onSubmit={(e)=>send_to_backend(e)}>
            <input type="email" placeholder="E-mail" id='email' onChange={add_to_state} />
            <input type="password" placeholder={t("password")} id='password' onChange={add_to_state} />
            <input type="password" placeholder={t("password_again")} id='password2' onChange={add_to_state} />
            <div className='form_buttons row'>
                <button className="cart_button opacity" type='submit'>
                    <FaUserPlus /><span>{t("register")}</span>
                </button>
                <button className="no_acc_button " type='button'>
                    <FaUserPlus /><span>Already have an account? Login</span>
                </button>
            </div>
        </Form>
    )
}


export const Reset = () => {
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
        <Form title={t("reset")} onChange={add_to_state} onSubmit={send_to_backend}>
            <input type="email" placeholder="E-mail" id='email' onChange={add_to_state} />
            <div className='form_buttons row'>
                <button className="cart_button opacity" type='submit'>
                    <FaUserPlus /><span>{t("reset")}</span>
                </button>
            </div>
        </Form>
    )
}