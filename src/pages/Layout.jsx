import React from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Navigation } from '../components/Navigation'
import { Spinner } from '../components/Spinner'
import "../css/Layout.scss"


export const Layout = (props) => {

    return (
        <React.Suspense fallback={<Spinner />}>
            <div className='layout column'>
                <Navigation />
                <div className='content'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </React.Suspense>
    )
}