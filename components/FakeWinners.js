import React, { useEffect, useState } from 'react';

const names = ['Mario', 'Lucia', 'Giuseppe', 'Giulia', 'Francesca', 'Davide', 'Sara', 'Roberto'];
// Genera un nome e orario a caso
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
      setWins((prev) => [newWin, ...prev]);
    }, 10000); // ogni 10 secondi
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      marginTop: 30,
      backgroundColor: 'rgba(255,255,255,0.5)',
      padding: 10,
      borderRadius: 8
    }}>
      <h3>Vincite Recenti</h3>
      <div style={{
        maxHeight: '200px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse'
      }}>
        {wins.map((win, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            margin: '5px 0',
            padding: '5px',
            borderRadius: '5px'
          }}>
            <strong>{win.name}</strong> ha vinto <strong>{win.amount}€</strong> alle {win.time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FakeWinners;
