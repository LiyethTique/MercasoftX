// src/components/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const URI = process.env.REACT_APP_SERVER_BACK + '/auth/reset-password/';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${URI}${token}/verify`); // Verificar el token
        if (!response.data.valid) {
          // Si el token no es válido, redirigir
          Swal.fire('Token no válido', 'El token que has proporcionado no es válido. Por favor, solicita un nuevo enlace de restablecimiento de contraseña.', 'error');
          navigate('/login'); // Redirigir a la página de login o a otra que prefieras
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al verificar el token. Inténtalo de nuevo.', 'error');
        navigate('/login'); // Redirigir en caso de error
      }
    };

    verifyToken();
  }, [token, navigate]);

  const validatePassword = (pwd) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    return pwd.length >= minLength && hasUpperCase && hasLowerCase;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, con al menos una letra mayúscula y una letra minúscula.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await axios.post(`${URI}${token}`, { Password_Usuario: password });
      Swal.fire('Contraseña restablecida', 'Tu contraseña ha sido restablecida con éxito', 'success');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Hubo un error al restablecer la contraseña. Inténtalo de nuevo.';
        setError(errorMessage);
      } else {
        setError('Error de conexión. Por favor, verifica tu red e intenta nuevamente.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      textAlign: 'center',
    },
    errorMessage: {
      color: '#ff3333',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '1rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '10px',
      transition: 'border-color 0.3s',
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
    eyeIcon: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '1.2rem',
      color: 'black',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Restablecer Contraseña</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <div style={styles.inputContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <FontAwesomeIcon 
            icon={showPassword ? faEye : faEyeSlash} 
            style={styles.eyeIcon} 
            onClick={togglePasswordVisibility} 
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <br />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}>
          Restablecer Contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
