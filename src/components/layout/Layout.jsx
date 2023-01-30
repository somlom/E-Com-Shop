import React, { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import { Navigation } from './Navigation/Navigation'
import { Spinner } from '../other/Spinner/Spinner';
import "./Layout.css"

const Footer = lazy(() => import("./Footer/Footer"));

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