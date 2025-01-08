// frontend/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaCheckCircle } from 'react-icons/fa';

const AdminDashboard = () => {
  const [buttonStyle, setButtonStyle] = useState('');
  const [background, setBackground] = useState('');
  const [customRef, setCustomRef] = useState('');
  const [extraSection, setExtraSection] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/leaderboard`);
      setLeaderboard(res.data.leaderboard);
    } catch (error) {
      setStatusMessage('Errore nel recuperare la leaderboard.');
    }
  };

  // Funzione per cambiare stile pulsante
  const handleChangeButtonStyle = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/change-button-style`, {
        newStyle: buttonStyle
      });
      setStatusMessage(res.data.message);
    } catch (error) {
      setStatusMessage('Errore nel cambiare lo stile pulsante.');
    }
  };

  // Genera link personalizzato
  const handleGenerateRefLink = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/generate-custom-ref-link`, {
        customText: customRef
      });
      setStatusMessage(`Link generato: ${res.data.link}`);
    } catch (error) {
      setStatusMessage('Errore nella generazione del ref link.');
    }
  };

  // Cambia sfondo
  const handleChangeBackground = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/change-background`, {
        background
      });
      setStatusMessage(res.data.message);
    } catch (error) {
      setStatusMessage('Errore nel cambiare lo sfondo.');
    }
  };

  // Aggiunge sezione extra
  const handleAddSection = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/add-section`, {
        extraSection
      });
      setStatusMessage(res.data.message);
    } catch (error) {
      setStatusMessage('Errore nell\'aggiunta sezione extra.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: 'linear-gradient(to right, #ece9e6, #ffffff)',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1 style={{ color: '#2f3542', marginBottom: '20px' }}>Admin Dashboard</h1>
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: '#ffffffcc',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '800px',
          marginBottom: '20px',
          overflowY: 'auto',
          maxHeight: '70vh'
        }}
      >
        <h2 style={{ color: '#2f3542', marginBottom: '15px' }}>Gestione</h2>

        {/* Altre sezioni di gestione... */}

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ marginBottom: '20px' }}
        >
          <h3 style={{ color: '#57606f' }}>Leaderboard Referral</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Posizione</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Email</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>Referral</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user.id}>
                  <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{index + 1}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{user.email}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{user.referrals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      <p style={{ color: '#ff4757', textAlign: 'center' }}>{statusMessage}</p>
    </motion.div>
  );
};

export default AdminDashboard;