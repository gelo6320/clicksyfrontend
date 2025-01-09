// frontend/components/ReferralSection.js
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const ReferralSection = () => {
  const { userData, token } = useContext(AuthContext);
  const [refLink, setRefLink] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (userData) {
      const uniqueRefLink = `${window.location.origin}/?ref=${userData.referralCode}`;
      setRefLink(uniqueRefLink);
    }
  }, [userData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink)
      .then(() => setStatusMessage('Link copiato negli appunti!'))
      .catch(() => setStatusMessage('Errore nel copiare il link.'));
    
    setTimeout(() => setStatusMessage(''), 3000);
  };

  if (!userData) return null;

  return (
    <div className="referral-section">
      <h3>Il tuo Link Referral Unico</h3>
      <div className="referral-container">
        <input 
          type="text" 
          value={refLink} 
          readOnly 
          className="referral-input"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="copy-button"
        >
          Copia
        </motion.button>
      </div>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      {/* Placeholder per eventuali pubblicità */}
      <div className="ad-placeholder">
        {/* Inserisci qui le pubblicità */}
      </div>

      {/* Styles */}
      <style jsx>{`
        .referral-section {
          background-color: #ffffff;
          padding: 30px 20px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          margin: 20px auto;
          max-width: 800px;
          text-align: center;
        }

        .referral-section h3 {
          margin-bottom: 20px;
          color: #2f3542;
        }

        .referral-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .referral-input {
          width: 70%;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .copy-button {
          background-color: #1e90ff;
          color: #fff;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .copy-button:hover {
          background-color: #2575fc;
        }

        .status-message {
          margin-top: 15px;
          color: #2ecc71;
          font-weight: 600;
        }

        .ad-placeholder {
          margin-top: 30px;
          padding: 20px;
          background-color: #f1f2f6;
          border-radius: 8px;
          color: #7f8c8d;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .referral-input {
            width: 100%;
          }

          .copy-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ReferralSection;