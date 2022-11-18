import React from 'react'

import { Product } from '../components/Product';
import { useGetData } from '../hooks/Data'
import "../css/Products.css"


export const Products = () => {

    const response = useGetData("http://localhost:4000/products");

    return (
        <div className='products'>
            {
                (response !== false && response.length != 0) ?
                    <Product response={response} key={9999999} />
                    :
                    <p>spin</p>
            }
        </div>
    )
}
