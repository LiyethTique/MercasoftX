import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormPedido = ({ buttonForm, pedido, URI, updateTextButton, setIsFormVisible, onSubmit }) => {
  const [formData, setFormData] = useState({
    Fec_Pedido: '',
    Id_Cliente: '',
    Est_Pedido: '',
    Val_Pedido: ''
  });

  useEffect(() => {
    if (pedido) {
      setFormData({
        Fec_Pedido: pedido.Fec_Pedido || '',
        Id_Cliente: pedido.Id_Cliente || '',
        Est_Pedido: pedido.Est_Pedido || '',
        Val_Pedido: pedido.Val_Pedido || ''
      });
    }
  }, [pedido]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Actualizar') {
        await axios.put(`${URI}/${pedido.Id_Pedido}`, formData);
        updateTextButton('Enviar');
      } else {
        await axios.post(URI, formData);
      }
      onSubmit(formData); // Llama a la función onSubmit para actualizar la lista
      clearForm();
    } catch (error) {
      alert('Error al procesar el pedido');
    }
  };

  const clearForm = () => {
    setFormData({
      Fec_Pedido: '',
      Id_Cliente: '',
      Est_Pedido: '',
      Val_Pedido: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="Fec_Pedido" className="form-label">Fecha del Pedido</label>
        <input
          type="date"
          className="form-control"
          id="Fec_Pedido"
          name="Fec_Pedido"
          value={formData.Fec_Pedido}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Cliente" className="form-label">ID del Cliente</label>
        <input
          type="number"
          className="form-control"
          id="Id_Cliente"
          name="Id_Cliente"
          value={formData.Id_Cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Est_Pedido" className="form-label">Estado del Pedido</label>
        <input
          type="text"
          className="form-control"
          id="Est_Pedido"
          name="Est_Pedido"
          value={formData.Est_Pedido}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Val_Pedido" className="form-label">Valor del Pedido</label>
        <input
          type="number"
          className="form-control"
          id="Val_Pedido"
          name="Val_Pedido"
          value={formData.Val_Pedido}
          step="0.01"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormPedido;