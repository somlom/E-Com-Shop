import React from 'react'
import { Column } from '../Structure/Flex-Box/Flex-Box'

import "./Form.css"


export const Form = ({ title, onSubmit, children }) => {

    return (
        <Column className='form_content'>
            <h3 className='form_title'>{title}</h3>
            <form className="form column" onSubmit={onSubmit}>
                {children}
            </form>
        </Column>
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

const Textarea = (props) => {

    const { onChange, onSubmit, cols, rows, children } = props

    return (
        <textarea onChange={onChange} onSubmit={onSubmit} cols={cols} rows={rows} {...props}>
            {children}
        </textarea>
    )
}

export const Input = {
    Email: Email,
    Password: Password,
    Text: Text,
    Number: Number,
    Textarea: Textarea
}
