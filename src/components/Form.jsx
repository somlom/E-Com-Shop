import React from 'react'
import axios from "axios"
import { FaUserPlus } from "react-icons/fa"
import { Link } from 'react-router-dom';


export const Form = (props) => {

    const { title, onSubmit, children } = props;

    return (
        <div className='form_content'>
            <h3 className='form_title'>{title}</h3>
            <form className='form' onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}