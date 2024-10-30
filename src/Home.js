// src/Home.js
import React, { useState } from 'react';
import { Button, Container, Typography, Box, Divider } from '@mui/material';
import Login from './Login';
import Register from './Register';
import keycloak from './keycloak';

function Home({ onCustomLogin }) {
  const [showCustomLogin, setShowCustomLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleKeycloakLogin = () => {
    keycloak.login();
  };

  const toggleLoginOption = () => {
    setShowCustomLogin((prev) => !prev);
  };

  const toggleRegisterOption = () => {
    setShowRegister((prev) => !prev);
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: '100vh' }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Home Page
      </Typography>

      {!showRegister ? (
        <>
          <Box mt={3} mb={2}>
            {!showCustomLogin ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Login with Keycloak
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleKeycloakLogin}
                >
                  Keycloak Login
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6" gutterBottom>
                  Login with Username & Password
                </Typography>
                <Login onLoginSuccess={onCustomLogin} />
              </>
            )}
          </Box>

          <Divider style={{ width: '80%', margin: '20px 0' }} />

          <Button
            variant="text"
            onClick={toggleLoginOption}
            style={{ marginTop: '10px' }}
          >
            {showCustomLogin ? 'Use Keycloak Login' : 'Use Username & Password'}
          </Button>
          <Button
            variant="text"
            onClick={toggleRegisterOption}
            style={{ marginTop: '10px' }}
          >
            Register a New Account
          </Button>
        </>
      ) : (
        <Register onRegisterSuccess={() => setShowRegister(false)} />
      )}
    </Container>
  );
}

export default Home;
