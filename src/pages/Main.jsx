import React from 'react'
import { useTranslation } from 'react-i18next';

import { Products } from './Products'
import { Layout } from './Layout'


export const Main = () => {

  const { t, i18n } = useTranslation();
  const [count, setCounter] = React.useState(0);

  const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  };

  return (
    <div>
      <h1 className='title'>{t("main_page")}</h1>
      {Object.keys(lngs).map((lng) => (
        <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" className='lang_button' onClick={() => {
          i18n.changeLanguage(lng);
          setCounter(count + 1);
        }}>
          {lngs[lng].nativeName}
        </button>
      ))}
      <Products />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolor veritatis molestiae et quidem aut? Repellat iure consectetur minima, rerum quaerat nemo esse laudantium, veniam repudiandae amet possimus nihil molestias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ab omnis sed. Voluptatem, voluptatibus repellendus enim, eligendi omnis sint, sed officiis cum earum perferendis nisi doloremque hic veritatis fuga reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, natus necessitatibus ex nemo tenetur reiciendis sapiente tempora recusandae harum, iure consectetur eius in cumque qui magni, nesciunt voluptatum porro dolorem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ullam porro eos quasi nostrum. Unde maxime architecto eum incidunt corporis illo obcaecati. Iusto consectetur quam deserunt sequi corrupti, quae maiores! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium soluta atque id fuga iusto rem quidem vitae temporibus quos, quia debitis quo! Deserunt quibusdam dignissimos ipsa blanditiis cumque repellat voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis corporis dignissimos at eum aut adipisci suscipit repellendus facere iure, maiores unde libero incidunt natus doloribus provident numquam vel commodi. Ipsa!</p>
    </div>
  )
}
