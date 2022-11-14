import React from 'react'
import {FaUserPlus} from "react-icons/fa"


export const Login = () => {

    const [input, setInput] = React.useState({});

    const call = () => {
        return alert("Submited!")
    }

    return (
        <div>
            <div className='modal_content'>
                <form onSubmit={call}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="login_button button" id="1" type='submit'><FaUserPlus/> Register</button>
                </form>
            </div>
        </div>
    )
}

export const Register = () => {
    return (
        <div>
            <div className='title'>
                <h1>Register</h1>
                <input type={email} placeholder="Email" />
                <input type={"text"} placeholder="Username" />
                <input type={"password"} placeholder="Password" />
                <a href="#">Login</a>
            </div>
        </div>
    )
}


export const Reset = () => {
    return (
        <div>
            <div className='title'>
                <h1>Reset password</h1>
                <input type={"email"} placeholder="Email" />
                <input type={"password"} placeholder="Password" />
            </div>
        </div>
    )
}
