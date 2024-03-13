// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ContextStore } from './ContextStore';
import { I18nextProvider } from 'react-i18next';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n';

ReactDOM.render(
  <ContextStore>
    <BrowserRouter>
 
        <App />
    
    </BrowserRouter>
  </ContextStore>,
  document.getElementById('root')
);

reportWebVitals();
