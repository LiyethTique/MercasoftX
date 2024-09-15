import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormCliente = ({ buttonForm, cliente, URI, updateTextButton, setIsFormVisible, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Cliente: '',
    Cor_Cliente: '',
    Tel_Cliente: '',
    Id_Carrito: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          type="text"
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
      <button type="submit" className="btn btn-primary">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormCliente;