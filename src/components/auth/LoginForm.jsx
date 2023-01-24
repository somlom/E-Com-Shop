import React from 'react'
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { Form } from '../other/Form/Form';
import "../other/Form/Form.css"


export const LoginForm = () => {

    const navigate = useNavigate()

    const { state } = useLocation();

    const [input, setInput] = React.useState({});

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

            await axios.post(`${process.env.API_URL}/auth/login`, input).then(

                async function (fulfilled) {
                    localStorage.setItem("user", fulfilled.data)
                    const next = state?.next
                    if (next !== undefined) {
                        return navigate(next.toString())
                    } else {
                        return navigate("/")
                    }
                },
                function (error) {
                    return alert(error.response.data.message)
                }
            )
        } else {
            return alert("Error!!! Empty fields")
        }
    }

    return (
        <>
            {state?.message !== undefined ? <h1>{state.message}</h1> : ""}
            <Form title={t("login")} onChange={add_to_state} onSubmit={send_to_backend}>
                <input type="email" placeholder="E-mail" id='email' onChange={add_to_state} />
                <input type="password" placeholder={t("password")} id='password' onChange={add_to_state} />
                <div className='form_buttons row'>
                    <button className="button_opacity opacity primary" type='submit'>
                        <FaUserPlus size={15} />{t("login")}
                    </button>
                    <Link to="/register">
                        <button className="button_opacity opacity green" type='button'>
                            <FaUserPlus size={15} />{t("dont_have_an_account")}
                        </button>
                    </Link>
                </div>
            </Form>
        </>
    )
}