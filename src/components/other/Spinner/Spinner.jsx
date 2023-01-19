import React from 'react'

import "./Spinner.css"


export const Spinner = (props) => {
    const text = props.text
    return (
        <div className="prepair_spinner">
            <div className="spinner">
                {text}
            </div>
        </div>
    )
}
