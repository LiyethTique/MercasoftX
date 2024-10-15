import React, { useState, useEffect } from 'react'; 
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import axios from 'axios';

const URI_PRODUCTO = process.env.REACT_APP_SERVER_BACK + '/producto';
const URI_UNIDAD = process.env.REACT_APP_SERVER_BACK + '/unidad';
const URI_RESPONSABLE = process.env.REACT_APP_SERVER_BACK + '/responsable';

const FormEntrada = ({ buttonForm, entrada, onSubmit, onInputChange, formData }) => {
  const [errors, setErrors] = useState({});
  const [productos, setProductos] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    setErrors({});
  }, [entrada, formData]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProductos = async () => {
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

    const fetchUnidades = async () => {
      try {
        const response = await axios.get(URI_UNIDAD, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnidades(response.data);
      } catch (error) {
        console.error('Error al obtener unidades:', error);
      }
    };

    const fetchResponsables = async () => {
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

    fetchProductos();
    fetchUnidades();
    fetchResponsables();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Dcp_Entrada.trim()) newErrors.Dcp_Entrada = 'Ingrese una descripción válida.';
    if (!formData.Fec_Entrada) newErrors.Fec_Entrada = 'Seleccione una fecha de entrada.';
    if (!formData.Ori_Entrada.trim()) newErrors.Ori_Entrada = 'Ingrese el origen.';
    if (!formData.Des_Entrada.trim()) newErrors.Des_Entrada = 'Ingrese el destino.';
    if (!formData.Val_Unitario || isNaN(formData.Val_Unitario)) newErrors.Val_Unitario = 'Ingrese un valor unitario válido.';
    if (!formData.Val_Total || isNaN(formData.Val_Total)) newErrors.Val_Total = 'Ingrese un valor total válido.';
    if (!formData.Id_Unidad) newErrors.Id_Unidad = 'Seleccione una unidad.';
    if (!formData.Id_Producto) newErrors.Id_Producto = 'Seleccione un producto.';
    if (!formData.Id_Responsable) newErrors.Id_Responsable = 'Seleccione un responsable.';
    if (!formData.Can_Entrada || isNaN(formData.Can_Entrada)) newErrors.Can_Entrada = 'Ingrese una cantidad válida.';
    if (!formData.Fec_Vencimiento) newErrors.Fec_Vencimiento = 'Seleccione una fecha de vencimiento.';

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
        // Reseteo de los campos de entrada aquí si es necesario
      }
    } catch (error) {
      console.error('Error al guardar la entrada:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error desconocido. Intente de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="form-entrada">
      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Dcp_Entrada" className="form-label">Descripción de la Entrada:</label>
          <input
            type="text"
            name="Dcp_Entrada"
            id="Dcp_Entrada"
            className={`form-control ${errors.Dcp_Entrada ? 'is-invalid' : ''}`}
            value={formData.Dcp_Entrada}
            onChange={onInputChange}
          />
          {errors.Dcp_Entrada && <div className="invalid-feedback">{errors.Dcp_Entrada}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Fec_Entrada" className="form-label">Fecha de Entrada:</label>
          <input
            type="date"
            name="Fec_Entrada"
            id="Fec_Entrada"
            className={`form-control ${errors.Fec_Entrada ? 'is-invalid' : ''}`}
            value={formData.Fec_Entrada}
            onChange={onInputChange}
          />
          {errors.Fec_Entrada && <div className="invalid-feedback">{errors.Fec_Entrada}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Ori_Entrada" className="form-label">Origen:</label>
          <input
            type="text"
            name="Ori_Entrada"
            id="Ori_Entrada"
            className={`form-control ${errors.Ori_Entrada ? 'is-invalid' : ''}`}
            value={formData.Ori_Entrada}
            onChange={onInputChange}
          />
          {errors.Ori_Entrada && <div className="invalid-feedback">{errors.Ori_Entrada}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Des_Entrada" className="form-label">Destino:</label>
          <input
            type="text"
            name="Des_Entrada"
            id="Des_Entrada"
            className={`form-control ${errors.Des_Entrada ? 'is-invalid' : ''}`}
            value={formData.Des_Entrada}
            onChange={onInputChange}
          />
          {errors.Des_Entrada && <div className="invalid-feedback">{errors.Des_Entrada}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Val_Unitario" className="form-label">Valor Unitario:</label>
          <input
            type="number"
            name="Val_Unitario"
            id="Val_Unitario"
            className={`form-control ${errors.Val_Unitario ? 'is-invalid' : ''}`}
            value={formData.Val_Unitario}
            onChange={onInputChange}
          />
          {errors.Val_Unitario && <div className="invalid-feedback">{errors.Val_Unitario}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Val_Total" className="form-label">Valor Total:</label>
          <input
            type="number"
            name="Val_Total"
            id="Val_Total"
            className={`form-control ${errors.Val_Total ? 'is-invalid' : ''}`}
            value={formData.Val_Total}
            onChange={onInputChange}
          />
          {errors.Val_Total && <div className="invalid-feedback">{errors.Val_Total}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Id_Unidad" className="form-label">Unidad:</label>
          <select
            name="Id_Unidad"
            id="Id_Unidad"
            className={`form-control ${errors.Id_Unidad ? 'is-invalid' : ''}`}
            value={formData.Id_Unidad}
            onChange={onInputChange}
          >
            <option value="">Seleccione una unidad</option>
            {unidades.map((unidad) => (
              <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>
                {unidad.Nom_Unidad}
              </option>
            ))}
          </select>
          {errors.Id_Unidad && <div className="invalid-feedback">{errors.Id_Unidad}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Id_Producto" className="form-label">Producto:</label>
          <select
            name="Id_Producto"
            id="Id_Producto"
            className={`form-control ${errors.Id_Producto ? 'is-invalid' : ''}`}
            value={formData.Id_Producto}
            onChange={onInputChange}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.Id_Producto} value={producto.Id_Producto}>
                {producto.Nom_Producto}
              </option>
            ))}
          </select>
          {errors.Id_Producto && <div className="invalid-feedback">{errors.Id_Producto}</div>}
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
            <option value="">Seleccione un responsable</option>
            {responsables.map((responsable) => (
              <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                {responsable.Nom_Responsable}
              </option>
            ))}
          </select>
          {errors.Id_Responsable && <div className="invalid-feedback">{errors.Id_Responsable}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Can_Entrada" className="form-label">Cantidad de Entrada:</label>
          <input
            type="number"
            name="Can_Entrada"
            id="Can_Entrada"
            className={`form-control ${errors.Can_Entrada ? 'is-invalid' : ''}`}
            value={formData.Can_Entrada}
            onChange={onInputChange}
          />
          {errors.Can_Entrada && <div className="invalid-feedback">{errors.Can_Entrada}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Fec_Vencimiento" className="form-label">Fecha de Vencimiento:</label>
          <input
            type="date"
            name="Fec_Vencimiento"
            id="Fec_Vencimiento"
            className={`form-control ${errors.Fec_Vencimiento ? 'is-invalid' : ''}`}
            value={formData.Fec_Vencimiento}
            onChange={onInputChange}
          />
          {errors.Fec_Vencimiento && <div className="invalid-feedback">{errors.Fec_Vencimiento}</div>}
        </Col>
      </Row>

      <div className="text-center">
        <Button
          variant="primary"
          onClick={handleSubmit}
        >
          {buttonForm}
        </Button>
      </div>
    </div>
  );
};

FormEntrada.propTypes = {
  buttonForm: PropTypes.string.isRequired,
  entrada: PropTypes.shape({
    Id_Entrada: PropTypes.number,
    Dcp_Entrada: PropTypes.string,
    Fec_Entrada: PropTypes.string,
    Ori_Entrada: PropTypes.string,
    Des_Entrada: PropTypes.string,
    Val_Unitario: PropTypes.number,
    Val_Total: PropTypes.number,
    Id_Unidad: PropTypes.number,
    Id_Producto: PropTypes.number,
    Id_Responsable: PropTypes.number,
    Can_Entrada: PropTypes.number,
    Fec_Vencimiento: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    Id_Entrada: PropTypes.number,
    Dcp_Entrada: PropTypes.string.isRequired,
    Fec_Entrada: PropTypes.string.isRequired,
    Ori_Entrada: PropTypes.string.isRequired,
    Des_Entrada: PropTypes.string.isRequired,
    Val_Unitario: PropTypes.number.isRequired,
    Val_Total: PropTypes.number.isRequired,
    Id_Unidad: PropTypes.number.isRequired,
    Id_Producto: PropTypes.number.isRequired,
    Id_Responsable: PropTypes.number.isRequired,
    Can_Entrada: PropTypes.number.isRequired,
    Fec_Vencimiento: PropTypes.string.isRequired,
  }).isRequired,
};


export default FormEntrada;
