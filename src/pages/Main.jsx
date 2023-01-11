import React from 'react'
import { useTranslation } from 'react-i18next';

import { Products } from './Products/Products'


export const Main = () => {

  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1 className='title'>{t('welcome')}</h1>
      <Products />
    </div>
  )
}