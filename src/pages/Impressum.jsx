import React from 'react'
import { useTranslation } from 'react-i18next';


export const Impressum = () => {

  const { t, i18n } = useTranslation();

  return (
    <div>
          <h1 className='imp_title'>{t("Impressum")}</h1>
          <p>{t("§5TMG")}</p>
          <p>Surname, Name</p>
          <p>Address</p>
          <p>PLZ</p>
          <p>{t("Contact")}</p>
          <p>{t("Telefone")}</p>
          <p>{t("E-Mail")}</p>
          <p>{t("Disclaimer")}</p>
    </div>
  )
}


// {t("")}