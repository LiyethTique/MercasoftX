import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const FormPedido = ({ buttonForm, pedido, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Fec_Pedido: '',
    Id_Cliente: '',
    Est_Pedido: '',
    Val_Pedido: ''
  });

  const [initialData, setInitialData] = useState({
    Fec_Pedido: '',
    Id_Cliente: '',
    Est_Pedido: '',
    Val_Pedido: ''
  });

  const [errors, setErrors] = useState({
    Fec_Pedido: '',
    Id_Cliente: '',
    Est_Pedido: '',
    Val_Pedido: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Controlar envío de formulario

  useEffect(() => {
    if (pedido) {
      setFormData(pedido);
      setInitialData(pedido); // Guardar los datos iniciales
    }
  }, [pedido]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Fec_Pedido) newErrors.Fec_Pedido = 'La fecha es requerida.';
    if (formData.Id_Cliente <= 0) newErrors.Id_Cliente = 'El nombre del cliente debe ser mayor a 0.';
    if (formData.Val_Pedido <= 0) newErrors.Val_Pedido = 'El valor del pedido debe ser mayor a 0.';
    if (!formData.Est_Pedido) newErrors.Est_Pedido = 'El estado del pedido es requerido.';
    if (!formData.Val_Pedido) newErrors.Val_Pedido = 'El valor del pedido es requerido.';
    if (!formData.Id_Cliente) newErrors.Id_Cliente = 'El nombre del cliente es requerido.';

    return newErrors;
  };

  const hasChanges = () => {
    return Object.keys(formData).some(key => formData[key] !== initialData[key]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Evitar múltiples envíos mientras se procesa

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!hasChanges()) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin Cambios',
        text: 'Debe realizar al menos un cambio para enviar el formulario.',
      });
      return;
    }

    setIsSubmitting(true); // Bloquear el botón de enviar

    try {
      await onSubmit(formData); // Enviar datos al servidor
      Swal.fire({
        icon: 'success',
        title: 'Pedido registrado exitosamente',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el pedido',
        text: 'Ocurrió un error al enviar los datos',
      });
    } finally {
      setIsSubmitting(false); // Liberar el botón después de finalizar
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose(); // Llama a la función de cierre pasada por props
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="mb-3">
        <label htmlFor="Fec_Pedido" className="form-label">Fecha del Pedido</label>
        <input
          type="date"
          className={`form-control ${errors.Fec_Pedido ? 'is-invalid' : ''}`}
          id="Fec_Pedido"
          name="Fec_Pedido"
          value={formData.Fec_Pedido}
          onChange={handleChange}
        />
        {errors.Fec_Pedido && <div className="invalid-feedback">{errors.Fec_Pedido}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Cliente" className="form-label">Nombre del Cliente</label>
        <input
          type="number"
          className={`form-control ${errors.Id_Cliente ? 'is-invalid' : ''}`}
          id="Id_Cliente"
          name="Id_Cliente"
          value={formData.Id_Cliente}
          onChange={handleChange}
        />
        {errors.Id_Cliente && <div className="invalid-feedback">{errors.Id_Cliente}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Est_Pedido" className="form-label">Estado del Pedido</label>
        <select
          className={`form-control ${errors.Est_Pedido ? 'is-invalid' : ''}`}
          id="Est_Pedido"
          name="Est_Pedido"
          value={formData.Est_Pedido}
          onChange={handleChange}
        >
          <option value="">Seleccionar estado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En espera">En espera</option>
          <option value="Fallido">Fallido</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Procesando">Procesando</option>
          <option value="Completado">Completado</option>
        </select>
        {errors.Est_Pedido && <div className="invalid-feedback">{errors.Est_Pedido}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Val_Pedido" className="form-label">Valor del Pedido</label>
        <input
          type="number"
          className={`form-control ${errors.Val_Pedido ? 'is-invalid' : ''}`}
          id="Val_Pedido"
          name="Val_Pedido"
          value={formData.Val_Pedido}
          onChange={handleChange}
          step="0.01"
        />
        {errors.Val_Pedido && <div className="invalid-feedback">{errors.Val_Pedido}</div>}
      </div>
      <div className="mb-3 text-center">
        <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : buttonForm}
        </Button>
      </div>
    </div>
  );
};

export default FormPedido;