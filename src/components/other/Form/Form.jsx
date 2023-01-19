import React from 'react'


export const Form = ({ title, onSubmit, children } ) => {

    return (
        <div className='form_content column'>
            <h3 className='form_title'>{title}</h3>
            <form className="form column" onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}