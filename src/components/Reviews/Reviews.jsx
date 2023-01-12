import React from 'react'

import "./Reviews.css"


export const Reviews = ({ data }) => {

    const isEmpty = data.length === 0 ? true : false

    if (isEmpty) {
        return <h1>Leave here first review!</h1>
    } else {

        return (
            <div className='reviews row'>
                <div className='column'>

                </div>
                <div className='column'>
                    <h2>dfsdfsdfdsfds</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae incidunt consequuntur ab tempora eaque. Culpa tempora hic rem quasi doloribus eveniet odio quos earum, totam placeat nulla assumenda molestias cupiditate?</p>
                </div>
            </div>
        )
    }
}
