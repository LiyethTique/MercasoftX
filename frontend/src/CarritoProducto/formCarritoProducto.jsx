import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';


const FormCarritoProducto = ({ buttonForm, carritoProducto, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Id_carritoProducto: '',
    Id_Carrito: '',
    Id_Producto: ''
  });

  useEffect(() => {
    if (carritoProducto) {
      setFormData(carritoProducto);
    }
  }, [carritoProducto]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.Id_Carrito || !formData.Id_Producto) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    onSubmit(formData);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="mb-3">
        <label htmlFor="Id_Carrito" className="form-label">ID Carrito</label>
        <input
          type="number"
          className="form-control"
          id="Id_Carrito"
          name="Id_Carrito"
          value={formData.Id_Carrito}
          onChange={handleChange}
          required
        />
      </div>
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

export default FormCarritoProducto;
