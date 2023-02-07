import React, { useState } from 'react'
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';

import { Form, Input } from "../Other/Form/Form"
import { Button } from '../Other/Buttons/Standart';
import { Row } from '../Other/Structure/Flex-Box/Flex-Box';


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
            <Input.Email placeholder="E-mail" id='email' onChange={add_to_state} />
            <Row className='form_buttons'>
                <Button.Primary type='submit'>
                    <FaUserPlus />{t("reset")}
                </Button.Primary>
            </Row>
        </Form>
    )
}