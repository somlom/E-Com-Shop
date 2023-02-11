import React, { useState } from 'react'
import axios from 'axios';
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import "./Login.css"
import { Form, Input } from '../../Components/Other/Form/Form';
import { Button } from '../../Components/Other/Buttons/Standart';
import { Column, Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box';


const Login = () => {

    const navigate = useNavigate()
    const [t] = useTranslation();
    const { state } = useLocation();

    const [input, setInput] = useState({});

    const add_to_state = (event) => {
        return setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = (event) => {
        event.preventDefault()

        if (Object.keys(input).length >= 1) {

            const api_response = axios.post(`${process.env.API_URL}/auth/login`, input)

            api_response.then((fulfilled) => {
                localStorage.setItem("user", fulfilled.data)
                const next = state?.next
                if (next !== undefined) {
                    return navigate(next.toString())
                } else {
                    return navigate("/")
                }
            },
            )
            toast.promise(api_response, {
                loading: t("loading"),
                success: t("logged_in"),
                error: (err) => err.message,
            });
        } else {
            return toast.error(t("empty_fields"))
        }
    }

    return (
        <div className="responsible_form">
            {state?.message !== undefined ? <h3>{state.message}</h3> : ""}
            <Form title={t("login")} onChange={add_to_state} onSubmit={send_to_backend}>
                <Input.Email placeholder="E-mail" id='email' onChange={add_to_state} />
                <Input.Password placeholder={t("password")} id='password' onChange={add_to_state} />
                <Column>
                <Link to="/request_reset">{t("forgot_password")}</Link>
                    <Row className='form_buttons'>

                        <Button.Primary type='submit'>
                            <FaUserPlus size={15} />{t("login")}
                        </Button.Primary>

                        <Link to="/register">
                            <Button.Success type='button'>
                                <FaUserPlus size={15} />{t("dont_have_an_account")}
                            </Button.Success>
                        </Link>

                    </Row>
                </Column>
            </Form>
        </div>
    )
}


export default Login