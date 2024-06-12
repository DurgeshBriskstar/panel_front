import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import App from './App';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/JWTContext';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <CollapseDrawerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CollapseDrawerProvider>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>
);
