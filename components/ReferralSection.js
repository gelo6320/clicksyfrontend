// frontend/components/ReferralSection.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const ReferralSection = () => {
  const { userData, token } = useContext(AuthContext);
  const [refCode, setRefCode] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleApplyReferral = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/referral`, {
        refCode
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStatusMessage(res.data.message);
    } catch (error) {
      setStatusMessage(error.response?.data?.message || 'Errore nell\'applicazione del referral.');
    }
  };

  if (!userData) return null;

  return (
    <div style={{ margin: '20px 0', width: '100%', maxWidth: '800px' }}>
      <h3 style={{ color: '#2f3542', marginBottom: '10px', textAlign: 'center' }}>Applica Referral</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="text" 
          value={refCode} 
          onChange={(e) => setRefCode(e.target.value)}
          placeholder="Inserisci codice referral"
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', flex: 1 }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyReferral}
          style={{
            backgroundColor: '#1e90ff',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Applica
        </motion.button>
      </div>
      {statusMessage && <p style={{ color: '#ff6b81', textAlign: 'center', marginTop: '10px' }}>{statusMessage}</p>}
    </div>
  );
};

export default ReferralSection;