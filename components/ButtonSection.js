// frontend/components/ButtonSection.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const ButtonSection = () => {
  const { userData, token } = useContext(AuthContext);
  const [buttonState, setButtonState] = useState('default'); 
  const [timer, setTimer] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userData) return;

    const storedNextClick = localStorage.getItem(`nextClickTime_${userData.id}`);
    if (storedNextClick) {
      const nextTime = new Date(storedNextClick).getTime();
      const now = new Date().getTime();
      if (nextTime > now) {
        setTimer(Math.floor((nextTime - now) / 1000));
        setButtonState('disabled');
        setIsDisabled(true);
      }
    }
  }, [userData]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setButtonState('default');
            setIsDisabled(false);
            setMessage('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleClick = async () => {
    if (!userData) {
      alert('Utente non autenticato.');
      return;
    }

    setButtonState('loading');
    setIsDisabled(true);
    setMessage('');
    try {
      console.log('Invio richiesta di click al backend.');
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/click`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Risposta dal backend:', res.data);
      setButtonState('red');
      setMessage('Peccato, non hai vinto!');
      await new Promise((r) => setTimeout(r, 2000)); 
      setButtonState('disabled');
      const newNextClick = new Date(res.data.nextClickTime).getTime();
      const now = new Date().getTime();
      const newTimer = Math.floor((newNextClick - now) / 1000);
      setTimer(newTimer);
      localStorage.setItem(`nextClickTime_${userData.id}`, res.data.nextClickTime);
    } catch (error) {
      console.error('Errore nel click:', error);
      alert(error.response?.data?.message || 'Errore nel click');
      setButtonState('default');
      setIsDisabled(false);
    }
  };

  const getButtonStyle = () => {
    switch (buttonState) {
      case 'default':
        return {
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
        };
      case 'loading':
        return {
          background: 'linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)',
          cursor: 'wait',
          transition: 'background 0.3s ease',
        };
      case 'red':
        return {
          background: '#e74c3c',
          transition: 'background 0.3s ease',
        };
      case 'disabled':
        return {
          background: '#95a5a6',
          cursor: 'not-allowed',
        };
      default:
        return {};
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  if (!userData) return null;

  return (
    <div className="button-section">
      <motion.button
        style={{ 
          ...getButtonStyle(), 
          width: '300px', 
          height: '100px', 
          fontSize: '2rem', 
          borderRadius: '12px',
          color: '#fff',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          margin: '0 auto', // Centra il pulsante
        }}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {buttonState === 'loading' ? (
          <FaSpinner className="spinner" style={{ animation: 'spin 2s linear infinite' }} />
        ) : (
          message ? message : 'Ritira 100 €'
        )}
      </motion.button>

      {timer > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="timer"
        >
          Tempo residuo: <strong>{formatTime(timer)}</strong>
        </motion.div>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          font-size: 2.5rem;
        }

        .button-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          width: 100%;
          box-sizing: border-box;
        }

        .timer {
          margin-top: 15px;
          font-size: 1.2rem;
          color: #2f3542;
        }

        @media (max-width: 768px) {
          button {
            width: 200px;
            height: 70px;
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          button {
            width: 150px;
            height: 60px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ButtonSection;