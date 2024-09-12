import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import '../css/iniciarSesion.css';
import NavPub from '../NavPub/NavPub';

const Login = ({ setAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    try {
      const response = await axios.post((process.env.REACT_APP_SERVER_BACK || 'http://localhost:3002') + '/auth/login', { email, password });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
        });
        setAuthenticated(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Credenciales incorrectas',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de servidor',
        text: error.response?.data?.message || 'Error al intentar conectarse con el servidor',
      });
    }
  };

  return (
    <>
      <NavPub/>  {/* Barra de navegación en la parte superior */}
      
      <div className="login-container">
       
        <form className="login-form" onSubmit={handleLogin}>
          <center>
        <h2>Iniciar Sesión</h2>
        <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="100px" alt="Logo" />
        </center>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Ingrese su correo"
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Ingrese su contraseña"
          />

          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <p className="register-prompt">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </>
  );
};

export default Login;