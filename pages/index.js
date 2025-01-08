// frontend/pages/index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import ButtonSection from '../components/ButtonSection';
import ReferralSection from '../components/ReferralSection';
import FakeWinners from '../components/FakeWinners';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Appare il pop-up quando clicchi "Login"
  const [userData, setUserData] = useState(null);

  // Funzione per simulare login/registrazione
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setShowLogin(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: 'linear-gradient(to right, #ece9e6, #ffffff)',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />

      {/* Pop-up login/registrazione */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLogin}
        />
      )}

      {/* Sezione Pulsante */}
      {isLoggedIn && (
        <>
          <ButtonSection userData={userData} />
          <ReferralSection userData={userData} />
        </>
      )}

      {/* Sezione vincite fittizie */}
      <FakeWinners />
    </motion.div>
  );
};

export default HomePage;