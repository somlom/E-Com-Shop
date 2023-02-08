import React from 'react'
import { Link } from 'react-router-dom';

import { useGetData } from '../../hooks/Data'
import "./Products.css"
import { Spinner } from '../../Components/Other/Spinner/Spinner';
import { Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box';


const Products = () => {

    const { isLoading, isSuccess, isError, data } = useGetData(`/products`);

    if (isLoading) {
        return <Spinner />
    } else if (isError) {
        return <h1>Sorry, error</h1>
    } else if (isSuccess && data) {
        return (
            <Row className='products'>
                {data.map(obj => {
                    return (
                        <Link key={obj._id} to={`/products/${obj._id}`} className="go_to_product">
                            <div className='product'>
                                <div className='mask'>
                                    <span>{obj.price} &euro;</span>
                                    <div className='mask_footer'>
                                        <h3>{obj.name}</h3>
                                    </div>
                                </div>
                                <img src={process.env.API_URL + "/img/" + obj.photos[0]} alt="aa"></img>
                            </div>
                        </Link>
                    )
                })}
            </Row>
        )
    }
}

export default Products