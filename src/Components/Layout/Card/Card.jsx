import React from 'react'

import "./Card.css"


export const Card = (props) => {
    return (
        <div className='card_layout' {...props}>
            {props.children}
        </div>
    )
}
