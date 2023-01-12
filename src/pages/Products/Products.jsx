import React from 'react'
import process from 'process';
import { Link } from 'react-router-dom';

import { useGetData } from '../../hooks/Data'
import "./Products.css"


export const Products = ({query}) => {

    const { value, Spinner } = useGetData(`http://${process.env.PUBLIC_URL}/products`);

    return (
        value.length === 0 ? <Spinner /> :
            <div className='products row'>
                {value.map(obj => {
                    return (
                        <Link key={obj._id} to={`/products/${obj._id}`} className="go_to_product">
                            <div className='product'>
                                <div className='layer'>
                                    <span>{obj.price}</span>
                                    <div className='product_footer'>
                                        <h3>{obj.name}</h3>
                                    </div>
                                </div>
                                <img src={`http://${process.env.PUBLIC_URL}/img/${obj.photos[0]}`}></img>
                            </div>
                        </Link>
                    )
                })}
            </div>

    )
}