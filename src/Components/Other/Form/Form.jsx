import React from 'react'

import "./Form.css"


export const Form = ({ title, onSubmit, children }) => {

    return (
        <div className='form_content column'>
            <h3 className='form_title'>{title}</h3>
            <form className="form column" onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}

const Email = (props) => {
    return (
        <input type="email" {...props} />
    )
}

const Password = (props) => {
    return (
        <input type="password" autoComplete="current-password" {...props} />
    )
}

const Text = (props) => {
    return (
        <input type="text" {...props} />
    )
}

const Number = (props) => {
    return (
        <input type="number" {...props} />
    )
}

export const Input = {
    Email: Email,
    Password: Password,
    Text: Text,
    Number: Number
}
