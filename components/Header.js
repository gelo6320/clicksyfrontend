// frontend/components/Header.js
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, handleLogout, setShowLogin } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Gioca', link: '#gioca' },
    { name: 'Come funziona', link: '#come-funziona' },
    { name: 'La tua probabilità', link: '#la-tua-probabilita' },
    { name: 'Contattaci', link: '#contattaci' },
    { name: 'Log out', action: handleLogout },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="header"
      >
        <div className="header-container">
          <div className="logo">
            <a href="/">
              <img
                src="https://mock-image-hosting-service.com/uploads/Clicksy.png"
                alt="Clicksy Logo"
                className="logo-image"
              />
            </a>
          </div>
          {isLoggedIn ? (
            <nav className="nav-menu">
              <ul className="menu-items">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.link ? (
                      <a href={item.link}>{item.name}</a>
                    ) : (
                      <button onClick={item.action} className="logout-button">
                        {item.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <div className="hamburger" onClick={toggleSidebar}>
                {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </div>
            </nav>
          ) : (
            <div className="auth-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLogin(true)}
                className="login-button"
              >
                Login
              </motion.button>
            </div>
          )}
        </div>
      </motion.header>

      {/* Sidebar for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && isLoggedIn && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="sidebar"
          >
            <ul className="sidebar-menu">
              {menuItems.map((item, index) => (
                <li key={index} onClick={() => { 
                  if (item.action) item.action(); 
                  toggleSidebar();
                }}>
                  {item.link ? (
                    <a href={item.link}>{item.name}</a>
                  ) : (
                    <button onClick={item.action} className="logout-button">
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style jsx>{`
        .header {
          width: 100%;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-image {
          height: 50px;
          width: auto;
        }

        .nav-menu {
          display: flex;
          align-items: center;
        }

        .menu-items {
          list-style: none;
          display: flex;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .menu-items li a {
          text-decoration: none;
          color: #2f3542;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .menu-items li a:hover {
          color: #3498db;
        }

        .logout-button {
          background: none;
          border: none;
          color: #e74c3c;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .logout-button:hover {
          color: #c0392b;
        }

        .login-button {
          background-color: #1e90ff;
          color: #fff;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-button:hover {
          background-color: #2575fc;
        }

        .hamburger {
          display: none;
          cursor: pointer;
          margin-left: 20px;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
        }

        /* Sidebar Styles */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100vh;
          background-color: #ffffff;
          box-shadow: 2px 0 5px rgba(0,0,0,0.1);
          padding-top: 60px;
          z-index: 999;
          box-sizing: border-box;
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-menu li {
          padding: 15px 20px;
          border-bottom: 1px solid #ddd;
        }

        .sidebar-menu li a {
          text-decoration: none;
          color: #2f3542;
          font-weight: 600;
          display: block;
          transition: color 0.3s ease;
        }

        .sidebar-menu li a:hover {
          color: #3498db;
        }

        .sidebar-menu li button.logout-button {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          color: #e74c3c;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .sidebar-menu li button.logout-button:hover {
          color: #c0392b;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .menu-items {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }

        /* Ensure the header spans the full width */
        @media (min-width: 1201px) {
          .header-container {
            padding: 10px 40px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;