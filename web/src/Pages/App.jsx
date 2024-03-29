import {Suspense, lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

// LAYOUT
import {AdminRoute} from '../hooks/Auth';
import {Layout} from './Layout/Layout';
import {Spinner} from '../Components/Other/Spinner/Spinner';
// PRODUCTS
import {Product} from './Products/Product';
import {Add_Review} from './Products/Add_Review';
// ORDER
import {Order} from './Order/Order';
import {Order_Status} from './Order/Order_Status';
import {Order_Guest} from './Order/Order_Guest';
// ACCOUNT
import {MyOrders} from './Account/MyOrders/MyOrders';
import {Personal_Data} from './Account/Personal_Data/Personal_Data';

const ProtectedRoute = lazy(() => import('../hooks/Auth'));

const Main = lazy(() => import('./Main'));
const Products = lazy(() => import('./Products/Products'));
const Error_404 = lazy(() => import('./Error/Error_404'));

const Account = lazy(() => import('./Account/Account/Account'));
const Customer_Rights = lazy(() => import('./Footer/Customer_Rights'));
const Support = lazy(() => import('./Footer/Support'));

const Login = lazy(() => import('./Auth/Login'));
const Register = lazy(() => import('./Auth/Register'));
const Request_Reset = lazy(() => import('./Auth/Request_Reset'));
const Reset = lazy(() => import('./Auth/Reset'));

const Admin = lazy(() => import('./Admin/Admin'));
const Admin_Edit = lazy(() => import('./Admin/Admin_Edit'));
const Admin_Add = lazy(() => import('./Admin/Admin_Add'));

export function App() {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route exact element={<Layout />}>
                    <Route index path="/" element={<Main />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:id" element={<Product />} />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="request_reset" element={<Request_Reset />} />
                    <Route path="reset" element={<Reset />} />
                    <Route path="pay_for_item/:id" element={<Order_Guest />} />
                    <Route path="order_status" element={<Order_Status />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/account" element={<Account />}>
                            <Route path="" element={<MyOrders />} />
                            <Route path="orders" element={<MyOrders />} />
                            <Route
                                path="personal_data"
                                element={<Personal_Data />}
                            />
                        </Route>

                        <Route path="order" element={<Order />} />
                        <Route
                            path="products/add_review/:id"
                            element={<Add_Review />}
                        />
                    </Route>

                    <Route
                        path="customer_rights"
                        element={<Customer_Rights />}
                    />
                    <Route path="support" element={<Support />} />

                    <Route path="/*" element={<Error_404 />} />
                </Route>
                <Route element={<AdminRoute />}>
                    <Route path="admin" element={<Admin />} />
                    <Route
                        path="/products/:id/admin"
                        element={<Admin_Edit />}
                    />
                    <Route path="admin/add" element={<Admin_Add />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
