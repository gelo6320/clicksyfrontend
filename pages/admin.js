import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
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
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Cambia estetica pulsante</h2>
        <input
          type="text"
          placeholder="CSS, colore ecc..."
          value={buttonStyle}
          onChange={(e) => setButtonStyle(e.target.value)}
        />
        <button onClick={handleChangeButtonStyle}>Applica</button>
      </div>

      <div>
        <h2>Genera Ref Link personalizzato</h2>
        <input
          type="text"
          placeholder="Testo personalizzato"
          value={customRef}
          onChange={(e) => setCustomRef(e.target.value)}
        />
        <button onClick={handleGenerateRefLink}>Genera</button>
      </div>

      <div>
        <h2>Cambia sfondo sito</h2>
        <input
          type="text"
          placeholder="URL immagine o colore"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />
        <button onClick={handleChangeBackground}>Cambia sfondo</button>
      </div>

      <div>
        <h2>Aggiungi sezione extra</h2>
        <textarea
          rows={4}
          placeholder="Codice o testo per la sezione..."
          value={extraSection}
          onChange={(e) => setExtraSection(e.target.value)}
        />
        <button onClick={handleAddSection}>Aggiungi</button>
      </div>

      <p>{statusMessage}</p>
    </div>
  );
};

export default AdminPage;