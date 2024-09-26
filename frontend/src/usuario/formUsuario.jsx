import React from 'react';

const FormUsuario = ({ user, onSubmit }) => {
  const [correo, setCorreo] = useState(user ? user.Cor_Usuario : '');
  const [password, setPassword] = useState('');
  const [idResponsable, setIdResponsable] = useState(user ? user.Id_Responsable : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ correo, password, idResponsable });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Correo:</label>
      <input type="email" value={correo} onChange={(event) => setCorreo(event.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <br />
      <label>Responsable:</label>
      <input type="number" value={idResponsable} onChange={(event) => setIdResponsable(event.target.value)} />
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default FormUsuario;