import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './i18n';
import { App } from './Pages/App';
import { store, persistor } from './store';
import { Spinner } from './Components/Other/Spinner/Spinner';


const root = createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_KEY}>
            <Provider store={store}>
                <BrowserRouter>
                    <PersistGate loading={<Spinner />} persistor={persistor}>
                        <App />
                    </PersistGate>
                </BrowserRouter>
            </Provider>
        </GoogleOAuthProvider>
    </StrictMode>
);
