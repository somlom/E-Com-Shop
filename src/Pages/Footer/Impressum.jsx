import React from 'react'
import { useTranslation } from 'react-i18next';


const Impressum = () => {

  const [t] = useTranslation();

  return (
    <div>
      <h1>{t("Impressum")}</h1>
      <p>{t("§5TMG")}</p>
      <p>Surname, Name</p>
      <p>Address</p>
      <p>PLZ</p>
      <p>{t("Contact")}</p>
      <p>{t("Telefone")}</p>
      <p>{t("E-Mail")}</p>
      <p>{t("Disclaimer")}</p>
      <a href={`${process.env.API_URL}/download/agb`}>AGB</a>
    </div>
  )
}

export default Impressum