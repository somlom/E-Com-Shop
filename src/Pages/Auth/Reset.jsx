import React, { useState } from 'react'
import axios from 'axios';
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link, useSearchParams,useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import "./Login.css"
import { Form, Password } from '../../Components/Other/Form/Form';
import { Button } from '../../Components/Other/Buttons/Standart';
import { Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box';


const Reset = () => {

    const token = new URLSearchParams(window.location.search).get("token")

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
            // setSearchParams("token")

            const api_response = axios.post(`${process.env.API_URL}/auth/reset/${token}`, input)

            toast.promise(api_response, {
                loading: t("loading"),
                success: t("reset"),
                error: (err) => err.message,
            });
        } else {
            return toast.error(t("empty_fields"))
        }
    }

    return (
        <div className="responsible_form">
            <Form title={t("reset")} onChange={add_to_state} onSubmit={send_to_backend} >
                <Password placeholder="password" id='password' onChange={add_to_state} />
                <Password placeholder="password2" id='password2' onChange={add_to_state} />
                <Row className='form_buttons'>
                    <Button.Primary type='submit'>
                        <FaUserPlus />{t("reset")}
                    </Button.Primary>
                </Row>
            </Form>
        </div>
    )
}

export default Reset