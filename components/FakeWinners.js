import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const names = ['Mario', 'Lucia', 'Giuseppe', 'Giulia', 'Francesca', 'Davide', 'Sara', 'Roberto'];

const generateRandomWin = () => {
  const name = names[Math.floor(Math.random() * names.length)];
  const amount = 100;
  const time = new Date().toLocaleTimeString();
  return { name, amount, time };
};

const FakeWinners = () => {
  const [wins, setWins] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWin = generateRandomWin();
      setWins((prev) => {
        const updatedWins = [newWin, ...prev];
        if (updatedWins.length > 10) {
          updatedWins.pop();
        }
        return updatedWins;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', // Fissa in basso
        bottom: '20px',   // Posizionamento dal basso
        left: '50%',      // Centrato orizzontalmente
        transform: 'translateX(-50%)', // Corregge il centramento
        backgroundColor: '#ffffffcc',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '800px',
        boxSizing: 'border-box',
        zIndex: 1000, // Assicura che sia visibile sopra altri elementi
      }}
    >
      <h3 style={{ color: '#2f3542', marginBottom: '10px', textAlign: 'center' }}>Vincite Recenti</h3>
      <div style={{
        maxHeight: '200px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse'
      }}>
        <AnimatePresence>
          {wins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundColor: '#fff',
                margin: '5px 0',
                padding: '10px',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
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