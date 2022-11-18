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
                <div className='product' key={i}>
                    <h3>{obj.name}</h3>
                    <p>{obj.text}</p>
                    <p>{obj.price}</p>
                </div>
            )
        }))


    )
}
