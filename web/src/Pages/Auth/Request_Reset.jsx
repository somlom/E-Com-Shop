import { useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import './Login.css'
import { Form, Email } from '../../Components/Other/Form/Form'
import { Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box'
import { Pay } from '../../Components/Other/Buttons/Pay/Pay'

const Request_Reset = () => {
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
                `${process.env.API_URL}/auth/request_reset`,
                input
            )

            toast.promise(api_response, {
                loading: t('loading'),
                success: t('check_your_email'),
                error: t('no_user_with_email'),
                // Sorry, but there is no user with this e-mail
            })
        } else {
            return toast.error(t('empty_fields'))
        }
    }

    return (
        <div className="responsible_form">
            <Form
                title={t('reset')}
                onChange={add_to_state}
                onSubmit={send_to_backend}
            >
                <Email
                    placeholder="E-mail"
                    id="email"
                    onChange={add_to_state}
                />
                <Row className="form_buttons">
                    <Pay onClick={send_to_backend}>{t('reset')}</Pay>
                </Row>
            </Form>
        </div>
    )
}

export default Request_Reset
