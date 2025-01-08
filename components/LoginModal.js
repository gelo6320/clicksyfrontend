import React, { useState } from 'react';
import axios from 'axios';

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleRegister = async () => {
    try {
      // In un caso reale: se l'utente ha un ref link
      // potresti estrarlo da parametri URL e passarlo come referredBy
      const ref = localStorage.getItem('refCode'); // ad esempio

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`, {
        email,
        password,
        referredBy: ref
      });
      setStatusMessage(res.data.message);
      onLoginSuccess(res.data.user);
    } catch (error) {
      setStatusMessage(error.response?.data?.message || 'Errore di registrazione.');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`, {
        email,
        password
      });
      setStatusMessage(res.data.message);
      onLoginSuccess(res.data.user);
    } catch (error) {
      setStatusMessage(error.response?.data?.message || 'Errore di login.');
    }
  };

  const handleGoogleLogin = () => {
    // Qui integreresti la logica di Google OAuth
    alert('Funzione "Accedi con Google" non implementata completamente (demo).');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: '400px',
        maxWidth: '90%'
      }}>
        <h2>Registrazione / Login</h2>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />

        <div style={{ display: 'flex', gap: '10px', marginBottom: 10 }}>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Registrati</button>
        </div>

        <button onClick={handleGoogleLogin} style={{ marginBottom: 10 }}>
          Accedi con Google
        </button>

        <button onClick={onClose}>Chiudi</button>

        <p>{statusMessage}</p>
      </div>
    </div>
  );
};

export default LoginModal;
