import React, { Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom";

// import { Main } from './Main'
// import { Error_404 } from './Error/Error_404';
import { Layout } from '../components/layout/Layout';
// import { Products } from './Products/Products';
import { FAQ } from './FAQ';
import { Impressum } from './Impressum';
import { Customer_Rights } from './Customer_Rights';
import { Support } from './Support';
import { Product } from './Products/Product';
// import { Account } from './Account';
import { ProtectedRoute } from '../hooks/Auth';
import { Order } from './Order';
import { MyOrders } from './MyOrders';
import { Admin, Admin_Edit } from './Admin/Admin';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Reset } from './Auth/Reset';
import { Spinner } from '../components/other/Spinner/Spinner';

const Main = lazy(() => import("./Main"));
const Products = lazy(() => import("./Products/Products"));
const Error_404 = lazy(() => import("./Error/Error_404"));
const Account = lazy(() => import("./Account"));

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

          </Route>


          <Route path='faq' element={<FAQ />} />
          <Route path='impressum' element={<Impressum />} />
          <Route path='customer_rights' element={<Customer_Rights />} />
          <Route path='support' element={<Support />} />

          <Route path="admin" element={<Admin />} />
          <Route path="admin/:id" element={<Admin_Edit />} />

          <Route path="/*" element={<Error_404 />} />
          <Route path="/spinner" element={<Spinner />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
