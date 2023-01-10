import React from 'react'
import { Routes, Route } from "react-router-dom";

import "../css/App.scss"
import { Main } from './Main'
import { Login, Register, Reset } from './Auth';
import { PageNotFound } from './PageNotFound';
import { Layout } from '../components/layout/Layout';
import { Products } from './Products';
import { FAQ } from './FAQ';
import { Impressum } from './Impressum';
import { Customer_Rights } from './Customer_Rights';
import { Support } from './Support';
import { Product } from './Product';
import { Account } from './Account';
import { OnlyUnsignedRoute, ProtectedRoute } from '../hooks/Auth';
import { Order } from './Order';
import { MyOrders } from './MyOrders';
import { Admin, Admin_Edit } from './Admin';
import { Address } from './Address';
import { Payment } from '../components/order/Payment';
import { Spinner } from '../components/other/Spinner';


export default function App() {

  return (
    <Routes>

      <Route element={<Layout />}>

        <Route index element={<Main />} />

        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />

        <Route element={<OnlyUnsignedRoute />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<Reset />} />
        </Route>

        <Route element={<ProtectedRoute />} >

          <Route path="account" element={<Account />}>
            <Route path="orders" element={<MyOrders />} />
          </Route>

          <Route path="order" element={<Order />} />
          <Route path="/order/address" element={<Address />} />

          <Route path='order/payment' element={<Payment />} />

        </Route>


        <Route path='faq' element={<FAQ />} />
        <Route path='impressum' element={<Impressum />} />
        <Route path='customer_rights' element={<Customer_Rights />} />
        <Route path='support' element={<Support />} />

        <Route path="admin" element={<Admin />} />
        <Route path="admin/:id" element={<Admin_Edit />} />

        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}
