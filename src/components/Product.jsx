import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import "../css/Products.css"
import { usePostData } from '../hooks/Data';
import { add_to_cart, selectCount } from '../features/cart/cart_slice';


export const Product = (props) => {

    const { response } = props;
    const { id } = useParams();

    if (!response) {

        const data = usePostData("http://" + process.env.PUBLIC_URL + "/products/", { id: id })
        const count = useSelector(selectCount);
        const dispatch = useDispatch();

        return (
            <div className='product'>
                <h3>{data.name}</h3>
                <p>{data.text}</p>
                <p>{data.price}</p>
                <button type='button' onClick={() => dispatch(add_to_cart(Number(count+1)))}>Add to cart</button>
            </div>
        )

    } else {



        return (
            <div className='product'>
                <h3>{response.name}</h3>
                <p>{response.text}</p>
                <p>{response.price}</p>
                <Link to={`/products/${response.id}`} className="go_to_product">Buy</Link>
            </div>
            )
    }
}
