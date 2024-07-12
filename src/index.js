// scroll bar
import 'simplebar/src/simplebar.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import locale from 'date-fns/locale/en-US'; // Monday first
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import App from './App';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/JWTContext';
import { store } from './redux/store';
// ----------------------------------------------------------------------

// Monday first date picker locale
if (locale && locale.options) {
  locale.options.weekStartsOn = 1
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
          <CollapseDrawerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CollapseDrawerProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>
);
