import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const FormPedido = ({ buttonForm, pedido, onSubmit }) => {
  const [formData, setFormData] = useState({
    Fec_Pedido: '',
    Est_Pedido: '',
    Val_Pedido: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Si hay un pedido, carga sus datos en formData
    if (pedido) {
      setFormData({
        Fec_Pedido: pedido.Fec_Pedido || '',
        Est_Pedido: pedido.Est_Pedido || '',
        Val_Pedido: pedido.Val_Pedido || 0,
      });
      setErrors({}); // Resetear errores al cargar nuevo pedido
    }
  }, [pedido]); // Solo dependemos de `pedido`

  const validateForm = () => {
    const newErrors = {};
    
    // Validación de campos en formData
    if (!formData.Fec_Pedido) newErrors.Fec_Pedido = 'La fecha es requerida.';
    if (!formData.Est_Pedido?.trim()) newErrors.Est_Pedido = 'El estado del pedido es requerido.';
    if (formData.Val_Pedido === undefined || formData.Val_Pedido < 0) newErrors.Val_Pedido = 'El valor del pedido debe ser un número válido.';

    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await onSubmit(formData); // Pasa formData a la función onSubmit
      setErrors({}); // Resetear el formulario después de una operación exitosa
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error desconocido. Intente de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="form-pedido">
      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Fec_Pedido" className="form-label">Fecha de Pedido:</label>
          <input
            type="date"
            className={`form-control ${errors.Fec_Pedido ? 'is-invalid' : ''}`}
            id="Fec_Pedido"
            name="Fec_Pedido"
            value={formData.Fec_Pedido || ''}
            onChange={handleInputChange} // Cambié a handleInputChange
            disabled={!!pedido} // Deshabilitar si estamos editando
          />
          {errors.Fec_Pedido && (
            <div className="invalid-feedback">
              {errors.Fec_Pedido}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Est_Pedido" className="form-label">Estado del Pedido:</label>
          <select
            className={`form-select ${errors.Est_Pedido ? 'is-invalid' : ''}`}
            id="Est_Pedido"
            name="Est_Pedido"
            value={formData.Est_Pedido || ''}
            onChange={handleInputChange} // Cambié a handleInputChange
          >
            <option value="">Seleccione el estado</option>
    <option value="Entregado">Entregado</option>
    <option value="No entregado">No entregado</option>
    <option value="En espera">En Espera</option>
    <option value="Confirmado">Confirmado</option>
    <option value="Cancelado">Cancelado</option>
          </select>
          {errors.Est_Pedido && (
            <div className="invalid-feedback">
              {errors.Est_Pedido}
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Val_Pedido" className="form-label">Valor del Pedido:</label>
          <input
            type="number"
            className={`form-control ${errors.Val_Pedido ? 'is-invalid' : ''}`}
            id="Val_Pedido"
            name="Val_Pedido"
            value={formData.Val_Pedido || ''}
            onChange={handleInputChange} // Cambié a handleInputChange
            placeholder="Ingrese el valor del pedido"
            disabled={!!pedido} // Deshabilitar si estamos editando
          />
          {errors.Val_Pedido && (
            <div className="invalid-feedback">
              {errors.Val_Pedido}
            </div>
          )}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Button variant="primary" onClick={handleSubmit}>
            {buttonForm}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

FormPedido.propTypes = {
  buttonForm: PropTypes.string.isRequired,
  pedido: PropTypes.shape({
    Fec_Pedido: PropTypes.string,
    Est_Pedido: PropTypes.string,
    Val_Pedido: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default FormPedido;
