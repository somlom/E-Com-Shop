import React, { Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next';
import { Spinner } from '../components/other/Spinner/Spinner';

// import Products from './Products/Products'
const Products = lazy(() => import("./Products/Products"));

const Main = () => {

  const [t] = useTranslation();

  return (
    <Suspense fallback={<Spinner />}>
      <h1 className='title'>{t('welcome')}</h1>
      <Products />
    </Suspense>
  )
}

export default Main