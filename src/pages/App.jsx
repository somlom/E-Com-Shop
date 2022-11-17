import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import "../css/App.css"
import { Main } from './Main'
import { Auth, Register, Reset } from './Auth';
import { PageNotFound } from './PageNotFound';
import { Layout } from './Layout';


export default function App() {
  return (
    <Layout>
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />

        <Route path="/*" element={<PageNotFound />} />
      </Routes>

    </Layout>
  )
}
