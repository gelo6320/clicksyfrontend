// frontend/components/ReferralSection.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCopy } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const ReferralSection = () => {
  const { userData, token } = useContext(AuthContext);
  const [refMessage, setRefMessage] = useState('');

  if (!userData) return null; // Non mostrare nulla se l'utente non è autenticato

  const personalRefLink = typeof window !== 'undefined'
    ? `${window.location.origin}?ref=${userData.referralCode}`
    : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(personalRefLink)
      .then(() => setRefMessage('Link copiato negli appunti!'))
      .catch(() => setRefMessage('Errore nel copiare il link.'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '12px',
        marginTop: '20px',
        maxWidth: '600px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        margin: '0 auto',
      }}
    >
      <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontWeight: '600' }}>
        Il tuo Link di Riferimento
      </h3>
      <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '20px' }}>
        Condividi questo link con i tuoi amici per ottenere vantaggi esclusivi!
      </p>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '15px',
      }}>
        <input
          type="text"
          value={personalRefLink}
          readOnly
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            backgroundColor: '#ffffff',
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          style={{
            backgroundColor: '#3498db',
            color: '#fff',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <FaCopy />
          Copia
        </motion.button>
      </div>
      {refMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '10px' }}
        >
          {refMessage}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ReferralSection;