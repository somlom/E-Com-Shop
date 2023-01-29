import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import { Footer } from './Footer/Footer'
import { Navigation } from './Navigation/Navigation'
import { Spinner } from '../other/Spinner/Spinner';
import "./Layout.css"


export const Layout = () => {

    return (
        <Suspense fallback={<Spinner />}>
            <Toaster />
            <div className='layout column'>
                <Navigation />
                <div className='content'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </Suspense>
    )
}