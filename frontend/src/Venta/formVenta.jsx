import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const FormVenta = ({ buttonForm, venta, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Fec_Venta: '',
    Val_Venta: '',
    Id_Pedido: ''
  });

  const [initialData, setInitialData] = useState({
    Fec_Venta: '',
    Val_Venta: '',
    Id_Pedido: ''
  });

  const [errors, setErrors] = useState({
    Fec_Venta: '',
    Val_Venta: '',
    Id_Pedido: ''
  });

  useEffect(() => {
    if (venta) {
      setFormData(venta);
      setInitialData(venta); // Guardar los datos iniciales
    }
  }, [venta]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Fec_Venta) newErrors.Fec_Venta = 'La fecha es requerida.';
    if (!formData.Val_Venta) newErrors.Val_Venta = 'El valor es requerido.';
    if (!formData.Id_Pedido) newErrors.Id_Pedido = 'El ID del pedido es requerido.';

    if (formData.Val_Venta && isNaN(parseFloat(formData.Val_Venta))) {
      newErrors.Val_Venta = 'El valor debe ser un número.';
    }

    return newErrors;
  };

  const hasChanges = () => {
    return Object.keys(formData).some(key => formData[key] !== initialData[key]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
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
        <label htmlFor="Fec_Venta" className="form-label">Fecha de Venta</label>
        <input
          type="date"
          className={`form-control ${errors.Fec_Venta ? 'is-invalid' : ''}`}
          id="Fec_Venta"
          name="Fec_Venta"
          value={formData.Fec_Venta}
          onChange={handleChange}
        />
        {errors.Fec_Venta && <div className="invalid-feedback">{errors.Fec_Venta}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Val_Venta" className="form-label">Valor de Venta</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.Val_Venta ? 'is-invalid' : ''}`}
          id="Val_Venta"
          name="Val_Venta"
          value={formData.Val_Venta}
          onChange={handleChange}
        />
        {errors.Val_Venta && <div className="invalid-feedback">{errors.Val_Venta}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Pedido" className="form-label">ID del Pedido</label>
        <input
          type="text"
          className={`form-control ${errors.Id_Pedido ? 'is-invalid' : ''}`}
          id="Id_Pedido"
          name="Id_Pedido"
          value={formData.Id_Pedido}
          onChange={handleChange}
        />
        {errors.Id_Pedido && <div className="invalid-feedback">{errors.Id_Pedido}</div>}
      </div>
      <div className="mb-3 text-center">
        <Button variant="primary" onClick={handleSubmit}>
          {buttonForm}
        </Button>
      </div>
      <div className="text-center">
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default FormVenta;
