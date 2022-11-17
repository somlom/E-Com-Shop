import React from 'react'
import { FaUserPlus } from "react-icons/fa"
import { Link } from 'react-router-dom';
import { Form } from '../components/Form';

import "../css/Form.css"


export const Auth = () => {

    const [input, setInput] = React.useState({});

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
        <Form title="Login" onChange={add_to_state} onSubmit={send_to_backend}>
            <input type="email" placeholder="Email" id='email' onChange={add_to_state} />
            <input type="password" placeholder="Password" id='password' onChange={add_to_state} />
            <div className='form_buttons'>
                <button className="login_button opacity" type='submit'><span><FaUserPlus /></span>Login</button>
                <button className="no_acc_button" type='button'><span><FaUserPlus /></span>Don't have an account? Register!</button>
            </div>
        </Form>
    )
}

export const Register = () => {
    const [input, setInput] = React.useState({});

    const add_to_state = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const send_to_backend = () => {
        return alert("email: " + input.email + " password: " + input.password)
    }

    return (
        <div>
            <div className='form_content'>
                <h3 className='form_title'>Register</h3>
                <form onSubmit={send_to_backend} className="form">
                    <input type="email" placeholder="Email" id='email' onChange={add_to_state} />
                    <input type="password" placeholder="Password" id='password' onChange={add_to_state} />
                    <input type="password" placeholder="Password again" id='password2' onChange={add_to_state} />
                    <button className="login_button opacity" type='submit'><span><FaUserPlus /></span>Register</button>
                </form>
            </div>
        </div>
    )
}


export const Reset = () => {
    const [input, setInput] = React.useState({});

    const add_to_state = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const send_to_backend = () => {
        return alert("email: " + input.email + " password: " + input.password)
    }

    return (
        <div>
            <div className='form_content'>
                <h3 className='form_title'>Reset your password</h3>
                <form onSubmit={send_to_backend} className="form">
                    <input type="email" placeholder="Email please" id='email' onChange={add_to_state} />
                    <button className="login_button opacity" type='submit'><span><FaUserPlus /></span>Register</button>
                </form>
            </div>
        </div>
    )
}