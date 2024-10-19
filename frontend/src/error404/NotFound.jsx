// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Página no encontrada</h1>
      <p style={styles.message}>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" style={styles.link}>Volver al inicio</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    color: '#ff6600',
  },
  message: {
    fontSize: '1.5rem',
    color: '#666',
  },
  link: {
    fontSize: '1.2rem',
    color: '#ff6600',
    textDecoration: 'none',
    marginTop: '20px',
  },
};

export default NotFound;
