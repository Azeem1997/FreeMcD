import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';

/**
 * Application Entry Point
 * 
 * Initializes and renders the React application into the root DOM element.
 * Sets up Bootstrap styling and the main App component with StrictMode for
 * development warnings and checks.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
