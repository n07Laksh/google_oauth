import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as R } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from "./reduxState/store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <R>
    <Provider store={store}>
      <App />
    </Provider>
    </R>
  </React.StrictMode>
);
