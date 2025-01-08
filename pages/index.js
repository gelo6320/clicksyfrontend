import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import ButtonSection from '../components/ButtonSection';
import ReferralSection from '../components/ReferralSection';
import FakeWinners from '../components/FakeWinners';

/*
  Pagina principale del sito clicksy:
  - Mostra header
  - Gestisce il login modal
  - Mostra sezione del pulsante "ritira 100€"
  - Mostra la sezione ref link personale
  - Mostra le vincite fittizie (FakeWinners)
*/

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // di default appare il pop-up per la registrazione
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
    setShowLogin(true);
  };

  return (
    <div style={{
      background: 'linear-gradient(to right, #e1eec3, #f05053)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      
      {/* Pop-up login/registrazione */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLogin}
        />
      )}

      {/* Sezione Pulsante */}
      {isLoggedIn && (
        <ButtonSection userData={userData} />
      )}

      {/* Sezione Referral */}
      {isLoggedIn && (
        <ReferralSection userData={userData} />
      )}

      {/* Sezione vincite fittizie */}
      <FakeWinners />
    </div>
  );
};

export default HomePage;