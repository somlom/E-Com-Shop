import React from 'react'


export const Form = (props) => {

    const { title, onSubmit, children } = props;

    return (
        <div className='form_content column'>
            <h3 className='form_title'>{title}</h3>
            <form className='form column' onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}