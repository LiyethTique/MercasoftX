import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavPub from '../NavPub/NavPub.jsx';



const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('URL_DE_TU_API_DE_AUTENTICACION', {
        email,
        password
      });
      const user = response.data;
      localStorage.setItem('userMercasoft', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      setError('Credenciales incorrectas, por favor intenta de nuevo.');
    }
  };

  return (
    <>
      <NavPub />
      <div className="contenedor-formulario">
      
      <main className="form-signin w-100 m-auto">
  <form onSubmit={handleLogin}>
    <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="85px"/>
    
    <h1 className="h3 mb-3 fw-normal">Iniciar Sesión</h1>
    {error && <p className="error">{error}</p>}
    <div className="form-floating">
      <input
        type="email"
        className="form-control"
        id="floatingInput"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="floatingInput">Correo Electrónico</label>
    </div>
    <div className="form-floating">
      <input
        type="password"
        className="form-control"
        id="floatingPassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label htmlFor="floatingPassword">Contraseña</label>
    </div>
    <button className="btn btn-primary w-100 py-2" type="submit">
      Iniciar Sesión
    </button>
  </form>
</main>
</div>

      



    </>
  );
};

export default Auth;
