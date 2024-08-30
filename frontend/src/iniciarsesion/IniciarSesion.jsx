import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/estilos.css';
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
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
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
      </div>
    </>
  );
};

export default Login;
