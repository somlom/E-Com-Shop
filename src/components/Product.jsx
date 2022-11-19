import React from 'react'
import { Link, useParams } from 'react-router-dom';

import "../css/Products.css"
import { usePostData } from '../hooks/Data';


export const Product = (props) => {

    const { response } = props;
    const { id } = useParams();

    if (!response) {

        const data = usePostData("http://" + process.env.PUBLIC_URL + "/products/", { id: id })

        return (
            <div className='product'>
                <h3>{data.name}</h3>
                <p>{data.text}</p>
                <p>{data.price}</p>
            </div>
        )

    } else {



        return (
            <div className='product'>
                <h3>{response.name}</h3>
                <p>{response.text}</p>
                <p>{response.price}</p>
                <Link to={`/product/${response.id}`} className="go_to_product">Buy</Link>
            </div>
            )
    }
}
