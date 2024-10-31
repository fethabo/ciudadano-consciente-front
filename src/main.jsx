import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import InitKeycloak from './security/InitKeycloak';
import { configKc } from './security/KeycloakConfig.js';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <InitKeycloak configKc={configKc}>
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    </InitKeycloak>
)
