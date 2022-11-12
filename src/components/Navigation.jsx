import React, { Component } from 'react'
// import "../css/Navigation.css"

export const Navigation = () => {
  return (
    <div className='nav'>

      <div className='nav_column buttons'>
        <h1 className='nav_title'>Nav</h1>
        <a href='#'>test</a>
        <a href="#">mest</a>
        <a href="#">test</a>
        <a href="#">mest</a>
        <a href="#">test</a>
        <a href="#">mest</a>
      </div>

      <div className='nav_column login'>
        <button>login</button>
      </div>

    </div>
  )
}
