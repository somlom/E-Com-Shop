import React from 'react'
// import process from 'process';
import { Link } from 'react-router-dom';

import { useGetData } from '../../hooks/Data'
import "./Products.css"
import { Spinner } from '../../components/other/Spinner/Spinner';


const Products = () => {

    const { isLoading, isSuccess, isError, data } = useGetData(`/products`);

    if (isLoading) {
        return <Spinner />
    } else if (isError) {
        return <h1>Sorry, error</h1>
    } else if (isSuccess && data) {
        return (
            <div className='products row'>
                {data.map(obj => {
                    return (
                        <Link key={obj._id} to={`/products/${obj._id}`} className="go_to_product">
                            <div className='product'>
                                <div className='layer'>
                                    <span>{obj.price}</span>
                                    <div className='product_footer'>
                                        <h3>{obj.name}</h3>
                                    </div>
                                </div>
                                <img src={`${process.env.API_URL}/img/${obj.photos[0]}`}></img>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }
}

export default Products