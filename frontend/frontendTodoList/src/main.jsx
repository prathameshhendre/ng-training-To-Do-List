import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// If you have any other global CSS, keep this line. Otherwise, you can remove it.
// import './index.css';

// This is the CRITICAL line for SLDS
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);