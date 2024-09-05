import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavPub from '../NavPub/NavPub';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userMercasoft'));
    if (user) {
      navigate('/home'); // Redirigir si ya está autenticado
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.SERVER_BACK}/auth/login`, { email, password });
      const { tokenUser } = response.data;

      // Guardar token en localStorage
      localStorage.setItem('userMercasoft', JSON.stringify({ tokenUser }));

      // Redirigir a la página principal o dashboard
      navigate('/home');
    } catch (error) {
      setError('Credenciales incorrectas, por favor intenta de nuevo.');
    }
  };

  return (
    <>
      <NavPub />
      <div className="auth-container">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
      </div>
    </>
  );
};

export default Auth;