import React from 'react'
import { useTranslation } from 'react-i18next';

import { Products } from './Products'
import { Layout } from './Layout'


export const Main = () => {

  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1 className='title'>{t("main_page")}</h1>
      <Products />
      {/* <p>{t("lorem")}</p> */}
    </div>
  )
}