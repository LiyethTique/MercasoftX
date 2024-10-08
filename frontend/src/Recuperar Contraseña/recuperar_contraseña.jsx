import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavPub from '../NavPub/NavPub';

const URI = process.env.REACT_APP_SERVER_BACK + '/auth/recuperar-contrasena';

const RecuperarContrasena = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({ email: '', general: '' });

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
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      Swal.fire({
        title: 'Enviando...',
        text: 'Estamos procesando tu solicitud de recuperación de contraseña.',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(URI, {
        Cor_Usuario: formData.email,
      });

      Swal.close();

      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Hemos enviado un enlace de recuperación a tu correo.',
      });
    } catch (error) {
      Swal.close();
      if (error.response && error.response.status === 404) {
        setErrors({ ...errors, general: 'El correo ingresado no está registrado.' });
      } else {
        setErrors({ ...errors, general: 'Ocurrió un problema. Inténtalo más tarde.' });
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
    },
    form: {
      background: '#ffffff',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      width: '400px',
    },
    title: {
      color: '#ff6600',
      marginBottom: '1rem',
    },
    errorMessage: {
      color: '#ff3333',
      marginBottom: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '10px',
      transition: 'border-color 0.3s',
    },
    inputError: {
      borderColor: '#ff3333',
    },
    button: {
      backgroundColor: '#ff6600',
      color: '#ffffff',
      padding: '0.75rem',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      width: '100%',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#e55a00',
    },
  };

  return (
    <>
      <NavPub />
      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <center>
            <h2 style={styles.title}>Recuperar Contraseña</h2>
            <img src="/Logo-Icono.svg" width="150px" alt="Logo" />
          </center>

          <div className="mb-3">
            {errors.email && <div style={styles.errorMessage}>{errors.email}</div>}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese su correo"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              required
            />
          </div>

          {errors.general && <p style={styles.errorMessage}>{errors.general}</p>}

          <button 
            type="submit" 
            style={styles.button} 
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)} 
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}>
            Recuperar Contraseña
          </button>
        </form>
      </div>
    </>
  );
};

export default RecuperarContrasena;
