import React from 'react'
import { Routes, Route } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import "../css/App.scss"
import { Main } from './Main'
import { Login, Register, Reset } from './Auth';
import { PageNotFound } from './PageNotFound';
import { Layout } from './Layout';
import { Products } from './Products';
import { FAQ } from './FAQ';
import { Impressum } from './Impressum';
import { Customer_Rights } from './Customer_Rights';
import { Support } from './Support';
import { Product } from '../components/Product';
import { Account } from './Account';
import { ProtectedRoute } from '../hooks/Auth';
import { Order } from './Order';
import { Address, Payment } from '../components/Order_Components';
import { MyOrders } from './MyOrders';
import { Admin, Admin_Edit } from './Admin';


export default function App() {

  const stripePromise = loadStripe(process.env.PUBLISHABLE_API);

  const options = {
    clientSecret: process.env.STRIPE_API,
  };

  return (
    <Layout>
      <Routes>

        <Route index element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="order" element={<Order />} />

        <Route element={<ProtectedRoute />} >

          <Route path="account" element={<Account />}>
            <Route path="orders" element={<MyOrders />} />
          </Route>

          <Route path="order/address" element={<Address />} />

          <Route element={<Elements stripe={stripePromise} options={options} />}>
            <Route path='order/payment' element={<Payment />} />
          </Route>

        </Route>


        <Route path='faq' element={<FAQ />} />
        <Route path='impressum' element={<Impressum />} />
        <Route path='customer_rights' element={<Customer_Rights />} />
        <Route path='support' element={<Support />} />

        <Route path="admin" element={<Admin />} />
        <Route path="admin/:id" element={<Admin_Edit />} />

        <Route path="/*" element={<PageNotFound />} />

      </Routes>
    </Layout >
  )
}
