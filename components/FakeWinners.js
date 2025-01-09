// frontend/components/FakeWinners.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const FakeWinners = () => {
  const [wins, setWins] = useState([]);

  useEffect(() => {
    // Fetch fake wins from backend
    const fetchFakeWins = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wins`);
        setWins(res.data.wins.slice(0, 4)); // Prendi solo le prime 4
      } catch (error) {
        console.error('Errore nel fetch delle vincite:', error);
      }
    };

    fetchFakeWins();

    // Poll the wins every 10 seconds
    const interval = setInterval(() => {
      fetchFakeWins();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fake-winners"
    >
      <h3 style={{ color: '#2f3542', marginBottom: '10px', textAlign: 'center' }}>Vincite Recenti</h3>
      <div className="wins-container">
        <AnimatePresence>
          {wins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="win-item"
            >
              <span><strong>{win.name}</strong> ha vinto <strong>{win.amount}€</strong></span>
              <span style={{ fontSize: '0.8rem', color: '#57606f' }}>{win.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FakeWinners;