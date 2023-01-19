import React from 'react'
import { Link } from 'react-router-dom'
import { CgSmileSad } from "react-icons/cg"

import "./Error_404.css"


export const Error_404 = () => {
    return (
        <div id='error'>
            <div className='error_title'>
                    <CgSmileSad size={40}/>
                    <h1 className='title'>404 Error</h1>
            </div>

            <p>Sorry</p>
            <Link to={"/"}>Zuück zur Homepage</Link>
        </div>
    )
}