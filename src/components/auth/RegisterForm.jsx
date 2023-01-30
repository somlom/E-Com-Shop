import React, { useState } from 'react'
import axios from 'axios';
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import "../other/Form/Form.css"
import Form from "../other/Form/Form"


export const RegisterForm = () => {
    const [input, setInput] = useState({});
    const [t] = useTranslation();

    const add_to_state = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = async (event) => {

        event.preventDefault()

        if (Object.keys(input).length >= 1) {
            const api_response = await axios.post(`${process.env.API_URL}/auth/register`, input).then((fulfilled) => {
                localStorage.setItem("user", fulfilled.data)
                return <Navigate to="/" />
            },
            )
            toast.promise(api_response, {
                loading: 'Loading',
                success: 'Logged in',
                error: (err) => err.response.data.message,
            });
        } else {
            return toast.error("Error!!! Empty fields")
        }
    }

    return (
        <Form title={t("register")} onChange={add_to_state} onSubmit={(e) => send_to_backend(e)} >
            <input type="text" placeholder={t("name")} id='name' onChange={add_to_state} />
            <input type="text" placeholder={t("surname")} id='surname' onChange={add_to_state} />
            <input type="email" placeholder="E-mail" id='email' onChange={add_to_state} />
            <input type="password" placeholder={t("password")} id='password' onChange={add_to_state} autoComplete="current-password" />
            <input type="password" placeholder={t("password_again")} id='password2' onChange={add_to_state} autoComplete="current-password" />
            <div className='form_buttons row'>
                <button className="button_opacity opacity primary" type='submit'>
                    <FaUserPlus />{t("register")}
                </button>
            </div>
        </Form>
    )
}