import React from 'react';

const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255,255,255,0.7)',
      padding: '10px 20px',
      borderRadius: '8px'
    }}>
      <div>
        <h2 style={{ margin: 0 }}>Clicksy</h2>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
        ) : (
          <p>Benvenuto su Clicksy</p>
        )}
      </div>
    </div>
  );
};

export default Header;
