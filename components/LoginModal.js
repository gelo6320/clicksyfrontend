// frontend/components/LoginModal.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const { handleLogin } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      console.log('Tentativo di registrazione con:', { email, password, referredBy: localStorage.getItem('refCode') });
      const ref = localStorage.getItem('refCode');

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`, {
        email,
        password,
        referredBy: ref
      });
      console.log('Risposta dalla registrazione:', res.data);
      setStatusMessage(res.data.message);
      // Effettua il login automatico dopo la registrazione
      if (res.data.token && res.data.user) {
        handleLogin(res.data.user, res.data.token);
      }
    } catch (error) {
      console.error('Errore nella registrazione:', error);
      setStatusMessage(error.response?.data?.message || 'Errore di registrazione.');
    }
  };

  const handleLoginClick = async () => {
    try {
      console.log('Tentativo di login con:', { email, password });
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`, {
        email,
        password
      });
      console.log('Risposta dal login:', res.data);
      setStatusMessage(res.data.message);
      handleLogin(res.data.user, res.data.token);
    } catch (error) {
      console.error('Errore nel login:', error);
      setStatusMessage(error.response?.data?.message || 'Errore di login.');
    }
  };

  const handleGoogleLogin = () => {
    // Integra la logica di Google OAuth
    alert('Funzione "Accedi con Google" non implementata completamente (demo).');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="modal-overlay"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="modal-content"
        >
          <FaTimes
            onClick={onClose}
            className="close-icon"
          />
          <h2>Registrazione / Login</h2>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />

          <div className="button-group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginClick}
              className="login-btn"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRegister}
              className="register-btn"
            >
              Registrati
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleLogin}
            className="google-login-btn"
          >
            Accedi con Google
          </motion.button>

          <p className="status-message">{statusMessage}</p>
        </motion.div>
      </motion.div>

      {/* Styles */}
      <style jsx>{`
        .close-icon {
          position: absolute;
          top: 15px;
          right: 15px;
          cursor: pointer;
          color: #7f8c8d;
        }

        h2 {
          color: #2f3542;
          margin-bottom: 20px;
          text-align: center;
        }

        label {
          display: block;
          text-align: left;
          color: #2f3542;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          box-sizing: border-box;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 15px;
        }

        .login-btn {
          background-color: #27ae60;
          color: #fff;
          flex: 1;
          transition: background-color 0.3s ease;
        }

        .login-btn:hover {
          background-color: #2ecc71;
        }

        .register-btn {
          background-color: #2980b9;
          color: #fff;
          flex: 1;
          transition: background-color 0.3s ease;
        }

        .register-btn:hover {
          background-color: #3498db;
        }

        .google-login-btn {
          background-color: #dd4b39;
          color: #fff;
          width: 100%;
          padding: 10px 0;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        .google-login-btn:hover {
          background-color: #c23321;
        }

        .status-message {
          margin-top: 15px;
          color: #e74c3c;
          font-weight: 600;
          text-align: center;
        }

        @media (max-width: 480px) {
          .button-group {
            flex-direction: column;
          }

          .login-btn, .register-btn {
            width: 100%;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default LoginModal;