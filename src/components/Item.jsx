import React from 'react'

export const Item = (props) => {

    const { title, img, price, text } = props;

  return (
    <div className='item'>
        <img href={img}></img>
        <h3>{title}</h3>
        <p>{text}</p>
        <p>{price}</p>
    </div>
  )
}
