// frontend/pages/admin.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import AdminDashboard from '../components/AdminDashboard'; // Assicurati che il percorso sia corretto

const AdminPage = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [showLogin, setShowLogin] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAdminLogin = () => {
    const { username, password } = adminCredentials;
    if (username === 'clicksy2025' && password === 'clicksy2025') {
      setIsAdminLoggedIn(true);
      setShowLogin(false);
      setStatusMessage('Login riuscito.');
    } else {
      setStatusMessage('Credenziali non valide.');
    }
  };

  return (
    <div>
      {/* Admin Dashboard */}
      {isAdminLoggedIn && <AdminDashboard />}

      {/* Popup Login */}
      {showLogin && !isAdminLoggedIn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
              onClick={() => setShowLogin(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                cursor: 'pointer',
                color: '#57606f'
              }}
            />
            <h2 style={{ color: '#2f3542', marginBottom: '20px', textAlign: 'center' }}>Admin Login</h2>
            <label style={{ color: '#2f3542' }}>Username:</label>
            <input 
              type="text" 
              value={adminCredentials.username} 
              onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
              style={{ width: '100%', marginBottom: '15px', padding: '10px', fontSize: '1rem' }}
            />
            <label style={{ color: '#2f3542' }}>Password:</label>
            <input 
              type="password" 
              value={adminCredentials.password} 
              onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
              style={{ width: '100%', marginBottom: '20px', padding: '10px', fontSize: '1rem' }}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdminLogin}
              style={{
                backgroundColor: '#1e90ff',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '1rem',
                width: '100%'
              }}
            >
              Login
            </motion.button>

            <p style={{ color: '#ff4757', textAlign: 'center', marginTop: '15px' }}>{statusMessage}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminPage;