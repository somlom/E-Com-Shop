import React from 'react'
import { FaUserPlus } from "react-icons/fa"

import "../css/Form.css"


export const Login = () => {

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
                <h3 className='form_title'>Login</h3>
                <form onSubmit={send_to_backend} className="form">
                    <input type="email" placeholder="Email" id='email' onChange={add_to_state} />
                    <input type="password" placeholder="Password" id='password' onChange={add_to_state} />
                    <button className="login_button button" type='submit'><span><FaUserPlus /></span>Register</button>
                </form>
            </div>
        </div>
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
                    <button className="login_button button" type='submit'><span><FaUserPlus /></span>Register</button>
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
                    <button className="login_button button" type='submit'><span><FaUserPlus /></span>Register</button>
                </form>
            </div>
        </div>
    )
}