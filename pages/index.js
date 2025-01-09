// frontend/pages/index.js
import React, { useContext } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import ButtonSection from '../components/ButtonSection';
import ReferralSection from '../components/ReferralSection';
import FakeWinners from '../components/FakeWinners';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { isLoggedIn, showLogin, setShowLogin, userData } = useContext(AuthContext);

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Pop-up Login */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* Contenuto principale */}
      <div
        style={{
          padding: '20px',
          paddingTop: '80px', // Aggiungi padding per l'header fisso
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!isLoggedIn ? (
          <p className="login-message">
            Effettua il login per accedere a Clicksy
          </p>
        ) : (
          <>
            <ButtonSection />
            <ReferralSection />
          </>
        )}
        <FakeWinners />
      </div>
    </div>
  );
};

export default HomePage;