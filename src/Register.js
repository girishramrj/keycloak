// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
      });
      setMessage(response.data.message);
      setError('');
      onRegisterSuccess(); // Redirect or show login options after successful registration
    } catch (err) {
      setError(err.response?.data.message || 'Registration failed');
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <Box mb={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>

      {message && <Alert severity="success" style={{ marginTop: '20px' }}>{message}</Alert>}
      {error && <Alert severity="error" style={{ marginTop: '20px' }}>{error}</Alert>}
    </Container>
  );
}

export default Register;
