import React from 'react'

import "./Standart.css"


const Success = (props) => {
    return (
        <button className="button_opacity opacity green" {...props}>{props.children}</button>
    )
}

const Primary = (props) => {
    return (
        <button className="button_opacity opacity primary" {...props}>{props.children}</button>
    )
}

export const Button = {
    Primary: Primary,
    Success: Success
}