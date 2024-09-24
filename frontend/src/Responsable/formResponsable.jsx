// src/components/Responsable/FormResponsable.js
import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const FormResponsable = ({ buttonForm, responsable, onSubmit, onInputChange, formData }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [responsable, formData]);

  const isValidPhone = (phone) => /^3\d{9}$/.test(phone);

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `${match[1]} ${match[2]} ${match[3]}` : cleaned;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Tel_Responsable') {
      const onlyNumbers = value.replace(/\D/g, '').slice(0, 10);
      if (onlyNumbers.startsWith('3')) {
        const formattedPhone = formatPhoneNumber(onlyNumbers);
        onInputChange({
          target: {
            name: name,
            value: formattedPhone
          }
        });
        setErrors({ ...errors, Tel_Responsable: '' });
      } else {
        setErrors({ ...errors, Tel_Responsable: 'El número de teléfono debe comenzar con 3.' });
      }
    } else {
      onInputChange(e);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Verificar si formData está definido
    if (!formData) {
      newErrors.formData = 'Los datos del formulario no están disponibles.';
      return newErrors;
    }
    
    // Verificar las propiedades dentro de formData con valores por defecto
    if (!formData.Nom_Responsable?.trim()) newErrors.Nom_Responsable = 'Ingrese un nombre válido.';
    if (!formData.Tel_Responsable?.trim()) newErrors.Tel_Responsable = 'El teléfono es requerido.';
    if (!formData.Tip_Responsable?.trim()) newErrors.Tip_Responsable = 'El tipo de responsable es requerido.';
    if (!formData.Tip_Genero?.trim()) newErrors.Tip_Genero = 'El género es requerido.';
  
    const phoneOnlyNumbers = formData.Tel_Responsable?.replace(/\D/g, '');
    if (formData.Tel_Responsable && !isValidPhone(phoneOnlyNumbers)) {
      newErrors.Tel_Responsable = 'El número de teléfono debe tener exactamente 10 dígitos y comenzar con 3.';
    }
  
    return newErrors;
  };
  

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // La validación de cambios se maneja en el componente padre (CrudResponsable)

    try {
      await onSubmit();
      // Resetear el formulario después de una operación exitosa si no es actualización
      if (buttonForm !== 'Actualizar') {
        setErrors({});
      }
    } catch (error) {
      console.error('Error al guardar el responsable:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error desconocido. Intente de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="form-responsable">
      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Nom_Responsable" className="form-label">Nombre:</label>
          <input
            type="text"
            className={`form-control ${errors.Nom_Responsable ? 'is-invalid' : ''}`}
            id="Nom_Responsable"
            name="Nom_Responsable"
            value={formData.Nom_Responsable}
            onChange={handleChange}
            placeholder="Ingrese el nombre"
          />
          {errors.Nom_Responsable && (
            <div className="invalid-feedback">
              {errors.Nom_Responsable}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Tel_Responsable" className="form-label">Teléfono:</label>
          <input
            type="text"
            className={`form-control ${errors.Tel_Responsable ? 'is-invalid' : ''}`}
            id="Tel_Responsable"
            name="Tel_Responsable"
            value={formData.Tel_Responsable}
            onChange={handleChange}
            inputMode="numeric"
            placeholder="Ingrese el teléfono"
          />
          {errors.Tel_Responsable && (
            <div className="invalid-feedback">
              {errors.Tel_Responsable}
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Tip_Responsable" className="form-label">Tipo de Responsable:</label>
          <select
            name="Tip_Responsable"
            id="Tip_Responsable"
            className={`form-control ${errors.Tip_Responsable ? 'is-invalid' : ''}`}
            value={formData.Tip_Responsable}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="Administrador">Administrador</option>
            <option value="Aprendiz">Aprendiz</option>
          </select>
          {errors.Tip_Responsable && (
            <div className="invalid-feedback">
              {errors.Tip_Responsable}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Tip_Genero" className="form-label">Género:</label>
          <select
            name="Tip_Genero"
            id="Tip_Genero"
            className={`form-control ${errors.Tip_Genero ? 'is-invalid' : ''}`}
            value={formData.Tip_Genero}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.Tip_Genero && (
            <div className="invalid-feedback">
              {errors.Tip_Genero}
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

FormResponsable.propTypes = {
  buttonForm: PropTypes.string.isRequired,
  responsable: PropTypes.shape({
    Nom_Responsable: PropTypes.string,
    Tel_Responsable: PropTypes.string,
    Tip_Responsable: PropTypes.string,
    Tip_Genero: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default FormResponsable;