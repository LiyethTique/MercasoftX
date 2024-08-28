import { useState } from "react";
import axios from "axios";

const URI = process.env.ROUTER_PRINCIPAL + '/auth/';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const tokenForPassword = new URLSearchParams(window.location.search).get('llave');

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URI}reset-password`, { tokenForPassword, newPassword });
      setMessage(response.data.message);
      setNewPassword('');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <NavPub />
      <div className="contenedor-formulario">
        <main className="form-signin w-100 m-auto">
          <form onSubmit={updatePassword}>
            <img rel="icon" type="image/svg+xml" src="/Logo-Icono.svg" width="85px"/>
            <h1 className="h3 mb-3 fw-normal">Restablecer Contraseña</h1>
            {message && (
              <p className="bg-info">
                {message}, por favor vuelva al inicio de sesión
              </p>
            )}
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingInput"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Nueva Contraseña</label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              Restablecer Contraseña
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default ResetPassword;