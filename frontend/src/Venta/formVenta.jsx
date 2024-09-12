import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormVenta = ({ buttonForm, venta, onSubmit }) => {
  const [formData, setFormData] = useState({
    Fec_Venta: '',
    Val_Venta: '',
    Id_Pedido: ''
  });
  const [pedidos, setPedidos] = useState([]); // Estado para los pedidos

  useEffect(() => {
    if (venta) {
      setFormData(venta);
    }
  }, [venta]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BACK}/pedido/`);
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

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
        <label htmlFor="Fec_Venta" className="form-label">Fecha Venta</label>
        <input
          type="date"
          className="form-control"
          id="Fec_Venta"
          name="Fec_Venta"
          value={formData.Fec_Venta}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Val_Venta" className="form-label">Valor Venta</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          id="Val_Venta"
          name="Val_Venta"
          value={formData.Val_Venta}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Pedido" className="form-label">ID Pedido</label>
        <select
          className="form-control"
          id="Id_Pedido"
          name="Id_Pedido"
          value={formData.Id_Pedido}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione el valor del pedido</option>
          {pedidos && pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <option key={pedido.Id_Pedido} value={pedido.Id_Pedido}>
                {pedido.Val_Pedido}
              </option>
            ))
          ) : (
            <option value="">Cargando pedidos...</option>
          )}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormVenta;
