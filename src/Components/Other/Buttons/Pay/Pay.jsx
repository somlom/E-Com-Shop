import React from 'react'
import { Link } from 'react-router-dom'

import "./Pay.css"


export const Pay = (props) => {
    return (
        <Link className="pay_button opacity" {...props}>{props.children}</Link>
    )
}
