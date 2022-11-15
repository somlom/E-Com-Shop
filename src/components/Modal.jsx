import React from 'react'

import "../css/Modal.css"


export const Modal = ({ children, handle_modal }) => {

    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                console.log('Close')
                handle_modal(false)
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div className='fade_layer'>
            <div className='centered'>
                <div className='modal'>
                    <div className='modal_title'>
                        <p>Action required</p>
                        <button className="close_button button" onClick={() => handle_modal(false)}>&#x2715;</button>
                    </div>
                    <div className='modal_content'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
