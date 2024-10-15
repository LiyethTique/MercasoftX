import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import axios from 'axios';

const URI_PEDIDO = process.env.REACT_APP_SERVER_BACK + '/pedido';
const URI_PRODUCTO = process.env.REACT_APP_SERVER_BACK + '/producto';

const FormVenta = ({ buttonForm, venta, onSubmit, onInputChange, formData }) => {
  const [errors, setErrors] = useState({});
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setErrors({});
  }, [venta, formData]);

  const token = localStorage.getItem('token'); // Obtener el token

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get(URI_PEDIDO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };

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

    fetchPedidos();
    fetchProductos();
  }, [token]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Fec_Venta) newErrors.Fec_Venta = 'Seleccione una fecha de venta.';
    if (!formData.Val_Venta || isNaN(formData.Val_Venta)) {
      newErrors.Val_Venta = 'Ingrese un valor válido.';
    } else if (formData.Val_Venta < 0) {
      newErrors.Val_Venta = 'El valor de venta no puede ser negativo.';
    }
    if (!formData.Tip_Cliente.trim()) newErrors.Tip_Cliente = 'Ingrese un tipo de cliente válido.';
    if (!formData.Id_Pedido) newErrors.Id_Pedido = 'Seleccione un pedido.';
    if (!formData.Id_Producto) newErrors.Id_Producto = 'Seleccione un producto.';

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
            name="Fec_Venta"
            id="Fec_Venta"
            className={`form-control ${errors.Fec_Venta ? 'is-invalid' : ''}`}
            value={formData.Fec_Venta}
            onChange={onInputChange}
          />
          {errors.Fec_Venta && <div className="invalid-feedback">{errors.Fec_Venta}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Val_Venta" className="form-label">Valor de Venta:</label>
          <input
            type="number"
            step="0.01"
            name="Val_Venta"
            id="Val_Venta"
            className={`form-control ${errors.Val_Venta ? 'is-invalid' : ''}`}
            value={formData.Val_Venta}
            onChange={onInputChange}
          />
          {errors.Val_Venta && <div className="invalid-feedback">{errors.Val_Venta}</div>}
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <label htmlFor="Tip_Cliente" className="form-label">Tipo de Cliente:</label>
          <select
            name="Tip_Cliente"
            id="Tip_Cliente"
            className={`form-control ${errors.Tip_Cliente ? 'is-invalid' : ''}`}
            value={formData.Tip_Cliente}
            onChange={onInputChange}
          >
            <option value="">Seleccione el tipo de cliente</option>
            <option value="Funcionario">Funcionario</option>
            <option value="Aprendiz">Aprendiz</option>
            <option value="Vigilante">Vigilante</option>
            <option value="Externo">Externo</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.Tip_Cliente && <div className="invalid-feedback">{errors.Tip_Cliente}</div>}
        </Col>

        <Col md={6} className="mb-3">
          <label htmlFor="Id_Pedido" className="form-label">Pedido:</label>
          <select
            name="Id_Pedido"
            id="Id_Pedido"
            className={`form-control ${errors.Id_Pedido ? 'is-invalid' : ''}`}
            value={formData.Id_Pedido}
            onChange={onInputChange}
          >
            <option value="">Seleccione un pedido</option>
            {pedidos.map((pedido) => (
              <option key={pedido.Id_Pedido} value={pedido.Id_Pedido}>
                {pedido.Id_Pedido}
              </option>
            ))}
          </select>
          {errors.Id_Pedido && <div className="invalid-feedback">{errors.Id_Pedido}</div>}
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
  formData: PropTypes.shape({
    Fec_Venta: PropTypes.string,
    Val_Venta: PropTypes.number,
    Tip_Cliente: PropTypes.string,
    Id_Pedido: PropTypes.number,
    Id_Producto: PropTypes.number,
  }).isRequired,
};

export default FormVenta;
