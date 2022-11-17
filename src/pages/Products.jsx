import React from 'react'

import { Product } from '../components/Product';
import { useGetData } from '../hooks/Data'
import "../css/Products.css"


export const Products = () => {

    const response = useGetData("http://localhost:4000/products");
    console.log(response)

    const elements = (
        (response !== false && response.length != 0) ?
            response.map((obj) => {
                <Product name={obj.name} />
            })
            :
            <p>spin</p>
    )

    return (
        <div className='products'>
            {
                (response !== false && response.length != 0) ?
                    <Product response={response} />
                    :
                    <p>spin</p>
            }
        </div>
    )
}
