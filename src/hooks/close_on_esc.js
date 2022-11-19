import React from 'react'

export const close_on_esc = (handle_modal) => {
    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                handle_modal(false);
            };
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

}

