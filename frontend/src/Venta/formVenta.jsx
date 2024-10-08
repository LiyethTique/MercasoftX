// src/components/Venta/FormVenta.js
import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const FormVenta = ({ buttonForm, venta, onSubmit, onInputChange, formData }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [venta, formData]);

  const validateForm = () => {
    const newErrors = {};

    // Verificar si formData está definido
    if (!formData) {
      newErrors.formData = 'Los datos del formulario no están disponibles.';
      return newErrors;
    }

    // Validación de campos en formData
    if (!formData.Fec_Venta) newErrors.Fec_Venta = 'La fecha de venta es requerida.';
    if (!formData.Val_Venta) newErrors.Val_Venta = 'El valor de venta es requerido.';
    if (!formData.Tip_Cliente?.trim()) newErrors.Tip_Cliente = 'El tipo de cliente es requerido.';
    if (!formData.Id_Pedido) newErrors.Id_Pedido = 'El ID del pedido es requerido.';
    if (!formData.Id_Producto) newErrors.Id_Producto = 'El ID del producto es requerido.';

    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await onSubmit();
      // Resetear el formulario después de una operación exitosa si no es actualización
      if (buttonForm !== 'Actualizar') {
        setErrors({});
      }
    } catch (error) {
      console.error('Error al guardar la venta:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error desconocido. Intente de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="form-venta">
      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Fec_Venta" className="form-label">Fecha de Venta:</label>
          <input
            type="date"
            className={`form-control ${errors.Fec_Venta ? 'is-invalid' : ''}`}
            id="Fec_Venta"
            name="Fec_Venta"
            value={formData.Fec_Venta || ''}
            onChange={onInputChange}
          />
          {errors.Fec_Venta && (
            <div className="invalid-feedback">
              {errors.Fec_Venta}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Val_Venta" className="form-label">Valor de Venta:</label>
          <input
            type="number"
            className={`form-control ${errors.Val_Venta ? 'is-invalid' : ''}`}
            id="Val_Venta"
            name="Val_Venta"
            value={formData.Val_Venta || ''}
            onChange={onInputChange}
            placeholder="Ingrese el valor"
            step="0.01"
          />
          {errors.Val_Venta && (
            <div className="invalid-feedback">
              {errors.Val_Venta}
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Tip_Cliente" className="form-label">Tipo de Cliente:</label>
          <input
            type="text"
            className={`form-control ${errors.Tip_Cliente ? 'is-invalid' : ''}`}
            id="Tip_Cliente"
            name="Tip_Cliente"
            value={formData.Tip_Cliente || ''}
            onChange={onInputChange}
            placeholder="Ingrese el tipo de cliente"
          />
          {errors.Tip_Cliente && (
            <div className="invalid-feedback">
              {errors.Tip_Cliente}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Id_Pedido" className="form-label">ID de Pedido:</label>
          <input
            type="number"
            className={`form-control ${errors.Id_Pedido ? 'is-invalid' : ''}`}
            id="Id_Pedido"
            name="Id_Pedido"
            value={formData.Id_Pedido || ''}
            onChange={onInputChange}
            placeholder="Ingrese el ID del pedido"
          />
          {errors.Id_Pedido && (
            <div className="invalid-feedback">
              {errors.Id_Pedido}
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Id_Producto" className="form-label">ID de Producto:</label>
          <input
            type="number"
            className={`form-control ${errors.Id_Producto ? 'is-invalid' : ''}`}
            id="Id_Producto"
            name="Id_Producto"
            value={formData.Id_Producto || ''}
            onChange={onInputChange}
            placeholder="Ingrese el ID del producto"
          />
          {errors.Id_Producto && (
            <div className="invalid-feedback">
              {errors.Id_Producto}
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

FormVenta.propTypes = {
  buttonForm: PropTypes.string.isRequired,
  venta: PropTypes.shape({
    Fec_Venta: PropTypes.string,
    Val_Venta: PropTypes.number,
    Tip_Cliente: PropTypes.string,
    Id_Pedido: PropTypes.number,
    Id_Producto: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default FormVenta;
