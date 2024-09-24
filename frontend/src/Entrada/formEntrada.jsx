import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const FormEntrada = ({ buttonForm, entrada, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Fec_Entrada: '',
    Hor_Entrada: '',
    Id_Unidad: '',
    Id_Producto: '',
    Id_Responsable: '',
    Can_Entrada: '',
    Fec_Vencimiento: '',
  });

  const [initialData, setInitialData] = useState({
    Fec_Entrada: '',
    Hor_Entrada: '',
    Id_Unidad: '',
    Id_Producto: '',
    Id_Responsable: '',
    Can_Entrada: '',
    Fec_Vencimiento: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (entrada) {
      setFormData(entrada);
      setInitialData(entrada);
    }
  }, [entrada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Fec_Entrada) newErrors.Fec_Entrada = 'La fecha de entrada es requerida.';
    if (!formData.Hor_Entrada) newErrors.Hor_Entrada = 'La hora de entrada es requerida.';
    if (!formData.Id_Unidad) newErrors.Id_Unidad = 'La unidad es requerida.';
    if (!formData.Id_Producto) newErrors.Id_Producto = 'El producto es requerido.';
    if (!formData.Id_Responsable) newErrors.Id_Responsable = 'El responsable es requerido.';
    if (!formData.Fec_Vencimiento) newErrors.Fec_Vencimiento = 'La fecha de vencimiento es requerida.';
    if (formData.Id_Unidad <= 0) newErrors.Id_Unidad = 'La unidad debe ser mayor a 0.';
    if (formData.Id_Producto <= 0) newErrors.Id_Producto = 'El producto debe ser mayor a 0.';
    if (formData.Id_Responsable <= 0) newErrors.Id_Responsable = 'El responsable debe ser mayor a 0.';
    if (formData.Can_Entrada <= 0) newErrors.Can_Entrada = 'La cantidad de entrada debe ser mayor a 0.';
    return newErrors;
  };

  const hasChanges = () => {
    return Object.keys(formData).some((key) => formData[key] !== initialData[key]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!hasChanges()) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin Cambios',
        text: 'Debe realizar al menos un cambio en el formulario.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      Swal.fire({
        icon: 'success',
        title: 'Entrada registrada exitosamente',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar la entrada',
        text: 'Ocurrió un error al enviar los datos',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="mb-3">
        <label htmlFor="Fec_Entrada" className="form-label">Fecha de Entrada</label>
        <input
          type="date"
          className={`form-control ${errors.Fec_Entrada ? 'is-invalid' : ''}`}
          id="Fec_Entrada"
          name="Fec_Entrada"
          value={formData.Fec_Entrada}
          onChange={handleChange}
        />
        {errors.Fec_Entrada && <div className="invalid-feedback">{errors.Fec_Entrada}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="Hor_Entrada" className="form-label">Hora de Entrada</label>
        <input
          type="time"
          className={`form-control ${errors.Hor_Entrada ? 'is-invalid' : ''}`}
          id="Hor_Entrada"
          name="Hor_Entrada"
          value={formData.Hor_Entrada}
          onChange={handleChange}
        />
        {errors.Hor_Entrada && <div className="invalid-feedback">{errors.Hor_Entrada}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="Id_Unidad" className="form-label">Nombre de la Unidad</label>
        <input
          type="number"
          className={`form-control ${errors.Id_Unidad ? 'is-invalid' : ''}`}
          id="Id_Unidad"
          name="Id_Unidad"
          value={formData.Id_Unidad}
          onChange={handleChange}
        />
        {errors.Id_Unidad && <div className="invalid-feedback">{errors.Id_Unidad}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="Id_Producto" className="form-label">Nombre del Producto</label>
        <input
          type="number"
          className={`form-control ${errors.Id_Producto ? 'is-invalid' : ''}`}
          id="Id_Producto"
          name="Id_Producto"
          value={formData.Id_Producto}
          onChange={handleChange}
        />
        {errors.Id_Producto && <div className="invalid-feedback">{errors.Id_Producto}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="Id_Responsable" className="form-label">Nombre del Responsable</label>
        <input
          type="number"
          className={`form-control ${errors.Id_Responsable ? 'is-invalid' : ''}`}
          id="Id_Responsable"
          name="Id_Responsable"
          value={formData.Id_Responsable}
          onChange={handleChange}
        />
        {errors.Id_Responsable && <div className="invalid-feedback">{errors.Id_Responsable}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="Can_Entrada" className="form-label">Cantidad Entrada</label>
        <input
          type="number"
          className={`form-control ${errors.Can_Entrada ? 'is-invalid' : ''}`}
          id="Can_Entrada"
          name="Can_Entrada"
          value={formData.Can_Entrada}
          onChange={handleChange}
        />
        {errors.Can_Entrada && <div className="invalid-feedback">{errors.Can_Entrada}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="Fec_Vencimiento" className="form-label">Fecha de Vencimiento</label>
        <input
          type="date"
          className={`form-control ${errors.Fec_Vencimiento ? 'is-invalid' : ''}`}
          id="Fec_Vencimiento"
          name="Fec_Vencimiento"
          value={formData.Fec_Vencimiento}
          onChange={handleChange}
        />
        {errors.Fec_Vencimiento && <div className="invalid-feedback">{errors.Fec_Vencimiento}</div>}
      </div>

      <div className="text-center">
        <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : buttonForm}
        </Button>
      </div>
    </div>
  );
};

export default FormEntrada;