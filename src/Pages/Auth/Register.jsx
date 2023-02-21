import { useState } from 'react'
import axios from 'axios';
import { FaUserPlus } from "react-icons/fa"
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import "./Login.css"
import { Form, Text, Email, Password } from '../../Components/Other/Form/Form';
import { Button } from '../../Components/Other/Buttons/Standart';
import { Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box';


const Register = () => {

    const navigate = useNavigate()
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

            const api_response = axios.post(`${process.env.API_URL}/auth/register`, input)

            api_response
                .then((fulfilled) => {
                    localStorage.setItem("user", fulfilled.data)
                    return navigate("/")
                })
                .catch(() => null)

            toast.promise(api_response, {
                loading: t("loading"),
                success: t("registered"),
                error: (err) => t(err.message),
            });
        } else {
            return toast.error(t("empty_fields"))
        }
    }

    return (
        <div className="responsible_form">

            <Form title={t("register")} onSubmit={(e) => send_to_backend(e)} >
                <Text placeholder={t("name")} id='name' onChange={add_to_state} />
                <Text placeholder={t("surname")} id='surname' onChange={add_to_state} />
                <Email placeholder="E-mail" id='email' onChange={add_to_state} />
                <Password placeholder={t("password")} id='password' onChange={add_to_state} />
                <Password placeholder={t("password_again")} id='password2' onChange={add_to_state} />
                <Row className='form_buttons'>
                    <Button.Success type='submit'>
                        <FaUserPlus size={15} />{t("register")}
                    </Button.Success>
                    <Link to="/login">
                        <Button.Primary type='button'>
                            <FaUserPlus size={15} />{t("already_registered")}
                        </Button.Primary>
                    </Link>
                </Row>
            </Form>
            <span>{t("agb_text")}</span>
        </div>
    )
}

export default Register 