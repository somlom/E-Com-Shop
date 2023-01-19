import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './i18n';
import App from './pages/App';
import { store, persistor } from './store';
import { Spinner } from './components/other/Spinner/Spinner';


const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*  redux provider */}
            <BrowserRouter>
                {/* react router provider */}
                <PersistGate loading={<Spinner />} persistor={persistor}>
                    {/* persist local storage provider */}
                    <App />

                </PersistGate>

            </BrowserRouter>

        </Provider>
    </React.StrictMode>
);
