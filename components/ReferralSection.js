// frontend/components/ReferralSection.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCopy } from 'react-icons/fa';

const ReferralSection = ({ userData }) => {
  const [refMessage, setRefMessage] = useState('');

  const handleApplyReferral = async () => {
    try {
      const refCode = new URLSearchParams(window.location.search).get('ref');
      if (refCode) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/referral`, {
          userId: userData.id,
          refCode
        });
        setRefMessage(res.data.message);
      } else {
        setRefMessage('Nessun ref link disponibile.');
      }
    } catch (error) {
      setRefMessage(error.response?.data?.message || 'Errore nell\'applicare referral.');
    }
  };

  const personalRefLink = typeof window !== 'undefined'
    ? `${window.location.origin}?ref=${userData?.referralCode}`
    : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(personalRefLink)
      .then(() => setRefMessage('Link copiato negli appunti!'))
      .catch(() => setRefMessage('Errore nel copiare il link.'));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: '#ffffffcc',
        padding: '20px',
        borderRadius: '12px',
        marginTop: '20px',
        width: '100%',
        maxWidth: '800px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ color: '#2f3542', marginBottom: '10px' }}>Il tuo Ref Link Personale</h3>
      <p style={{ color: '#57606f', marginBottom: '10px' }}>
        Copialo e condividilo con i tuoi amici. Chi invita riceve uno sconto di 6 ore quando l'invitato clicca il pulsante. L'invitato avrà un timer ridotto a 10 ore solo per la prima volta.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          value={personalRefLink}
          readOnly
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          style={{
            backgroundColor: '#1e90ff',
            color: '#fff',
            padding: '10px',
            borderRadius: '6px',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <FaCopy />
        </motion.button>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleApplyReferral}
        style={{
          backgroundColor: '#2ed573',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '6px',
          fontSize: '1rem',
          marginTop: '15px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Applica Referral
      </motion.button>
      <p style={{ color: '#ff4757', textAlign: 'center', marginTop: '10px' }}>{refMessage}</p>
    </motion.div>
  );
  // frontend/components/ReferralSection.js
// ... (resto del codice rimane invariato)

};

export default ReferralSection;