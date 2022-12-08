import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import "../css/App.css"
import { Main } from './Main'
import { Auth, Register, Reset } from './Auth';
import { PageNotFound } from './PageNotFound';
import { Layout } from './Layout';
import { Products } from './Products';
import { FAQ } from './FAQ';
import { Impressum } from './Impressum';
import { Customer_Rights } from './Customer_Rights';
import { Support } from './Support';
import { Product } from '../components/Product';


export default function App() {
  return (
    <Layout>

        <Routes>


          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          {/* <Route path="/redux" element={<Cart />} /> */}

          <Route path='/faq' element={<FAQ />} />
          <Route path='/impressum' element={<Impressum />} />
          <Route path='/customer_rights' element={<Customer_Rights />} />
          <Route path='/support' element={<Support />} />

          <Route path="/*" element={<PageNotFound />} />


        </Routes>

    </Layout>
  )
}
