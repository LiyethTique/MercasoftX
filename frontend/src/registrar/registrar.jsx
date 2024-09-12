import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/registrar.css';


import NavPub from '../NavPub/NavPub';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = ({ setRegistered }) => {
  const [formData, setFormData] = useState({ Cor_Usuario: '', Password_Usuario: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { Cor_Usuario, Password_Usuario } = formData;

    if (!Cor_Usuario || !Password_Usuario) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    try {
      const response = await axios.post((process.env.REACT_APP_SERVER_BACK || 'http://localhost:3002') + '/auth/register', { Cor_Usuario, Password_Usuario });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
        });
        setRegistered(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'No se pudo registrar el usuario',
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
      <NavPub />  {/* Barra de navegación en la parte superior */}

      <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-header">
            <center>
              <h2>Registrar Usuario</h2>
              <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="150px" alt="Logo" />  
            </center>
          
          </div>
          <label htmlFor="Cor_Usuario">Correo Electrónico</label>
          <input
            type="email"
            id="Cor_Usuario"
            name="Cor_Usuario"
            value={formData.Cor_Usuario}
            onChange={handleInputChange}
            placeholder="Ingrese su correo"
          />

          <label htmlFor="Password_Usuario">Contraseña</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="Password_Usuario"
              name="Password_Usuario"
              value={formData.Password_Usuario}
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

          <center>
            <button type="submit" className="register-button">Registrar</button>
          </center>
        </form>
      </div>
    </>
  );
};

export default Register;