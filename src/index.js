import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PersonalRouter from './PersonalRouter';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PersonalRouter/>
  </React.StrictMode>
);
reportWebVitals();
