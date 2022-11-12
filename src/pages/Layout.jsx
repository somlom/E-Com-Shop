import React from 'react'

import { Footer } from '../components/Footer'
import { Navigation } from '../components/Navigation'
import "../css/Layout.css"


export const Layout = (props) => {
    const { children } = props;
    return (
        <div className='layout'>
            <Navigation />
            <div className='content'>
                {children}
            </div>
            <Footer />
        </div>
    )
}
