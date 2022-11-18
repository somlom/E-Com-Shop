import React from 'react'

import "../css/Products.css"


export const Product = (props) => {

    const { response } = props;

    // (obj) => {
    //     // console.log(obj)
    //     <div>
    // <h3>{obj.name}</h3>
    // <p>{obj.text}</p>
    // <p>{obj.price}</p>
    //     </div>
    // }
    return (

        response.map((function (obj, i) {
            return (
                <div className='product'>
                    <h3 key={i + 100}>{obj.name}</h3>
                    <p key={i + 200}>{obj.text}</p>
                    <p key={i + 300}>{obj.price}</p>
                </div>
            )
        }))


    )
}
