import React from 'react'

export const Modal = ({ children, handle_modal }) => {

    return (
        <div className='darkBG'>
            <div className='centered'>
                <div className='modal'>
                    <button className="closeBtn" onClick={() => handle_modal(false)}>x</button>
                    {children}
                </div>
            </div>
        </div>
    )
}
