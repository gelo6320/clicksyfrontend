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
      <main className="main-content">
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
        {/* Placeholder per eventuali pubblicità */}
        <div className="ad-placeholder-main">
          {/* Inserisci qui le pubblicità */}
        </div>
      </main>

      {/* Styles */}
      <style jsx>{`
        .main-content {
          padding: 120px 20px 40px 20px; /* Aggiungi padding per l'header fisso */
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          box-sizing: border-box;
        }

        .login-message {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2c3e50;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
          margin: 30px 0;
        }

        .ad-placeholder-main {
          width: 100%;
          max-width: 800px;
          padding: 20px;
          background-color: #ecf0f1;
          border-radius: 8px;
          color: #7f8c8d;
          font-size: 1rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .main-content {
            gap: 30px;
          }

          .login-message {
            font-size: 2rem;
            margin: 20px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;