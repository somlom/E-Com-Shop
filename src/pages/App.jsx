import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import "../css/App.css"
import { Main } from './Main'
import { Auth, Register, Reset } from './Auth';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      {/* <Route path="/*" element={<Navigate to="/"/>} /> */}
    </Routes>
  )
}
