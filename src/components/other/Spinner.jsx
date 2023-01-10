import React from 'react'

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
