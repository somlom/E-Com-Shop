import React from 'react'

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
                        <button className="close_button button" onClick={() => handle_modal(false)}>x</button>
                        <h1>Login</h1>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
