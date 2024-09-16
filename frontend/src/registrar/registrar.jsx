import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa los íconos
import './registrar.css';
import NavPub from '../NavPub/NavPub';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_BACK}/auth/register`, {
        email,
        password,
      });

      if (response.data.success) {
        setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        setError('Hubo un problema con el registro.');
      }
    } catch (error) {
      console.error('Error en el registro:', error.response ? error.response.data : error.message);
      setError('Hubo un problema con el registro.');
    }
  };

  return (
    <>
      <NavPub />
      <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
          <center>
            <h2>Registrar Usuario</h2>
            <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="150px" alt="Logo" />
          </center>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme su contraseña"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <center>
            <button type="submit" className="register-button">Registrar</button>
            <br />
            <p className="login-prompt" style={{ marginTop: '20px' }}>
              ¿Ya tienes una cuenta? <Link to="/login" className="login-link">Iniciar Sesión</Link>
            </p>
          </center>
        </form>
      </div>
    </>
  );
};

export default Register;
