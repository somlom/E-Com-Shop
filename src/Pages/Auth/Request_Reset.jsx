import React, { useState } from 'react'
import axios from 'axios';
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import "./Login.css"
import { Form, Input } from '../../Components/Other/Form/Form';
import { Button } from '../../Components/Other/Buttons/Standart';
import { Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box';


const Request_Reset = () => {
    const [input, setInput] = useState({});
    const [t] = useTranslation();

    const add_to_state = (event) => {
        return setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = (event) => {
        event.preventDefault()
        if (Object.keys(input).length >= 1) {

            const api_response = axios.post(`${process.env.API_URL}/auth/request_reset`, input)

            toast.promise(api_response, {
                loading: t("loading"),
                success: t("Check_your_email"),
                error: (err) => err.message,
            });
        } else {
            return toast.error(t("empty_fields"))
        }
    }

    return (
        <div className="responsible_form">
            <Form title={t("reset")} onChange={add_to_state} onSubmit={send_to_backend} >
                <Input.Email placeholder="E-mail" id='email' onChange={add_to_state} />
                <Row className='form_buttons'>
                    <Button.Primary type='submit'>
                        <FaUserPlus />{t("reset")}
                    </Button.Primary>
                </Row>
            </Form>
        </div>
    )
}

export default Request_Reset