// src/components/Traslado/FormTraslado.js
import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const FormTraslado = ({ buttonForm, traslado, onSubmit, onInputChange, formData }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [traslado, formData]);

  const validateForm = () => {
    const newErrors = {};

    // Verificar si formData está definido
    if (!formData) {
      newErrors.formData = 'Los datos del formulario no están disponibles.';
      return newErrors;
    }

    // Validaciones para cada campo
    if (!formData.Fec_Traslado) newErrors.Fec_Traslado = 'La fecha es requerida.';
    if (!formData.Dcp_Traslado?.trim()) newErrors.Dcp_Traslado = 'La descripción es requerida.';
    if (!formData.Ori_Traslado?.trim() || !/^[a-zA-Z\s]+$/.test(formData.Ori_Traslado)) {
      newErrors.Ori_Traslado = 'El origen debe contener solo texto.';
    }
    if (!formData.Des_Traslado?.trim() || !/^[a-zA-Z\s]+$/.test(formData.Des_Traslado)) {
      newErrors.Des_Traslado = 'El destino debe contener solo texto.';
    }
    if (!formData.Uni_DeMedida?.trim()) newErrors.Uni_DeMedida = 'La unidad de medida es requerida.';
    if (!formData.Id_Producto) newErrors.Id_Producto = 'El ID del producto es requerido.';
    if (!formData.Can_Producto || isNaN(formData.Can_Producto)) newErrors.Can_Producto = 'La cantidad debe ser un número válido.';
    if (!formData.Val_Unitario || isNaN(formData.Val_Unitario)) newErrors.Val_Unitario = 'El valor unitario debe ser un número válido.';
    if (!formData.Id_Responsable) newErrors.Id_Responsable = 'El ID del responsable es requerido.';

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
      if (buttonForm !== 'Actualizar') {
        setErrors({});
      }
    } catch (error) {
      console.error('Error al guardar el traslado:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error desconocido. Intente de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="form-traslado">
      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Fec_Traslado" className="form-label">Fecha:</label>
          <input
            type="date"
            className={`form-control ${errors.Fec_Traslado ? 'is-invalid' : ''}`}
            id="Fec_Traslado"
            name="Fec_Traslado"
            value={formData.Fec_Traslado}
            onChange={onInputChange}
          />
          {errors.Fec_Traslado && (
            <div className="invalid-feedback">
              {errors.Fec_Traslado}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Dcp_Traslado" className="form-label">Descripción:</label>
          <input
            type="text"
            className={`form-control ${errors.Dcp_Traslado ? 'is-invalid' : ''}`}
            id="Dcp_Traslado"
            name="Dcp_Traslado"
            value={formData.Dcp_Traslado}
            onChange={onInputChange}
            placeholder="Ingrese la descripción"
          />
          {errors.Dcp_Traslado && (
            <div className="invalid-feedback">
              {errors.Dcp_Traslado}
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Ori_Traslado" className="form-label">Origen:</label>
          <input
            type="text"
            className={`form-control ${errors.Ori_Traslado ? 'is-invalid' : ''}`}
            id="Ori_Traslado"
            name="Ori_Traslado"
            value={formData.Ori_Traslado}
            onChange={onInputChange}
            placeholder="Ingrese el origen (solo texto)"
          />
          {errors.Ori_Traslado && (
            <div className="invalid-feedback">
              {errors.Ori_Traslado}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Des_Traslado" className="form-label">Destino:</label>
          <input
            type="text"
            className={`form-control ${errors.Des_Traslado ? 'is-invalid' : ''}`}
            id="Des_Traslado"
            name="Des_Traslado"
            value={formData.Des_Traslado}
            onChange={onInputChange}
            placeholder="Ingrese el destino (solo texto)"
          />
          {errors.Des_Traslado && (
            <div className="invalid-feedback">
              {errors.Des_Traslado}
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Uni_DeMedida" className="form-label">Unidad de Medida:</label>
          <input
            type="text"
            className={`form-control ${errors.Uni_DeMedida ? 'is-invalid' : ''}`}
            id="Uni_DeMedida"
            name="Uni_DeMedida"
            value={formData.Uni_DeMedida}
            onChange={onInputChange}
            placeholder="Ingrese la unidad de medida"
          />
          {errors.Uni_DeMedida && (
            <div className="invalid-feedback">
              {errors.Uni_DeMedida}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Id_Producto" className="form-label">ID Producto:</label>
          <input
            type="number"
            className={`form-control ${errors.Id_Producto ? 'is-invalid' : ''}`}
            id="Id_Producto"
            name="Id_Producto"
            value={formData.Id_Producto}
            onChange={onInputChange}
            placeholder="ID del producto"
          />
          {errors.Id_Producto && (
            <div className="invalid-feedback">
              {errors.Id_Producto}
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Can_Producto" className="form-label">Cantidad del Producto:</label>
          <input
            type="number"
            className={`form-control ${errors.Can_Producto ? 'is-invalid' : ''}`}
            id="Can_Producto"
            name="Can_Producto"
            value={formData.Can_Producto}
            onChange={onInputChange}
            placeholder="Ingrese la cantidad"
          />
          {errors.Can_Producto && (
            <div className="invalid-feedback">
              {errors.Can_Producto}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Val_Unitario" className="form-label">Valor Unitario:</label>
          <input
            type="number"
            className={`form-control ${errors.Val_Unitario ? 'is-invalid' : ''}`}
            id="Val_Unitario"
            name="Val_Unitario"
            value={formData.Val_Unitario}
            onChange={onInputChange}
            step="0.01"
            placeholder="Ingrese el valor unitario"
          />
          {errors.Val_Unitario && (
            <div className="invalid-feedback">
              {errors.Val_Unitario}
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Id_Responsable" className="form-label">ID Responsable:</label>
          <input
            type="number"
            className={`form-control ${errors.Id_Responsable ? 'is-invalid' : ''}`}
            id="Id_Responsable"
            name="Id_Responsable"
            value={formData.Id_Responsable}
            onChange={onInputChange}
            placeholder="ID del responsable"
          />
          {errors.Id_Responsable && (
            <div className="invalid-feedback">
              {errors.Id_Responsable}
            </div>
          )}
        </Col>
      </Row>

      <div className="text-center">
        <Button variant="primary" onClick={handleSubmit}>
          {buttonForm}
        </Button>
      </div>
    </div>
  );
};

FormTraslado.propTypes = {
  buttonForm: PropTypes.string.isRequired,
  traslado: PropTypes.shape({
    Fec_Traslado: PropTypes.string,
    Dcp_Traslado: PropTypes.string,
    Ori_Traslado: PropTypes.string,
    Des_Traslado: PropTypes.string,
    Uni_DeMedida: PropTypes.string,
    Id_Producto: PropTypes.number,
    Can_Producto: PropTypes.number,
    Val_Unitario: PropTypes.number,
    Id_Responsable: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default FormTraslado;
