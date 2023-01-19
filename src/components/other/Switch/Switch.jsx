import React from 'react'

import "./Switch.css"


export const Switch = ({ first, second, children }) => {

    const [clicked, setClick] = React.useState(false)

    return (
        <div>
            <div className='switch row' onClick={() => setClick(!clicked)}>
                <span className={clicked === false ? "show" : "hide"}>{first}</span>
                <span className={clicked === true ? "show" : "hide"}>{second}</span>
            </div>
            {!clicked && children[0]}
            {clicked && children[1]}
        </div>
    )
}
