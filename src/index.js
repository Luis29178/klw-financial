import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Routes as App } from './Routes';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
