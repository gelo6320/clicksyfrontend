import React, { useState } from 'react';
import axios from 'axios';

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

  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: 10,
      borderRadius: 8,
      marginTop: 20
    }}>
      <h3>Il tuo Ref Link Personale</h3>
      <p>Copialo e condividilo con i tuoi amici:</p>
      <p style={{ wordBreak: 'break-all' }}>{personalRefLink}</p>

      <button onClick={handleApplyReferral}>Applica referral (se presente da URL)</button>
      <p>{refMessage}</p>
    </div>
  );
};

export default ReferralSection;
