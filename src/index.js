import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import { PlateProvider } from './plate-context';
import { BACK_URL } from './constants';
import { getCookie } from './components/helpers/cookies';

import './index.css';

//? agregar URL del back y headers a peticiones de axios
axios.interceptors.request.use(function (config) {
    //: si hago peticiones a varias URL...
    // if (config.url !== "https://otraURL") {}
    config.baseURL = BACK_URL;
    let token = getCookie('autoLogin')
    //: si necesito varios headers...
    // token && (config.headers.Authorization = config.headers.Authorization || `Bearer ${token}`);    
    token && (config.headers.Authorization = token);

    return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PlateProvider>
        <App />
    </PlateProvider>
);