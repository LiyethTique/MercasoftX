import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import axios from 'axios';

const URI_UNIDAD = process.env.REACT_APP_SERVER_BACK + '/unidad';
const token = localStorage.getItem('token');

const FormProducto = ({ buttonForm, producto, onSubmit, onChange, formData }) => {
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [unidad, setUnidades] = useState([]);

  useEffect(() => {
    if (producto && producto !== formData) {
      onChange({ target: { name: 'producto', value: producto } });
    }
    setErrors({});
  }, [producto, onChange, formData]);

  useEffect(() => {
    const fetchUnidad = async () => {
      try {
        const response = await axios.get(URI_UNIDAD, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUnidades(response.data);
      } catch (error) {
        console.error('Error al obtener las unidades:', error);
      }
    };

    fetchUnidad();
  }, [token]);

  const formatPrice = (price) => {
    if (!price) return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.Nom_Producto?.trim()) newErrors.Nom_Producto = 'El nombre del producto es obligatorio.';
    if (formData.Exi_Producto < 0) newErrors.Exi_Producto = 'Las existencias deben ser mayor o igual a 0.';
    if (!formData?.Fec_Vencimiento) newErrors.Fec_Vencimiento = 'La fecha de vencimiento es obligatoria.';
    if (!formData?.Id_Unidad || formData.Id_Unidad <= 0) newErrors.Id_Unidad = 'El ID de unidad debe ser mayor a 0.';
    if (!formData?.Uni_DeMedida?.trim()) newErrors.Uni_DeMedida = 'La unidad de medida es obligatoria.';
    if (!formData?.Pre_Producto || formData.Pre_Producto <= 0) newErrors.Pre_Producto = 'El precio del producto debe ser mayor a 0.';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convertir Pre_Producto a número
    const updatedValue = name === 'Pre_Producto' ? parseFloat(value) || 0 : value;

    onChange({ target: { name, value: updatedValue } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Ima_Producto') {
      setImageFile(e.target.files[0]);
    } else {
      handleInputChange(e); // Llamamos a la función que maneja la conversión del precio
    }
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await onSubmit({
        ...formData,
        Ima_Producto: imageFile || formData.Ima_Producto,
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

  return (
    <div className="form-producto">
      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Nom_Producto" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className={`form-control ${errors.Nom_Producto ? 'is-invalid' : ''}`}
            id="Nom_Producto"
            name="Nom_Producto"
            value={formData.Nom_Producto || ''}
            onChange={handleChange}
            placeholder="Ingrese el nombre del producto"
          />
          {errors.Nom_Producto && (
            <div className="invalid-feedback">
              {errors.Nom_Producto}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Car_Producto" className="form-label">Descripción (Opcional)</label>
          <input
            type="text"
            className="form-control"
            id="Car_Producto"
            name="Car_Producto"
            value={formData.Car_Producto || ''}
            onChange={handleChange}
            placeholder="Ingrese la descripción"
          />
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Exi_Producto" className="form-label">Existencias</label>
          <input
            type="number"
            className={`form-control ${errors.Exi_Producto ? 'is-invalid' : ''}`}
            id="Exi_Producto"
            name="Exi_Producto"
            value={formData.Exi_Producto || ''}
            onChange={handleChange}
            placeholder="Ingrese las existencias"
            min="0"
          />
          {errors.Exi_Producto && (
            <div className="invalid-feedback">
              {errors.Exi_Producto}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Ima_Producto" className="form-label">Imagen del Producto</label>
          <input
            type="file"
            className="form-control"
            id="Ima_Producto"
            name="Ima_Producto"
            onChange={handleChange}
            accept="image/*"
          />
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Fec_Vencimiento" className="form-label">Fecha de Vencimiento</label>
          <input
            type="date"
            className={`form-control ${errors.Fec_Vencimiento ? 'is-invalid' : ''}`}
            id="Fec_Vencimiento"
            name="Fec_Vencimiento"
            value={formData.Fec_Vencimiento || ''}
            onChange={handleChange}
          />
          {errors.Fec_Vencimiento && (
            <div className="invalid-feedback">
              {errors.Fec_Vencimiento}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Id_Unidad" className="form-label">Unidad:</label>
          <select
            name="Id_Unidad"
            id="Id_Unidad"
            className={`form-control ${errors.Id_Unidad ? 'is-invalid' : ''}`}
            value={formData.Id_Unidad || ''}
            onChange={handleChange}
          >
            <option value="">Seleccione la unidad</option>
            {unidad.map((unidad) => (
              <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>
                {unidad.Nom_Unidad}
              </option>
            ))}
          </select>
          {errors.Id_Unidad && <div className="invalid-feedback">{errors.Id_Unidad}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Uni_DeMedida" className="form-label">Unidad de Medida</label>
          <select
            className={`form-control ${errors.Uni_DeMedida ? 'is-invalid' : ''}`}
            id="Uni_DeMedida"
            name="Uni_DeMedida"
            value={formData.Uni_DeMedida || ''}
            onChange={handleChange}
          >
            <option value="" disabled>Seleccione una unidad de medida</option>
            <option value="Kg">Kg</option>
            <option value="Unidad">Unidad</option>
            <option value="Cubeta">Cubeta</option>
          </select>
          {errors.Uni_DeMedida && (
            <div className="invalid-feedback">
              {errors.Uni_DeMedida}
            </div>
          )}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Pre_Producto" className="form-label">Precio</label>
          <input
            type="number" // Cambiado a tipo número
            className={`form-control ${errors.Pre_Producto ? 'is-invalid' : ''}`}
            id="Pre_Producto"
            name="Pre_Producto"
            value={formData.Pre_Producto || ''} // Directamente el número
            onChange={handleChange}
            placeholder="Ingrese el precio del producto"
            min="0" // Para asegurarse que sea un valor positivo
          />
          {errors.Pre_Producto && (
            <div className="invalid-feedback">
              {errors.Pre_Producto}
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

FormProducto.propTypes = {
  buttonForm: PropTypes.string.isRequired,
  producto: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default FormProducto;