// frontend/components/ButtonSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import di Framer Motion
import { FaSpinner } from 'react-icons/fa'; // Icona minimalista

const ButtonSection = ({ userData }) => {
  const [buttonState, setButtonState] = useState('default'); 
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Recupera il nextClickTime dal localStorage
    const storedNextClick = localStorage.getItem(`nextClickTime_${userData.id}`);
    if (storedNextClick) {
      const nextTime = new Date(storedNextClick).getTime();
      const now = new Date().getTime();
      if (nextTime > now) {
        setTimer(Math.floor((nextTime - now) / 1000)); // in secondi
        setButtonState('disabled');
      }
    }
  }, [userData.id]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setButtonState('default');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleClick = async () => {
    setButtonState('loading');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/click`, {
        userId: userData.id
      });
      setButtonState('red');
      await new Promise((r) => setTimeout(r, 1500)); // Simula animazione rosso
      setButtonState('disabled');

      // Calcola il timer basato sul nextClickTime restituito dal backend
      const newNextClick = new Date(res.data.nextClickTime).getTime();
      const now = new Date().getTime();
      const newTimer = Math.floor((newNextClick - now) / 1000);
      setTimer(newTimer);
      localStorage.setItem(`nextClickTime_${userData.id}`, res.data.nextClickTime);
    } catch (error) {
      alert(error.response?.data?.message || 'Errore nel click');
      setButtonState('default');
    }
  };

  const getButtonStyle = () => {
    switch (buttonState) {
      case 'default':
        return {
          backgroundColor: '#ff4757', // Colore più accattivante
          cursor: 'pointer'
        };
      case 'loading':
        return {
          backgroundColor: '#ffa502',
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
      <motion.button
        whileHover={buttonState !== 'disabled' && buttonState !== 'loading' ? { scale: 1.05 } : {}}
        whileTap={buttonState !== 'disabled' && buttonState !== 'loading' ? { scale: 0.95 } : {}}
        style={{
          ...getButtonStyle(),
          fontSize: '1.5rem',
          padding: '15px 30px',
          borderRadius: '12px',
          color: '#fff',
          transition: 'all 0.3s ease',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        disabled={buttonState === 'disabled' || buttonState === 'loading'}
        onClick={handleClick}
      >
        {buttonState === 'loading' ? (
          <FaSpinner className="spinner" style={{ animation: 'spin 2s linear infinite' }} />
        ) : 'Ritira 100 €'}
      </motion.button>

      {timer > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: 10, fontSize: '1rem' }}
        >
          Prossimo click disponibile tra: <strong>{Math.floor(timer / 3600)}h {Math.floor((timer % 3600) / 60)}m {timer % 60}s</strong>
        </motion.p>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default ButtonSection;