import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Make sure you import useNavigate

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use React Router for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token); // Store JWT in localStorage
      localStorage.setItem('user', user);   // Store username in localStorage

      // Redirect after 0.01 seconds
      setTimeout(() => {
        navigate('/'); // Redirect to the App page
        window.location.reload(); // Refresh the page
      }, 10); // Delay of 10 milliseconds (0.01 seconds)
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login with Username & Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
