import React, { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import ButtonSection from '../components/ButtonSection';
import ReferralSection from '../components/ReferralSection';
import FakeWinners from '../components/FakeWinners';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        setShowLogin={setShowLogin}
      />

      {/* Pop-up Login */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLogin}
        />
      )}

      {/* Contenuto principale */}
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {isLoggedIn ? (
          <>
            <ButtonSection />
            <ReferralSection />
          </>
        ) : (
          <p className="highlight-message">
            Effettua il login per accedere alle funzionalità!
          </p>
        )}
        <FakeWinners />
      </div>
    </div>
  );
};

export default HomePage;