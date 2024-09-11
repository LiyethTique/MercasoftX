import React from 'react';

const ModalFormulario = ({ show, handleClose, campos, registro, handleChange, handleSubmit }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{registro ? 'Editar Registro' : 'Nuevo Registro'}</h3>
        <form onSubmit={handleSubmit}>
          {campos.map((campo) => (
            <div key={campo}>
              <label>{campo}:</label>
              <input
                type="text"
                name={campo}
                value={registro[campo] || ''}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit">{registro ? 'Actualizar' : 'Registrar'}</button>
          <button type="button" onClick={handleClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalFormulario;