// src/App.js
import React, { useEffect, useState } from 'react';
import keycloak from './keycloak';
import Home from './Home';
import axios from 'axios';

function App() {
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if manual login token exists

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(response.data.username);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token'); // Clear token if invalid
      }
    };

    if (keycloak.authenticated) {
      const name = keycloak.tokenParsed?.preferred_username || 'User';
      setUserName(name);
      setIsAuthenticated(true);
    } else if (token) {
      fetchUserData(); // Fetch user details using token
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token'); // Clear manual login token
    keycloak.logout({ redirectUri: window.location.origin }); // Logout from Keycloak
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Welcome, {userName}!</h1>
          <p>You are successfully logged in.</p>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;
