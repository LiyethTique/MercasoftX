import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import axios from 'axios';

const URI_RESPONSABLE = process.env.REACT_APP_SERVER_BACK + '/responsable';
const URI_PRODUCTO = process.env.REACT_APP_SERVER_BACK + '/producto';
const URI_UBICACION = process.env.REACT_APP_SERVER_BACK + '/ubicacion'; // Asume que hay una API para ubicaciones

const FormTraslado = ({ buttonForm, traslado, onSubmit, onInputChange, formData }) => {
  const [errors, setErrors] = useState({});
  const [responsable, setResponsables] = useState([]);
  const [producto, setProductos] = useState([]);
  const [ubicacion, setUbicaciones] = useState([]); // Para las ubicaciones de origen y destino

  const token = localStorage.getItem('token'); // Obtener el token una vez

  useEffect(() => {
    setErrors({});
  }, [traslado, formData]);

  useEffect(() => {
    const fetchResponsable = async () => {
      try {
        const response = await axios.get(URI_RESPONSABLE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResponsables(response.data);
      } catch (error) {
        console.error('Error al obtener responsables:', error);
      }
    };

    const fetchProducto = async () => {
      try {
        const response = await axios.get(URI_PRODUCTO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    const fetchUbicacion = async () => {
      try {
        const response = await axios.get(URI_UBICACION, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUbicaciones(response.data);
      } catch (error) {
        console.error('Error al obtener ubicaciones:', error);
      }
    };

    fetchResponsable();
    fetchProducto();
    fetchUbicacion();
  }, [token]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Fec_Traslado) newErrors.Fec_Traslado = 'Ingrese la fecha del traslado.';
    if (!formData.Ori_Traslado) newErrors.Ori_Traslado = 'Ingrese la ubicación de origen.';
    if (!formData.Des_Traslado) newErrors.Des_Traslado = 'Ingrese la ubicación de destino.';
    if (!formData.Id_Producto) newErrors.Id_Producto = 'Seleccione un producto.';
    if (!formData.Can_Producto || formData.Can_Producto <= 0) newErrors.Can_Producto = 'Ingrese una cantidad válida.';
    if (!formData.Id_Responsable) newErrors.Id_Responsable = 'Seleccione un responsable.';
    if (!formData.Val_Unitario || formData.Val_Unitario <= 0) newErrors.Val_Unitario = 'Ingrese un valor unitario válido.';
    if (!formData.Uni_DeMedida.trim()) newErrors.Uni_DeMedida = 'Ingrese una unidad de medida válida.';
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
          <label htmlFor="Fec_Traslado" className="form-label">Fecha del Traslado:</label>
          <input
            type="date"
            name="Fec_Traslado"
            id="Fec_Traslado"
            className={`form-control ${errors.Fec_Traslado ? 'is-invalid' : ''}`}
            value={formData.Fec_Traslado}
            onChange={onInputChange}
          />
          {errors.Fec_Traslado && <div className="invalid-feedback">{errors.Fec_Traslado}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Dcp_Traslado" className="form-label">Descripción:</label>
          <input
            type="text"
            name="Dcp_Traslado"
            id="Dcp_Traslado"
            className={`form-control ${errors.Dcp_Traslado ? 'is-invalid' : ''}`}
            value={formData.Dcp_Traslado}
            onChange={onInputChange}
          />
          {errors.Dcp_Traslado && <div className="invalid-feedback">{errors.Dcp_Traslado}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Ori_Traslado" className="form-label">Origen del Traslado:</label>
          <input
            type="text"
            name="Ori_Traslado"
            id="Ori_Traslado"
            className={`form-control ${errors.Ori_Traslado ? 'is-invalid' : ''}`}
            value={formData.Ori_Traslado}
            onChange={onInputChange}
          />
          {errors.Ori_Traslado && <div className="invalid-feedback">{errors.Ori_Traslado}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Des_Traslado" className="form-label">Destino del Traslado:</label>
          <input
            type="text"
            name="Des_Traslado"
            id="Des_Traslado"
            className={`form-control ${errors.Des_Traslado ? 'is-invalid' : ''}`}
            value={formData.Des_Traslado}
            onChange={onInputChange}
          />
          {errors.Des_Traslado && <div className="invalid-feedback">{errors.Des_Traslado}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Id_Producto" className="form-label">Producto:</label>
          <select
            name="Id_Producto"
            id="Id_Producto"
            className={`form-control ${errors.Id_Producto ? 'is-invalid' : ''}`}
            value={formData.Id_Producto}
            onChange={onInputChange}
          >
            <option value="">Seleccione el producto</option>
            {producto.map((prod) => (
              <option key={prod.Id_Producto} value={prod.Id_Producto}>
                {prod.Nom_Producto}
              </option>
            ))}
          </select>
          {errors.Id_Producto && <div className="invalid-feedback">{errors.Id_Producto}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Can_Producto" className="form-label">Cantidad de Producto:</label>
          <input
            type="number"
            name="Can_Producto"
            id="Can_Producto"
            className={`form-control ${errors.Can_Producto ? 'is-invalid' : ''}`}
            value={formData.Can_Producto}
            onChange={onInputChange}
          />
          {errors.Can_Producto && <div className="invalid-feedback">{errors.Can_Producto}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Uni_DeMedida" className="form-label">Unidad de Medida:</label>
          <input
            type="text"
            name="Uni_DeMedida"
            id="Uni_DeMedida"
            className={`form-control ${errors.Uni_DeMedida ? 'is-invalid' : ''}`}
            value={formData.Uni_DeMedida}
            onChange={onInputChange}
          />
          {errors.Uni_DeMedida && <div className="invalid-feedback">{errors.Uni_DeMedida}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Val_Unitario" className="form-label">Valor Unitario:</label>
          <input
            type="number"
            step="0.01"
            name="Val_Unitario"
            id="Val_Unitario"
            className={`form-control ${errors.Val_Unitario ? 'is-invalid' : ''}`}
            value={formData.Val_Unitario}
            onChange={onInputChange}
          />
          {errors.Val_Unitario && <div className="invalid-feedback">{errors.Val_Unitario}</div>}
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
            {responsable.map((resp) => (
              <option key={resp.Id_Responsable} value={resp.Id_Responsable}>
                {resp.Nom_Responsable}
              </option>
            ))}
          </select>
          {errors.Id_Responsable && <div className="invalid-feedback">{errors.Id_Responsable}</div>}
        </Col>
      </Row>

      <Button onClick={handleSubmit} className="btn btn-primary">
        {buttonForm}
      </Button>
    </div>
  );
};

FormTraslado.propTypes = {
  buttonForm: PropTypes.string.isRequired,
  traslado: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default FormTraslado;
