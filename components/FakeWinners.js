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
    <div className="fake-winners">
      <h3>Vincite Recenti</h3>
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
              <span className="win-time">{win.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Placeholder per eventuali pubblicità */}
      <div className="ad-placeholder">
        {/* Inserisci qui le pubblicità */}
      </div>

      {/* Styles */}
      <style jsx>{`
        .fake-winners {
          background-color: #f8f9fa;
          padding: 30px 20px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          margin: 20px auto;
          max-width: 800px;
          text-align: center;
        }

        .fake-winners h3 {
          margin-bottom: 20px;
          color: #2f3542;
        }

        .wins-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-height: 500px;
          overflow: hidden;
          position: relative;
        }

        .win-item {
          background-color: #fff;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .win-time {
          font-size: 0.9rem;
          color: #7f8c8d;
        }

        .ad-placeholder {
          margin-top: 30px;
          padding: 20px;
          background-color: #ecf0f1;
          border-radius: 8px;
          color: #7f8c8d;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .wins-container {
            gap: 10px;
          }

          .win-item {
            padding: 12px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default FakeWinners;