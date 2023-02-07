import React, { useState } from 'react'
import { Row } from '../../Structure/Flex-Box/Flex-Box'

import "./Switch.css"


export const Switch = ({ first, second, children }) => {

    const [clicked, setClick] = useState(false)

    return (
        <>
            <Row className='switch'>
                <span className={clicked === false ? "show" : "hide"} onClick={() => setClick(!clicked)}>{first}</span>
                <span className={clicked === true ? "show" : "hide"} onClick={() => setClick(!clicked)}>{second}</span>
            </Row>
            {!clicked && children[0]}
            {clicked && children[1]}
        </>
    )
}
