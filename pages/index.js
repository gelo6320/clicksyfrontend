import React, { useState } from 'react';
import Header from '../components/Header';
import ButtonSection from '../components/ButtonSection';
import ReferralSection from '../components/ReferralSection';
import FakeWinners from '../components/FakeWinners';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Hero Section */}
      <section className="section bg-dark">
        <h1>Benvenuti in Clicksy</h1>
        <p>Un modo semplice per guadagnare e invitare amici.</p>
      </section>

      {/* Sezione Pulsante */}
      {isLoggedIn && <ButtonSection />}

      {/* Sezione Referral */}
      {isLoggedIn && <ReferralSection />}

      {/* Fake Winners */}
      <section className="section bg-light">
        <FakeWinners />
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Clicksy. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default HomePage;