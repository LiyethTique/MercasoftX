import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import './registrar.css'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Registrar Usuario</h2>
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
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          required
        />

        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme su contraseña"
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit" className="register-button">Registrar</button>

        <p className="login-prompt">
          ¿Ya tienes una cuenta? <Link to="/login" className="login-link">Iniciar Sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
