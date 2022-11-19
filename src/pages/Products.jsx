import React from 'react'

import { Product } from '../components/Product';
import { useGetData } from '../hooks/Data'
import "../css/Products.css"
import process from 'process';


export const Products = () => {

    console.log(process.env)

    const response = useGetData(`http://${process.env.PUBLIC_URL}/products`);

    return (
        <div className='products'>
            {
                (response !== false && response.length != 0) ?
                        <Product response={response} key={response.length} />
                    :
                    <p>spin</p>
            }


        </div>
    )
}
