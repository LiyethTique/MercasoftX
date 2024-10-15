import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import axios from 'axios';

const URI_UNIDAD = process.env.REACT_APP_SERVER_BACK + '/unidad';
const URI_AREA = process.env.REACT_APP_SERVER_BACK + '/area';
const URI_RESPONSABLE = process.env.REACT_APP_SERVER_BACK + '/responsable';

const FormUnidad = ({ buttonForm, unidad, onSubmit, onInputChange, formData }) => {
  const [errors, setErrors] = useState({});
  const [areas, setAreas] = useState([]);
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    setErrors({});
  }, [unidad, formData]);

  const token = localStorage.getItem('token'); // Obtener el token una vez

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [areaRes, responsableRes] = await Promise.all([
          axios.get(URI_AREA, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(URI_RESPONSABLE, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setAreas(areaRes.data);
        setResponsables(responsableRes.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [token]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Nom_Unidad.trim()) newErrors.Nom_Unidad = 'Ingrese un nombre de unidad válido.';
    if (!formData.Id_Area) newErrors.Id_Area = 'Seleccione un área.';
    if (!formData.Id_Responsable) newErrors.Id_Responsable = 'Seleccione un responsable.';
    
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
        // Reseteo de los campos de entrada aquí si es necesario
      }
    } catch (error) {
      console.error('Error al guardar la unidad:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error desconocido. Intente de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="form-unidad">
      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Nom_Unidad" className="form-label">Nombre de la Unidad:</label>
          <input
            type="text"
            name="Nom_Unidad"
            id="Nom_Unidad"
            className={`form-control ${errors.Nom_Unidad ? 'is-invalid' : ''}`}
            value={formData.Nom_Unidad}
            onChange={onInputChange}
          />
          {errors.Nom_Unidad && <div className="invalid-feedback">{errors.Nom_Unidad}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Id_Area" className="form-label">Área:</label>
          <select
            name="Id_Area"
            id="Id_Area"
            className={`form-control ${errors.Id_Area ? 'is-invalid' : ''}`}
            value={formData.Id_Area}
            onChange={onInputChange}
          >
            <option value="">Seleccione el área</option>
            {areas.map((area) => (
              <option key={area.Id_Area} value={area.Id_Area}>
                {area.Nom_Area}
              </option>
            ))}
          </select>
          {errors.Id_Area && <div className="invalid-feedback">{errors.Id_Area}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Id_Responsable" className="form-label">Responsable:</label>
          <select
            name="Id_Responsable"
            id="Id_Responsable"
            className={`form-control ${errors.Id_Responsable ? 'is-invalid' : ''}`}
            value={formData.Id_Responsable}
            onChange={onInputChange}
          >
            <option value="">Seleccione el responsable</option>
            {responsables.map((responsable) => (
              <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                {responsable.Nom_Responsable}
              </option>
            ))}
          </select>
          {errors.Id_Responsable && <div className="invalid-feedback">{errors.Id_Responsable}</div>}
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleSubmit}>
          {buttonForm}
        </Button>
      </div>
    </div>
  );
};

FormUnidad.propTypes = {
  buttonForm: PropTypes.string.isRequired,
  unidad: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default FormUnidad;
