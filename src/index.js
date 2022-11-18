import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import './i18n';
import App from './pages/App';
// import store from './features/store'

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        {/* </Provider> */}
    </React.StrictMode>
);
