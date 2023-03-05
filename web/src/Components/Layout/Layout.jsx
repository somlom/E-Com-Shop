import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import "./Layout.css"
import { Navigation } from './Navigation/Navigation'
import { Spinner } from '../Other/Spinner/Spinner';
import { Column } from '../Other/Structure/Flex-Box/Flex-Box';


const Footer = lazy(() => import("./Footer/Footer"));

export const Layout = () => {

    return (
        <Suspense fallback={<Spinner />}>
            <Toaster />
            <Column className='layout'>
                <Navigation />
                <Column className='content'>
                    <Outlet />
                </Column>
                <Footer />
            </Column>
        </Suspense>
    )
}