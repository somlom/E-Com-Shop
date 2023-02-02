import React, { Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom";

import { Layout } from '../Components/Layout/Layout';
import { Product } from './Products/Product';
import { ProtectedRoute } from '../hooks/Auth';
import { Order } from './Order/Order';
import { Spinner } from '../Components/other/Spinner/Spinner';
import { MyOrders } from './Account/MyOrders';
import { Order_Guest } from './Order/Order_Guest';

const Main = lazy(() => import("./Main"));
const Products = lazy(() => import("./Products/Products"));
const Error_404 = lazy(() => import("./Error/Error_404"));

const Account = lazy(() => import("./Account/Account"));
const FAQ = lazy(() => import('./Footer/FAQ'));
const Impressum = lazy(() => import('./Footer/Impressum'));
const Customer_Rights = lazy(() => import('./Footer/Customer_Rights'));
const Support = lazy(() => import('./Footer/Support'));

const Login = lazy(() => import('./Auth/Login'));
const Register = lazy(() => import('./Auth/Register'));
const Reset = lazy(() => import('./Auth/Reset'));

const Admin = lazy(() => import('./Admin/Admin'));
const Admin_Edit = lazy(() => import('./Admin/Admin_Edit'));
const Admin_Add = lazy(() => import('./Admin/Admin_Add'));


export default function App() {

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>

        <Route exact element={<Layout />}>

          <Route index path="/" element={<Main />} />

          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<Reset />} />

          <Route element={<ProtectedRoute />} >

            <Route path="account" element={<Account />}>
              <Route path="orders" element={<MyOrders />} />
            </Route>

            <Route path="order" element={<Order />} />
            <Route path="pay_as_guest/:id" element={<Order_Guest />} />

          </Route>


          <Route path='faq' element={<FAQ />} />
          <Route path='impressum' element={<Impressum />} />
          <Route path='customer_rights' element={<Customer_Rights />} />
          <Route path='support' element={<Support />} />

          <Route path="admin" element={<Admin />} />
          <Route path="admin/:id" element={<Admin_Edit />} />
          <Route path="admin/add" element={<Admin_Add />} />

          <Route path="/*" element={<Error_404 />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
