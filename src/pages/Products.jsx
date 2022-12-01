import React from 'react'

import { Product } from '../components/Product';
import { useGetData } from '../hooks/Data'
import "../css/Products.scss"
import process from 'process';


export const Products = () => {

    const {value, Spinner} = useGetData(`http://${process.env.PUBLIC_URL}/products`);

    return (
        <React.Suspense fallback={<Spinner />}>
            <div className='products'>
                {
                    (value !== false && value.length != 0) ?
                        value.map(obj => {
                            return (
                                <Product response={obj} key={obj._id} />
                            )
                        })
                        :
                        <Spinner />
                }


            </div>
        </React.Suspense>
    )
}
