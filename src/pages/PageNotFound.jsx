import React from 'react'
import { Link } from 'react-router-dom'

import { Main } from './Main'


export const PageNotFound = () => {
    return (
        <div>
            <h1 className='title'>¯\_(ツ)_/¯ PageNotFound</h1>
            <div className='items_content'>
                <h1 className='title'>Look at some new items</h1>
                <Main />
            </div>
        </div>
    )
}