import React from 'react'

import { Footer } from '../components/Footer'
import { Navigation } from '../components/Navigation'
import { Spinner } from '../components/Spinner'
import "../css/Layout.scss"


export const Layout = (props) => {
    const { children } = props;
    return (
        <React.Suspense fallback={<Spinner />}>
            <div className='layout column'>
                <Navigation />
                <div className='content'>
                    {children}
                </div>
                <Footer />
            </div>
        </React.Suspense>
    )
}