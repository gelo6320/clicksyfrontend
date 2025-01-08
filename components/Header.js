// frontend/components/Header.js
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, handleLogout, setShowLogin } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffffcc',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1200px',
        margin: '40px auto', // Margine dall'alto e centratura
        position: 'relative',
      }}
    >
      <div>
        <h2 style={{ margin: 0, color: '#2f3542', textAlign: 'center' }}>Clicksy</h2>
      </div>
      <div>
        {isLoggedIn ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            style={{
              backgroundColor: '#ff6b81',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogin(true)}
            style={{
              backgroundColor: '#1e90ff',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
            }}
          >
            Login
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Header;