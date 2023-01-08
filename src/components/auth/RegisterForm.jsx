import React from 'react'
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { Form } from "../Form";
"../../css/Form.scss"


export const RegisterForm = () => {
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
            await axios.post(`http://${process.env.PUBLIC_URL}/auth/register`, input).then(
                function (fulfilled) {
                    localStorage.setItem("user", fulfilled.data.token)
                    return alert(fulfilled.data.token)
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
        <Form title={t("register")} onChange={add_to_state} onSubmit={(e) => send_to_backend(e)} >
            <input type="text" placeholder={t("name")} id='name' onChange={add_to_state} />
            <input type="text" placeholder={t("surname")} id='surname' onChange={add_to_state} />
            <input type="email" placeholder="E-mail" id='email' onChange={add_to_state} />
            <input type="password" placeholder={t("password")} id='password' onChange={add_to_state} />
            <input type="password" placeholder={t("password_again")} id='password2' onChange={add_to_state} />
            <div className='form_buttons row'>
                <button className="button_opacity opacity primary" type='submit'>
                    <FaUserPlus /><span>{t("register")}</span>
                </button>
            </div>
        </Form>
    )
}