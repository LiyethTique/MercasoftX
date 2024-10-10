import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import axios from 'axios';

const URI_UNIDAD = process.env.REACT_APP_SERVER_BACK + '/unidad';
const IMAGE_URI = `${process.env.REACT_APP_SERVER_BACK}${process.env.REACT_APP_IMAGE_PATH}`;

const FormProducto = ({ formData, setFormData, onSubmit, buttonForm }) => {
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null); // Estado para almacenar el archivo de imagen
  const [unidadList, setUnidadList] = useState([]);

  useEffect(() => {
    fetchUnidades();
  }, []);

  const fetchUnidades = async () => {
    try {
      const respuesta = await axios.get(URI_UNIDAD);
      setUnidadList(respuesta.data);
    } catch (error) {
      console.error("Error fetching unidades:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'Ima_Producto') {
      const file = e.target.files[0];
      setImageFile(file); // Establecer el archivo de imagen
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Si no se selecciona una nueva imagen, mantén la imagen actual
      const imageToSubmit = imageFile ? imageFile : formData.Ima_Producto;

      await onSubmit({
        ...formData,
        Ima_Producto: imageToSubmit, // Usar la imagen existente si no se selecciona una nueva
      });

      if (buttonForm !== 'Actualizar') {
        setErrors({});
      }
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error desconocido. Intente de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.Nom_Producto?.trim()) newErrors.Nom_Producto = 'El nombre del producto es obligatorio.';
    if (formData.Exi_Producto < 0) newErrors.Exi_Producto = 'Las existencias deben ser mayor o igual a 0.';
    if (!formData?.Fec_Vencimiento) newErrors.Fec_Vencimiento = 'La fecha de vencimiento es obligatoria.';
    if (!formData?.Id_Unidad || formData.Id_Unidad <= 0) newErrors.Id_Unidad = 'El ID de unidad debe ser mayor a 0.';
    if (!formData?.Uni_DeMedida?.trim()) newErrors.Uni_DeMedida = 'La unidad de medida es obligatoria.';
    if (!formData?.Pre_Producto || formData.Pre_Producto <= 0) newErrors.Pre_Producto = 'El precio del producto debe ser mayor a 0.';
    
    // Solo en creación es obligatorio subir una imagen
    if (!formData.Ima_Producto && buttonForm !== 'Actualizar') {
      newErrors.Ima_Producto = 'Debe seleccionar una imagen para el producto.';
    }

    return newErrors;
  };

  return (
    <div>
      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Nom_Producto" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className={`form-control ${errors.Nom_Producto ? 'is-invalid' : ''}`}
            id="Nom_Producto"
            name="Nom_Producto"
            value={formData.Nom_Producto}
            onChange={handleChange}
          />
          {errors.Nom_Producto && <div className="invalid-feedback">{errors.Nom_Producto}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Car_Producto" className="form-label">Características del Producto</label>
          <input
            type="text"
            className="form-control"
            id="Car_Producto"
            name="Car_Producto"
            value={formData.Car_Producto}
            onChange={handleChange}
          />
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Exi_Producto" className="form-label">Existencias</label>
          <input
            type="number"
            className={`form-control ${errors.Exi_Producto ? 'is-invalid' : ''}`}
            id="Exi_Producto"
            name="Exi_Producto"
            value={formData.Exi_Producto}
            onChange={handleChange}
          />
          {errors.Exi_Producto && <div className="invalid-feedback">{errors.Exi_Producto}</div>}
        </Col>

        <Col md={6} className="mb-3">
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
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Id_Unidad" className="form-label">Unidad</label>
          <select
            className={`form-control ${errors.Id_Unidad ? 'is-invalid' : ''}`}
            id="Id_Unidad"
            name="Id_Unidad"
            value={formData.Id_Unidad}
            onChange={handleChange}
          >
            <option value="">Seleccione una unidad</option>
            {unidadList.map(unidad => (
              <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>{unidad.Nom_Unidad}</option>
            ))}
          </select>
          {errors.Id_Unidad && <div className="invalid-feedback">{errors.Id_Unidad}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Uni_DeMedida" className="form-label">Unidad de Medida</label>
          <input
            type="text"
            className={`form-control ${errors.Uni_DeMedida ? 'is-invalid' : ''}`}
            id="Uni_DeMedida"
            name="Uni_DeMedida"
            value={formData.Uni_DeMedida}
            onChange={handleChange}
          />
          {errors.Uni_DeMedida && <div className="invalid-feedback">{errors.Uni_DeMedida}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Pre_Producto" className="form-label">Precio del Producto</label>
          <input
            type="number"
            className={`form-control ${errors.Pre_Producto ? 'is-invalid' : ''}`}
            id="Pre_Producto"
            name="Pre_Producto"
            value={formData.Pre_Producto}
            onChange={handleChange}
          />
          {errors.Pre_Producto && <div className="invalid-feedback">{errors.Pre_Producto}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Ima_Producto" className="form-label">Imagen del Producto</label>
          
          {/* Mostrar la imagen actual si existe */}
          {formData.Ima_Producto && typeof formData.Ima_Producto === 'string' && (
            <div className="mb-2">
              <img
                src={`${IMAGE_URI}${formData.Ima_Producto}`}
                alt="Imagen actual del producto"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            </div>
          )}
          
          {/* Campo para seleccionar nueva imagen */}
          <input
            type="file"
            className="form-control"
            id="Ima_Producto"
            name="Ima_Producto"
            onChange={handleChange}
            accept="image/*"
          />
          {errors.Ima_Producto && <div className="invalid-feedback">{errors.Ima_Producto}</div>}
        </Col>
      </Row>

      <div className="d-flex justify-content-center">
        <Button variant="primary" onClick={handleSubmit}>
          {buttonForm}
        </Button>
      </div>
    </div>
  );
};

FormProducto.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonForm: PropTypes.string.isRequired,
};

export default FormProducto;
