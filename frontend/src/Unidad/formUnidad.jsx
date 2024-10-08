import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import './crudUnidad.css'; // Cambia el nombre del archivo de CSS según sea necesario
import axios from 'axios';

const URI_AREA = process.env.REACT_APP_SERVER_BACK + '/area'; // Asegúrate de que esta URL sea correcta
const URI_RESPONSABLE = process.env.REACT_APP_SERVER_BACK + '/responsable';

const FormUnidad = ({ buttonForm, unidad, onSubmit, onInputChange, formData }) => {
  const [errors, setErrors] = useState({});
  const [area, setAreas] = useState([]); // Cambié el nombre a plural
  const [responsable, setResponsables] = useState([]); // Cambié el nombre a plural

  useEffect(() => {
    setErrors({});
  }, [unidad, formData]);

  const token = localStorage.getItem('token'); // Obtener el token una vez

  useEffect(() => {
    const fetchArea = async () => {
      try {
        const response = await axios.get(URI_AREA, {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de que 'tuToken' esté definido
          },
        });
        setAreas(response.data); // Asigna los datos obtenidos al estado 'areas'
      } catch (error) {
        console.error('Error al obtener áreas:', error);
      }
    };

    const fetchResponsable = async () => {
      try {
        const response = await axios.get(URI_RESPONSABLE, {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de que 'tuToken' esté definido
          },
        });
        setResponsables(response.data); // Asigna los datos obtenidos al estado 'responsables'
      } catch (error) {
        console.error('Error al obtener responsables:', error);
      }
    };

    fetchArea();
    fetchResponsable();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Id_Area) newErrors.Id_Area = 'Seleccione un área.';
    if (!formData.Id_Responsable) newErrors.Id_Responsable = 'Seleccione un responsable.';
    if (!formData.Nom_Unidad.trim()) newErrors.Nom_Unidad = 'Ingrese un nombre válido.';

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
          <label htmlFor="Id_Area" className="form-label">Área:</label>
          <select
            name="Id_Area"
            id="Id_Area"
            className={`form-control ${errors.Id_Area ? 'is-invalid' : ''}`}
            value={formData.Id_Area}
            onChange={onInputChange}
          >
            <option value="">Seleccione el area</option>
            {area.map((area) => (
              <option key={area.Id_Area} value={area.Id_Area}>
                {area.Nom_Area}
              </option>
            ))}
          </select>
          {errors.Id_Area && <div className="invalid-feedback">{errors.Id_Area}</div>}
        </Col>

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
            {responsable.map((responsable) => (
              <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                {responsable.Nom_Responsable}
              </option>
            ))}
          </select>
          {errors.Id_Responsable && <div className="invalid-feedback">{errors.Id_Responsable}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-3">
          <label htmlFor="Nom_Unidad" className="form-label">Nombre de la Unidad:</label>
          <select
            name="Nom_Unidad"
            id="Nom_Unidad"
            className={`form-control ${errors.Nom_Unidad ? 'is-invalid' : ''}`}
            value={formData.Nom_Unidad}
            onChange={onInputChange}
          >
            <option value="">Seleccione la unidad</option>
            <option value="Lacteos">Lacteos</option>
            <option value="Carnicos">Carnicos</option>
            <option value="Planificacion">Planificacion</option>
            <option value="Fruhor">Fruhor</option>
            <option value="Poscosecha">Poscosecha</option>
            <option value="Laboratorios de calidad">Laboratorios de calidad</option>
            <option value="Laboratorios de cafe">Laboratorios de cafe</option>
            <option value="Chocolateria">Chocolateria</option>
            <option value="Porcinos">Porcinos</option>
            <option value="Caprinos">Caprinos</option>
            <option value="Cunicultura">Cunicultura</option>
            <option value="Avicultura">Avicultura</option>
            <option value="Ganaderia">Ganaderia</option>
            <option value="Ovinos">Ovinos</option>
            <option value="Piscicultura">Piscicultura</option>
            <option value="Apicultura">Apicultura</option>
            <option value="Lote 1">Lote 1</option>
            <option value="Lote 2">Lote 2</option>
            <option value="Lote 3">Lote 3</option>
            <option value="Lote 4">Lote 4</option>
            <option value="Lote 5">Lote 5</option>
            <option value="Lote 6">Lote 6</option>
            <option value="Lote 7">Lote 7</option>
            <option value="Lote 8">Lote 8</option>
            <option value="Lote 9">Lote 9</option>
            <option value="Lote 20">Lote 20</option>
            <option value="Bioinsumos">Bioinsumos</option>
          </select>
          {errors.Nom_Unidad && <div className="invalid-feedback">{errors.Nom_Unidad}</div>}
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

FormUnidad.propTypes = {
  buttonForm: PropTypes.string.isRequired,
  unidad: PropTypes.shape({
    Id_Area: PropTypes.number,
    Id_Responsable: PropTypes.number,
    Nom_Unidad: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    Id_Area: PropTypes.number,
    Id_Responsable: PropTypes.number,
    Nom_Unidad: PropTypes.string,
  }).isRequired,
};

export default FormUnidad;