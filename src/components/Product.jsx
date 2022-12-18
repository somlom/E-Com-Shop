import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineArrowLeft } from "react-icons/ai"

import "../css/Products.scss"
import { useGetData } from '../hooks/Data';
import { set_to_cart } from '../features/cart/cart_slice';


export const Product = () => {

    const { id } = useParams();

    const { value, Spinner } = useGetData("http://" + process.env.PUBLIC_URL + "/products/" + id)
    const dispatch = useDispatch();

    return (
        value.length === 0 ? <Spinner /> :
            <div className='column'>
                <div className='product_title row'>
                    <Link to="/"><AiOutlineArrowLeft size={35} /></Link>
                    <h1>{value.name}</h1>
                </div>
                <div className='product_on_page' >
                    <img src={`http://${process.env.PUBLIC_URL}/img/${value.photos[0]}`}></img>
                    <div className='buy column'>
                        <p>{value.text}</p>
                        <div className='buy_row'>
                            <h3>{value.price}</h3>
                            <button className='add_to_cart_button' type='button'>Buy now</button>
                            <button className='add_to_cart_button' type='button' onClick={() => { dispatch(set_to_cart({_id: value._id})) }}>Add to cart</button>
                        </div>
                    </div>
                </div >
            </div>
    )

}
