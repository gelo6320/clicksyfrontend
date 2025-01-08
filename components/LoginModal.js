// frontend/components/LoginModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleRegister = async () => {
    try {
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '12px',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            position: 'relative'
          }}
        >
          <FaTimes
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              cursor: 'pointer',
              color: '#57606f'
            }}
          />
          <h2 style={{ color: '#2f3542', marginBottom: '20px', textAlign: 'center' }}>Registrazione / Login</h2>
          <label style={{ color: '#2f3542' }}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: '15px', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <label style={{ color: '#2f3542' }}>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: '20px', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc' }}
          />

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              style={{
                backgroundColor: '#1e90ff',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '1rem',
                flex: 1,
                cursor: 'pointer'
              }}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRegister}
              style={{
                backgroundColor: '#2ed573',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '1rem',
                flex: 1,
                cursor: 'pointer'
              }}
            >
              Registrati
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleLogin}
            style={{
              backgroundColor: '#3742fa',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '1rem',
              width: '100%',
              marginBottom: '15px',
              cursor: 'pointer'
            }}
          >
            Accedi con Google
          </motion.button>

          <p style={{ color: '#ff4757', textAlign: 'center' }}>{statusMessage}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;