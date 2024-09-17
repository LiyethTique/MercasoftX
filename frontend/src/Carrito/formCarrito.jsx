import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const FormCarrito = ({ buttonForm, carrito, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Id_Producto: '',
    Can_Producto: '',
    Id_Cliente: ''
  });

  useEffect(() => {
    if (carrito) {
      setFormData({
        Id_Producto: carrito.Id_Producto || '',
        Can_Producto: carrito.Can_Producto || '',
        Id_Cliente: carrito.Id_Cliente || ''
      });
    }
  }, [carrito]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Id_Producto, Can_Producto, Id_Cliente } = formData;
    if (!Id_Producto || !Can_Producto || !Id_Cliente) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    onSubmit(formData);
  };

  const handleClose = () => {
    if (onClose) {
      onClose(); // Llama a la función de cierre pasada por props
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="mb-3">
        <label htmlFor="Id_Producto" className="form-label">ID Producto</label>
        <input
          type="number"
          className="form-control"
          id="Id_Producto"
          name="Id_Producto"
          value={formData.Id_Producto}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Can_Producto" className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          id="Can_Producto"
          name="Can_Producto"
          value={formData.Can_Producto}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Cliente" className="form-label">ID Cliente</label>
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
      <div className="mt-3 d-flex justify-content-end">
        <Button type="button" className="btn btn-primary me-2" onClick={handleSubmit}>
          {buttonForm}
        </Button>
        <Button type="button" className="btn btn-secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default FormCarrito;
