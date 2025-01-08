import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ButtonSection = ({ userData }) => {
  const [buttonState, setButtonState] = useState('default'); 
  // default, loading, red, disabled
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Se l'utente ha già un nextClickTime nel passato, timer = 0
    if (userData?.nextClickTime) {
      const nextTime = new Date(userData.nextClickTime).getTime();
      const now = new Date().getTime();
      if (nextTime > now) {
        setTimer(Math.floor((nextTime - now) / 1000)); // in secondi
      } else {
        setTimer(0);
      }
    }
  }, [userData]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timer <= 0) {
      setButtonState('default'); // il pulsante torna cliccabile
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleClick = async () => {
    setButtonState('loading');
    // animazione rotante
    await new Promise((r) => setTimeout(r, 1500)); // finta attesa

    // Chiamata API al backend per "click"
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/click`, {
        userId: userData.id
      });
      console.log(res.data);
      setButtonState('red');
      await new Promise((r) => setTimeout(r, 1500)); // simula animazione rosso

      setButtonState('disabled');

      // Aggiorna timer in base a nextClickTime restituito
      const newNextClick = new Date(res.data.nextClickTime).getTime();
      const now = new Date().getTime();
      setTimer(Math.floor((newNextClick - now) / 1000));

    } catch (error) {
      alert(error.response?.data?.message || 'Errore nel click');
      setButtonState('default');
    }
  };

  const getButtonStyle = () => {
    switch (buttonState) {
      case 'default':
        return {
          backgroundColor: '#6ab04c',
          cursor: 'pointer'
        };
      case 'loading':
        return {
          backgroundColor: '#f7f1e3',
          cursor: 'wait'
        };
      case 'red':
        return {
          backgroundColor: 'red'
        };
      case 'disabled':
        return {
          backgroundColor: 'gray',
          cursor: 'not-allowed'
        };
      default:
        return {};
    }
  };

  return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <button
        style={{
          ...getButtonStyle(),
          fontSize: '1.2rem',
          padding: '10px 20px',
          borderRadius: '8px',
          color: '#fff',
          transition: 'all 0.3s ease'
        }}
        disabled={buttonState === 'disabled' || buttonState === 'loading'}
        onClick={handleClick}
      >
        {buttonState === 'loading' ? (
          <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>
            ⏳
          </span>
        ) : 'Ritira 100 €'}
      </button>

      {timer > 0 && (
        <p style={{ marginTop: 10 }}>
          Prossimo click disponibile tra: <strong>{timer}</strong> secondi
        </p>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ButtonSection;
