import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';  // Asegúrate de tener axios instalado

const URI_PRODUCTO = process.env.REACT_APP_SERVER_BACK + '/producto/'; // Ruta de traslados
const URI_RESPONSABLE = process.env.REACT_APP_SERVER_BACK + '/responsable/'

const FormTraslado = ({ buttonForm, traslado, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Fec_Traslado: '',
    Des_Traslado: '',
    Id_Producto: '',
    Can_Producto: '',
    Val_Unitario: '',
    Val_Traslado: '',
    Id_Responsable: ''
  });

  const [initialData, setInitialData] = useState({
    Fec_Traslado: '',
    Des_Traslado: '',
    Id_Producto: '',
    Can_Producto: '',
    Val_Unitario: '',
    Val_Traslado: '',
    Id_Responsable: ''
  });

  const [errors, setErrors] = useState({
    Fec_Traslado: '',
    Des_Traslado: '',
    Id_Producto: '',
    Can_Producto: '',
    Val_Unitario: '',
    Val_Traslado: '',
    Id_Responsable: ''
  });

  const [productos, setProductos] = useState([]);
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    if (traslado) {
      setFormData(traslado);
      setInitialData(traslado); // Guardar los datos iniciales
    }
    fetchProductos();
    fetchResponsables();
  }, [traslado]);

  const fetchProductos = async () => {
    try {
      const response = await axios.get(URI_PRODUCTO);  // Asegúrate de ajustar la URL según tu ruta
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  };

  const fetchResponsables = async () => {
    try {
      const response = await axios.get(URI_RESPONSABLE);  // Asegúrate de ajustar la URL según tu ruta
      setResponsables(response.data);
    } catch (error) {
      console.error('Error fetching responsables:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Fec_Traslado) newErrors.Fec_Traslado = 'La fecha es requerida.';
    if (!formData.Des_Traslado) newErrors.Des_Traslado = 'La descripción es requerida.';
    if (!formData.Id_Producto) newErrors.Id_Producto = 'El ID de producto es requerido.';
    if (!formData.Can_Producto) newErrors.Can_Producto = 'La cantidad es requerida.';
    if (!formData.Val_Unitario) newErrors.Val_Unitario = 'El valor unitario es requerido.';
    if (!formData.Val_Traslado) newErrors.Val_Traslado = 'El valor del traslado es requerido.';
    if (!formData.Id_Responsable) newErrors.Id_Responsable = 'El ID del responsable es requerido.';

    return newErrors;
  };

  const hasChanges = () => {
    return Object.keys(formData).some(key => formData[key] !== initialData[key]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleClose = () => {
    if (onClose) {
      onClose(); // Llama a la función de cierre pasada por props
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="mb-3">
        <label htmlFor="Fec_Traslado" className="form-label">Fecha de Traslado</label>
        <input
          type="date"
          className={`form-control ${errors.Fec_Traslado ? 'is-invalid' : ''}`}
          id="Fec_Traslado"
          name="Fec_Traslado"
          value={formData.Fec_Traslado}
          onChange={handleChange}
        />
        {errors.Fec_Traslado && <div className="invalid-feedback">{errors.Fec_Traslado}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Des_Traslado" className="form-label">Descripción</label>
        <input
          type="text"
          className={`form-control ${errors.Des_Traslado ? 'is-invalid' : ''}`}
          id="Des_Traslado"
          name="Des_Traslado"
          value={formData.Des_Traslado}
          onChange={handleChange}
        />
        {errors.Des_Traslado && <div className="invalid-feedback">{errors.Des_Traslado}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Producto" className="form-label">Producto</label>
        <select
          className={`form-select ${errors.Id_Producto ? 'is-invalid' : ''}`}
          id="Id_Producto"
          name="Id_Producto"
          value={formData.Id_Producto}
          onChange={handleChange}
        >
          <option value="">Seleccione un producto</option>
          {Array.isArray(productos) && productos.map(producto => (
            <option key={producto.Id_Producto} value={producto.Id_Producto}>
              {producto.Nom_Producto} {/* Asegúrate de que `nombre` es el campo correcto */}
            </option>
          ))}
        </select>
        {errors.Id_Producto && <div className="invalid-feedback">{errors.Id_Producto}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Can_Producto" className="form-label">Cantidad</label>
        <input
          type="number"
          className={`form-control ${errors.Can_Producto ? 'is-invalid' : ''}`}
          id="Can_Producto"
          name="Can_Producto"
          value={formData.Can_Producto}
          onChange={handleChange}
        />
        {errors.Can_Producto && <div className="invalid-feedback">{errors.Can_Producto}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Val_Unitario" className="form-label">Valor Unitario</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.Val_Unitario ? 'is-invalid' : ''}`}
          id="Val_Unitario"
          name="Val_Unitario"
          value={formData.Val_Unitario}
          onChange={handleChange}
        />
        {errors.Val_Unitario && <div className="invalid-feedback">{errors.Val_Unitario}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Val_Traslado" className="form-label">Valor Total</label>
        <input
          type="number"
          step="0.01"
          className={`form-control ${errors.Val_Traslado ? 'is-invalid' : ''}`}
          id="Val_Traslado"
          name="Val_Traslado"
          value={formData.Val_Traslado}
          onChange={handleChange}
        />
        {errors.Val_Traslado && <div className="invalid-feedback">{errors.Val_Traslado}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Responsable" className="form-label">Responsable</label>
        <select
          className={`form-select ${errors.Id_Responsable ? 'is-invalid' : ''}`}
          id="Id_Responsable"
          name="Id_Responsable"
          value={formData.Id_Responsable}
          onChange={handleChange}
        >
          <option value="">Seleccione un responsable</option>
          {Array.isArray(responsables) && responsables.map(responsable => (
            <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
              {responsable.Nom_Responsable} {/* Asegúrate de que `nombre` es el campo correcto */}
            </option>
          ))}
        </select>
        {errors.Id_Responsable && <div className="invalid-feedback">{errors.Id_Responsable}</div>}
      </div>
      <div className="mb-3 text-center">
        <Button variant="primary" onClick={handleSubmit}>
          {buttonForm}
        </Button>
      </div>
      <div className="text-center">
      </div>
    </div>
  );
};

export default FormTraslado;
