import { useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import './Login.css'
import { Form, Email, Password } from '../../Components/Other/Form/Form'
import { Column } from '../../Components/Other/Structure/Flex-Box/Flex-Box'
import { Pay } from '../../Components/Other/Buttons/Pay/Pay'

const Login = () => {
    const navigate = useNavigate()
    const [t] = useTranslation()
    const { state } = useLocation()

    const [input, setInput] = useState({})

    const add_to_state = (event) => {
        return setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = (event) => {
        event.preventDefault()

        if (Object.keys(input).length >= 1) {
            const api_response = axios.post(
                `${process.env.API_URL}/auth/login`,
                input
            )

            api_response
                .then((fulfilled) => {
                    localStorage.setItem('user', fulfilled.data)
                    const next = state?.next
                    if (next !== undefined) {
                        return navigate(next)
                    } else {
                        return navigate('/')
                    }
                })
                .catch(() => null)
            toast.promise(api_response, {
                loading: t('loading'),
                success: t('logged_in'),
                error: (err) => t(err.message),
            })
        } else {
            return toast.error(t('empty_fields'))
        }
    }

    return (
        <div className="responsible_form">
            {state?.message && <h3>{state.message}</h3>}
            <Form
                title={t('login')}
                onChange={add_to_state}
                onSubmit={send_to_backend}
            >
                <Email
                    placeholder="E-mail"
                    id="email"
                    onChange={add_to_state}
                />
                <Password
                    placeholder={t('password')}
                    autoComplete="current-password"
                    id="password"
                    onChange={add_to_state}
                />
                <Link to="/request_reset">{t('forgot_password')}</Link>
                <Column className="form_buttons">
                    <Pay onClick={send_to_backend}>{t('login')}</Pay>
                    <Link to="/register">{t('register')}</Link>
                </Column>
            </Form>
        </div>
    )
}

export default Login
