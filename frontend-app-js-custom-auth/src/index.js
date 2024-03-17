import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

const authConfig = {
  signInRedirectURL: window.configs.redirectUrl,
  signOutRedirectURL: window.configs.redirectUrl,
  clientID: window.configs.asgardeoClientId,
  baseUrl: window.configs.asgardeoBaseUrl,
  scope: ["openid", "profile"],
};

root.render(
  <React.StrictMode>
    <AuthProvider config={authConfig} >
    <App />
    </AuthProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
