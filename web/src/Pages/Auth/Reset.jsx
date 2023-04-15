import { useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import './Login.css'
import { Form, Password } from '../../Components/Other/Form/Form'
import { Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box'
import { Pay } from '../../Components/Other/Buttons/Pay/Pay'

const Reset = () => {
    const token = new URLSearchParams(window.location.search).get('token')

    const [input, setInput] = useState({})
    const [t] = useTranslation()

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
                `${process.env.API_URL}/auth/reset/${token}`,
                input
            )

            toast.promise(api_response, {
                loading: t('loading'),
                success: t('reset'),
                error: (err) => err.message,
            })
        } else {
            return toast.error(t('empty_fields'))
        }
    }

    return (
        <div className="responsible_form">
            <Form title={t('reset')} onChange={add_to_state}>
                <Password
                    placeholder="password"
                    id="password"
                    onChange={add_to_state}
                />
                <Password
                    placeholder="password2"
                    id="password2"
                    onChange={add_to_state}
                />
                <Row className="form_buttons">
                    <Pay onClick={send_to_backend}>{t('reset')}</Pay>
                </Row>
            </Form>
        </div>
    )
}

export default Reset
