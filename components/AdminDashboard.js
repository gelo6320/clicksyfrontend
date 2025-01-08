// frontend/components/AdminDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaCheckCircle } from 'react-icons/fa';

const AdminDashboard = () => {
  const [buttonStyle, setButtonStyle] = useState('');
  const [background, setBackground] = useState('');
  const [customRef, setCustomRef] = useState('');
  const [extraSection, setExtraSection] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '20px' }}
        >
          <h3 style={{ color: '#57606f' }}>Cambia Stile Pulsante</h3>
          <input
            type="text"
            placeholder="CSS, colore ecc..."
            value={buttonStyle}
            onChange={(e) => setButtonStyle(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChangeButtonStyle}
            style={{
              backgroundColor: '#1e90ff',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaCheckCircle /> Applica
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: '20px' }}
        >
          <h3 style={{ color: '#57606f' }}>Genera Ref Link Personalizzato</h3>
          <input
            type="text"
            placeholder="Testo personalizzato"
            value={customRef}
            onChange={(e) => setCustomRef(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateRefLink}
            style={{
              backgroundColor: '#2ed573',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaCheckCircle /> Genera
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginBottom: '20px' }}
        >
          <h3 style={{ color: '#57606f' }}>Cambia Sfondo Sito</h3>
          <input
            type="text"
            placeholder="URL immagine o colore"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChangeBackground}
            style={{
              backgroundColor: '#3742fa',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaCheckCircle /> Cambia
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ marginBottom: '20px' }}
        >
          <h3 style={{ color: '#57606f' }}>Aggiungi Sezione Extra</h3>
          <textarea
            rows={4}
            placeholder="Codice o testo per la sezione..."
            value={extraSection}
            onChange={(e) => setExtraSection(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '10px', resize: 'vertical' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddSection}
            style={{
              backgroundColor: '#ffa502',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaPlus /> Aggiungi
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ color: '#ff4757', textAlign: 'center' }}
      >
        {statusMessage}
      </motion.p>
    </motion.div>
  );
};

export default AdminDashboard;