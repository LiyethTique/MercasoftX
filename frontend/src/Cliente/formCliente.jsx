import React, { useState, useEffect } from 'react';

const FormCliente = ({ buttonForm, cliente, URI, updateTextButton, setIsFormVisible, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Cliente: '',
    Cor_Cliente: '',
    Tel_Cliente: '',
    Id_Carrito: ''
  });

  const [isModified, setIsModified] = useState(false); // Nueva variable para verificar si se ha hecho algún cambio

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsModified(true); // Activar modificación cuando algún campo cambie
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isModified) { // Solo permitir el envío si se ha hecho algún cambio
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false); // Cancelar y cerrar el formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="Nom_Cliente" className="form-label">Nombre Cliente</label>
        <input
          type="text"
          className="form-control"
          id="Nom_Cliente"
          name="Nom_Cliente"
          value={formData.Nom_Cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Cor_Cliente" className="form-label">Correo Cliente</label>
        <input
          type="email"
          className="form-control"
          id="Cor_Cliente"
          name="Cor_Cliente"
          value={formData.Cor_Cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Tel_Cliente" className="form-label">Teléfono Cliente</label>
        <input
          type="number"
          className="form-control"
          id="Tel_Cliente"
          name="Tel_Cliente"
          value={formData.Tel_Cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Carrito" className="form-label">ID Carrito</label>
        <input
          type="number"
          className="form-control"
          id="Id_Carrito"
          name="Id_Carrito"
          value={formData.Id_Carrito}
          onChange={handleChange}
        />
      </div>

      {/* Contenedor para los botones */}
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={!isModified}>
          {buttonForm}
        </button>
      </div>
    </form>
  );
};

export default FormCliente;