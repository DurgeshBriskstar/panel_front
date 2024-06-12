import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import App from './App';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/JWTContext';

// A simple slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; }
  }
});

const { actions, reducer } = counterSlice;
export const { increment, decrement } = actions;

// Create a Redux store using the slice reducer
const store = configureStore({
  reducer: {
    counter: reducer,
  },
});

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
