import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const ButtonSection = ({ userData }) => {
  const [buttonState, setButtonState] = useState('default'); 
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const storedNextClick = localStorage.getItem(`nextClickTime_${userData.id}`);
    if (storedNextClick) {
      const nextTime = new Date(storedNextClick).getTime();
      const now = new Date().getTime();
      if (nextTime > now) {
        setTimer(Math.floor((nextTime - now) / 1000)); 
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
    }
  };

  const getButtonStyle = () => {
    switch (buttonState) {
      case 'default':
        return {
          backgroundColor: '#ff4757',
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

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div style={{ margin: '20px 0', textAlign: 'center', width: '100%', maxWidth: '800px' }}>
      <motion.button
        style={getButtonStyle()}
        onClick={handleClick}
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
          style={{ marginTop: '15px', fontSize: '1rem', color: '#2f3542' }}
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
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default ButtonSection;