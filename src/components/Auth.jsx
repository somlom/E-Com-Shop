import React from 'react'

export const Login = () => {
    return (
        <div className='modal_content'>
            <form onSubmit={()=>alert("Submited!")}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="login_button button" type='submit'>Register</button>
            </form>
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
