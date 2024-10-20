import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import './IniciarSesion.css';
import NavPub from '../NavPub/NavPub';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const URI = process.env.REACT_APP_SERVER_BACK + '/auth/login';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'El correo es requerido.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida.';
    }

    return newErrors;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.replace(/\s/g, '') });
    setErrors({ ...errors, [name]: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '', general: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación del formulario
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors({ ...errors, ...formErrors });
      return;
    }

    try {
      // Mostrar alerta personalizada en el centro de la pantalla con spinner
      Swal.fire({
        html: `
          <img src="/cargando.gif" alt="Cargando..." style="width: 100px; height: 100px; margin-bottom: 20px;">
          <p>Iniciando sesión...</p>
        `,
        customClass: {
          container: 'custom-container', // Agregar clase personalizada
          popup: 'custom-popup', // Agregar clase personalizada
        },
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 2000, // Duración de 2 segundos
        timerProgressBar: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(URI, {
        Cor_Usuario: formData.email,
        Password_Usuario: formData.password,
      });

      Swal.close();

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/pedido');
      }
    } catch (error) {
      Swal.close();

      if (error.response && error.response.status === 404) {
        setErrors({ ...errors, general: 'El correo ingresado no está registrado.' });
      } else if (error.response && error.response.status === 401) {
        setErrors({ ...errors, general: 'La contraseña es incorrecta.' });
      } else {
        setErrors({ ...errors, general: 'Hubo un problema con el inicio de sesión. Inténtalo más tarde.' });
      }
    }
  };

  return (
    <>
      <NavPub />
      <div className="login-page-container">
        <div className="login-left">
          <h1>Bienvenido a Mercasoft X</h1>
          <p>Accede a la plataforma para gestionar pedidos, administrar productos y mucho más. ¡Estamos encantados de tenerte de vuelta!</p>
        </div>

        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <center>
              <h2 className='h2'>Iniciar Sesión</h2>
              <img src="/Logo-Icono.svg" width="150px" alt="Logo" />
            </center>

            <div className="mb-3">
              {errors.email && <div className="error-message">{errors.email}</div>}
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese su correo"
                className={`form-control ${errors.email ? 'input-error' : ''}`}
                required
              />
            </div>

            <div className="mb-3">
              {errors.password && <div className="error-message">{errors.password}</div>}
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  placeholder="Ingrese su contraseña"
                  className={`form-control ${errors.password ? 'input-error' : ''}`}
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
            </div>

            {errors.general && <p className="error-message general-error">{errors.general}</p>}

            <button type="submit" className="login-button">Iniciar Sesión</button>

            <div className="mt-3 text-center">
              <a href="/recuperar-contrasena" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
