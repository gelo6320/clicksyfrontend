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
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/click`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setButtonState('red');
      await new Promise((r) => setTimeout(r, 1500)); 
      setButtonState('disabled');
      const newNextClick = new Date(res.data.nextClickTime).getTime();
      const now = new Date().getTime();
      const newTimer = Math.floor((newNextClick - now) / 1000);
      setTimer(newTimer);
      localStorage.setItem(`nextClickTime_${userData.id}`, res.data.nextClickTime);
    } catch (error) {
      alert(error.response?.data?.message || 'Errore nel click');
      setButtonState('default');
      setIsDisabled(false);
    }
  };

  const getButtonStyle = () => {
    switch (buttonState) {
      case 'default':
        return {
          backgroundColor: '#27ae60', // Verde più invitante
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        };
      case 'loading':
        return {
          backgroundColor: '#f1c40f', // Giallo per il caricamento
          cursor: 'wait',
          transition: 'background-color 0.3s ease',
        };
      case 'red':
        return {
          backgroundColor: 'red',
          transition: 'background-color 0.3s ease',
        };
      case 'disabled':
        return {
          backgroundColor: 'gray',
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
    <div style={{ margin: '20px 0', textAlign: 'center', width: '100%', maxWidth: '800px' }}>
      <motion.button
        style={{ 
          ...getButtonStyle(), 
          width: '300px', 
          height: '100px', 
          fontSize: '2rem', 
          borderRadius: '12px',
          color: '#fff',
          fontWeight: 'bold',
        }}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {buttonState === 'loading' ? (
          <FaSpinner className="spinner" style={{ animation: 'spin 2s linear infinite' }} />
        ) : 'Ritira 100 €'}
      </motion.button>

      {timer > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '15px', fontSize: '1.2rem', color: '#2f3542' }}
        >
          Tempo residuo: <strong>{formatTime(timer)}</strong>
        </motion.div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          font-size: 2.5rem;
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