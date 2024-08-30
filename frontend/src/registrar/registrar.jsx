import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/estilos.css'; // Asegúrate de que el archivo CSS esté correctamente vinculado
import NavPub from '../NavPub/NavPub';

// Asegúrate de que SERVER_BACK esté correctamente configurado en el archivo .env
const URI = process.env.SERVER_BACK + '/usuario/';

const FormUsuario = () => {
  const [usuario, setUsuario] = useState({
    Con_Usuario: '',
    Password_Usuario: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!usuario.Con_Usuario || !usuario.Password_Usuario) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      // Enviar los datos al servidor
      const response = await axios.post(URI, usuario);
      Swal.fire('Éxito', 'Usuario registrado correctamente', 'success');
      // Reiniciar formulario
      setUsuario({
        Con_Usuario: '',
        Password_Usuario: '',
      });
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
    }
  };

  return (
    <>
      <NavPub />
      <br />
      <br />
      <div className="form-wrapper">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <center>
                <h2>Registrarse</h2>
              </center>
              <label htmlFor="Con_Usuario" className="form-label">Correo Electrónico:</label>
              <input
                type="text"
                className="form-control"
                id="Con_Usuario"
                name="Con_Usuario"
                value={usuario.Con_Usuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password_Usuario" className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="Password_Usuario"
                name="Password_Usuario"
                value={usuario.Password_Usuario}
                onChange={handleChange}
                required
              />
            </div>
            <center>
              <button type="submit" className="btn">Registrar</button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormUsuario;
