// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './Login';
import keycloak from './keycloak';

keycloak.init({ onLoad: 'check-sso' }).then((authenticated) => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App isAuthenticated={authenticated} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
