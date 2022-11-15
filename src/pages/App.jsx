import React from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { Layout } from './Layout'
import "../css/App.css"
import { Main } from './Main'
import { Login, Register, Reset } from './Auth';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
    </Routes>
  )
}
