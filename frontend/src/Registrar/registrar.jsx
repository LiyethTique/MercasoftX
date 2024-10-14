import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './registrar.css'; // Asegúrate de tener el CSS correspondiente
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa los íconos
import NavPub from '../NavPub/NavPub';

const URI = `${process.env.REACT_APP_SERVER_BACK}/auth/register`; // Usa la variable de entorno correcta


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false); // Controla la visibilidad de la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Controla la visibilidad de la confirmación

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    return newErrors;
  };

  // Maneja el cambio en los campos y elimina espacios en las contraseñas
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Eliminar espacios en las contraseñas
    if (name === 'password' || name === 'confirmPassword') {
      setFormData({ ...formData, [name]: value.replace(/\s/g, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Limpiar errores al modificar el campo
    setErrors({ ...errors, [name]: '', general: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors({ ...errors, ...formErrors });
      return;
    }

    try {
      const response = await axios.post(URI, {
        Cor_Usuario: formData.email,
        Password_Usuario: formData.password,
      });

      if (response.data.message) {
        navigate('/login'); // Redirige al inicio de sesión después del registro
      }
    } catch (error) {
      console.error('Error en el registro:', error.response ? error.response.data : error.message);
      setErrors({ ...errors, general: 'Hubo un problema con el registro. Inténtalo más tarde.' });
    }
  };

  return (
    <>
      <NavPub />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <center>
            <h2>Registrarse</h2>
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

          <div className="mb-3 password-container">
            {errors.password && <div className="error-message">{errors.password}</div>}
            <input
              type={showPassword ? 'text' : 'password'} // Cambia entre 'password' y 'text'
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              className={`form-control ${errors.password ? 'input-error' : ''}`}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="password-toggle">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mb-3 password-container">
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            <input
              type={showConfirmPassword ? 'text' : 'password'} // Cambia entre 'password' y 'text'
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme su contraseña"
              className={`form-control ${errors.confirmPassword ? 'input-error' : ''}`}
              required
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.general && <p className="error-message general-error">{errors.general}</p>}

          <button type="submit" className="register-button">Registrar</button>

          <div className="mt-3 text-center">
            <p className="login-prompt">
              ¿Ya tienes una cuenta? <a href="/login" className="login-link">Iniciar Sesión</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
