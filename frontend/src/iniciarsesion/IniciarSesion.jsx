import React, { useState } from 'react';
import axios from 'axios';
import { ClientSession } from 'react-client-session';
import './IniciarSesion.css'; // Importa los estilos que ya definiste
import NavPub from '../NavPub/NavPub';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Asegúrate de importar los íconos correctamente
import { Link } from 'react-router-dom'; // Asegúrate de importar Link si lo estás usando

const URI = process.env.REACT_APP_SERVER_BACK + '/auth/login';

ClientSession && ClientSession.setStoreType("localStorage"); // Guardar la sesión en el localStorage

const LoginForm = () => {
  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Manejar el submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post(URI, {
        Cor_Usuario: email,
        Password_Usuario: password,
      });

      console.log(response.data); // Imprime la respuesta para verificar el formato

      if (response.data.success) {
        ClientSession.set('userId', response.data.userId);
        alert('Login exitoso');
      } else {
        setError('Correo o contraseña incorrectos.');
        console.log(response.data.error);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.response ? error.response.data : error.message);
      setError('Hubo un problema con el inicio de sesión.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <>
      <NavPub />  {/* Barra de navegación en la parte superior */}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <center>
            <h2>Iniciar Sesión</h2>
            <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="150px" alt="Logo" />
          </center>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Ingrese su correo"
          />

          <label htmlFor="password">Contraseña</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Ingrese su contraseña"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <br />
          <center>
          <button type="submit" className="login-button">Iniciar Sesión</button>
          <br />
          
          <p className="register-prompt">
            <br />
            ¿No tienes una cuenta? <Link to="/register" className="register-link">Regístrate aquí</Link>
          </p>
          </center>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
