import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormPedido = ({ buttonForm, pedido, onSubmit }) => {
  const [formData, setFormData] = useState({
    Fec_Pedido: '',
    Id_Cliente: '',
    Est_Pedido: '',
    Val_Pedido: ''
  });
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    if (pedido) {
      setFormData(pedido);
    }
    // Fetch clientes on component mount
    fetchClientes();
  }, [pedido]);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_BACK + '/cliente/');
      setClientes(response.data);
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

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
        <label htmlFor="Fec_Pedido" className="form-label">Fecha Pedido</label>
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
        <label htmlFor="Id_Cliente" className="form-label">Cliente</label>
        <select
          className="form-control"
          id="Id_Cliente"
          name="Id_Cliente"
          value={formData.Id_Cliente}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un cliente</option>
          {clientes && clientes.map(cliente => (
            <option key={cliente.Id_Cliente} value={cliente.Id_Cliente}>
              {cliente.Nom_Cliente}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="Est_Pedido" className="form-label">Estado Pedido</label>
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
        <label htmlFor="Val_Pedido" className="form-label">Valor Pedido</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          id="Val_Pedido"
          name="Val_Pedido"
          value={formData.Val_Pedido}
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
