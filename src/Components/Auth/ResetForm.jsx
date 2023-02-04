import React, { useState } from 'react'
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';

import "../Other/Form/Form.css"
import { Form } from "../Other/Form/Form"


export const ResetForm = () => {
    const [input, setInput] = useState({});
    const [t] = useTranslation();

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
        <Form title={t("reset")} onChange={add_to_state} onSubmit={send_to_backend} >
            <input type="email" placeholder="E-mail" id='email' onChange={add_to_state} />
            <div className='form_buttons row'>
                <button className="button_opacity opacity primary" type='submit'>
                    <FaUserPlus />{t("reset")}
                </button>
            </div>
        </Form>
    )
}