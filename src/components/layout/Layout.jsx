import React from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from './Footer/Footer'
import { Navigation } from './Navigation/Navigation'
import { Spinner } from '../other/Spinner'
import "./Layout.scss"


export const Layout = () => {

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