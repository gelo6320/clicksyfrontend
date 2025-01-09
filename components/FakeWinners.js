// frontend/components/FakeWinners.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const FakeWinners = () => {
  const [wins, setWins] = useState([]);

  useEffect(() => {
    const fetchFakeWins = async () => {
      try {
        console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL); // Log per debugging
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wins`);
        console.log('Response:', res.data); // Log della risposta
        setWins(res.data.wins.slice(0, 4)); // Prendi solo le prime 4
      } catch (error) {
        if (error.response) {
          console.error('Errore nel fetch delle vincite:', error.response.data);
        } else if (error.request) {
          console.error('Nessuna risposta ricevuta:', error.request);
        } else {
          console.error('Errore nella configurazione della richiesta:', error.message);
        }
      }
    };

    fetchFakeWins();
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