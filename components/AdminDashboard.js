// frontend/components/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/leaderboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLeaderboard(res.data.leaderboard);
      } catch (error) {
        console.error('Errore nel fetch della classifica:', error);
      }
    };

    fetchLeaderboard();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '40px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Dashboard Amministratore</h1>
      
      {/* Leaderboard Section */}
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '40px',
      }}>
        <h2>Classifica dei Referrer</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Posizione</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Referrals</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user.id}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{user.email}</td>
                <td style={tableCellStyle}>{user.referrals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Altre Funzioni Admin */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={adminButtonStyle}
          onClick={() => alert('Funzione di Cambio Stile del Pulsante (mock)')}
        >
          Cambia Stile Pulsante
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={adminButtonStyle}
          onClick={() => alert('Funzione di Generazione Link Referral Personalizzato (mock)')}
        >
          Genera Link Referral
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={adminButtonStyle}
          onClick={() => alert('Funzione di Cambio Sfondo del Sito (mock)')}
        >
          Cambia Sfondo Sito
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={adminButtonStyle}
          onClick={() => alert('Funzione di Aggiunta Sezione Extra (mock)')}
        >
          Aggiungi Sezione Extra
        </motion.button>
      </div>
    </motion.div>
  );
};

const tableHeaderStyle = {
  borderBottom: '2px solid #ddd',
  padding: '10px',
  textAlign: 'left',
  fontSize: '1.1rem',
};

const tableCellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '10px',
  fontSize: '1rem',
};

const adminButtonStyle = {
  backgroundColor: '#2f3542',
  color: '#fff',
  padding: '20px 40px',
  borderRadius: '12px',
  fontSize: '1.5rem',
  cursor: 'pointer',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

export default AdminDashboard;