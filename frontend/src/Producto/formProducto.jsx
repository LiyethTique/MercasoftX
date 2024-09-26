import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const URI_CATEGORIA = process.env.REACT_APP_SERVER_BACK + '/categoria/';
const URI_PRODUCTO = process.env.REACT_APP_SERVER_BACK + '/producto/';

const FormProducto = ({ buttonForm, producto, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Nom_Producto: '',
    Car_Producto: '',
    Exi_Producto: '',
    Ima_Producto: '',
    Fec_Vencimiento: '',
    Id_Unidad: '',
    Uni_DeMedida: '',
    Pre_Producto: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const [errors, setErrors] = useState({});
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    if (producto) {
      setFormData(producto);
    }
    fetchCategorias();
  }, [producto]);


  const validateForm = () => {
    const newErrors = {};

    if (!formData.Nom_Producto.trim()) newErrors.Nom_Producto = 'El nombre del producto es obligatorio.';
    if (!formData.Car_Producto.trim()) newErrors.Car_Producto = 'La descripción es obligatoria.';
    if (!formData.Exi_Producto || formData.Exi_Producto <= 0) newErrors.Exi_Producto = 'Las existencias deben ser mayor a 0.';
    if (!formData.Fec_Vencimiento) newErrors.Fec_Vencimiento = 'La fecha de vencimiento es obligatoria.';
    if (!formData.Id_Unidad || formData.Id_Unidad <= 0) newErrors.Id_Unidad = 'El ID de unidad debe ser mayor a 0.';
    if (!formData.Uni_DeMedida.trim()) newErrors.Uni_DeMedida = 'La unidad de medida es obligatoria.';
    if (!formData.Pre_Producto || formData.Pre_Producto <= 0) newErrors.Pre_Producto = 'El precio del producto debe ser mayor a 0.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (e.target.name === 'Ima_Producto') {
      setImageFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const fetchCategorias = async () => {
      try {
        const response = await axios.get(URI_CATEGORIA);
        setCategorias(response.data);
      } catch (error) {
        console.error('Error fetching categorías:', error);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (validateForm()) {
        const updatedData = { ...formData };
        if (imageFile) {
          updatedData.Ima_Producto = imageFile;
        }
        onSubmit(updatedData);

        const newErrors = {};
        if (!formData.Nom_Producto) newErrors.Nom_Producto = 'El nombre del producto es requerido.';
        if (!formData.Car_Producto) newErrors.Car_Producto = 'Las características del producto son requeridas.';
        if (!formData.Pre_Promedio) newErrors.Pre_Promedio = 'El precio promedio es requerido.';
        if (!formData.Exi_Producto) newErrors.Exi_Producto = 'La existencia del producto es requerida.';
        if (!formData.Fec_Vencimiento) newErrors.Fec_Vencimiento = 'La fecha de vencimiento es requerida.';
        if (!formData.Id_Categoria) newErrors.Id_Categoria = 'La categoría es requerida.';
        if (!formData.Pre_Anterior) newErrors.Pre_Anterior = 'El precio anterior es requerido.';
        if (!formData.Uni_DeMedida) newErrors.Uni_DeMedida = 'La unidad de medida es requerida.';
        if (!formData.Pre_Producto) newErrors.Pre_Producto = 'El precio del producto es requerido.';
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
          onSubmit(formData);
        }
      };

      return (

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="Nom_Producto" className="form-label">Nombre del Producto</label>
        <input
          type="text"
          className="form-control"
          id="Nom_Producto"
          name="Nom_Producto"
          value={formData.Nom_Producto}
          onChange={handleChange}
          required
        />
        {errors.Nom_Producto && <span className="text-danger">{errors.Nom_Producto}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="Car_Producto" className="form-label">Descripción</label>
        <input
          type="text"
          className="form-control"
          id="Car_Producto"
          name="Car_Producto"
          value={formData.Car_Producto}
          onChange={handleChange}
          required
        />
        {errors.Car_Producto && <span className="text-danger">{errors.Car_Producto}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="Exi_Producto" className="form-label">Existencias</label>
        <input
          type="number"
          className="form-control"
          id="Exi_Producto"
          name="Exi_Producto"
          value={formData.Exi_Producto}
          onChange={handleChange}
          required
          min="1"
        />
        {errors.Exi_Producto && <span className="text-danger">{errors.Exi_Producto}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="Ima_Producto" className="form-label">Imagen del Producto</label>
        <input
          type="file"
          className="form-control"
          id="Ima_Producto"
          name="Ima_Producto"
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Fec_Vencimiento" className="form-label">Fecha de Vencimiento</label>
        <input
          type="date"
          className="form-control"
          id="Fec_Vencimiento"
          name="Fec_Vencimiento"
          value={formData.Fec_Vencimiento}
          onChange={handleChange}
          required
        />
        {errors.Fec_Vencimiento && <span className="text-danger">{errors.Fec_Vencimiento}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Unidad" className="form-label">ID Unidad</label>
        <input
          type="number"
          className="form-control"
          id="Id_Unidad"
          name="Id_Unidad"
          value={formData.Id_Unidad}
          onChange={handleChange}
          required
          min="1"
        />
        {errors.Id_Unidad && <span className="text-danger">{errors.Id_Unidad}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="Uni_DeMedida" className="form-label">Unidad de Medida</label>
        <input
          type="text"
          className="form-control"
          id="Uni_DeMedida"
          name="Uni_DeMedida"
          value={formData.Uni_DeMedida}
          onChange={handleChange}
          required
        />
        {errors.Uni_DeMedida && <span className="text-danger">{errors.Uni_DeMedida}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="Pre_Producto" className="form-label">Precio del Producto</label>
        <input
          type="number"
          className="form-control"
          id="Pre_Producto"
          name="Pre_Producto"
          value={formData.Pre_Producto}
          onChange={handleChange}
          required
          min="1"
        />
        {errors.Pre_Producto && <span className="text-danger">{errors.Pre_Producto}</span>}
      </div>

      <button type="submit" className="btn btn-primary">
        {buttonForm}
      </button>
    </form>

    <div className="form-producto-container">
      <div className="form-grid">
        <div className="mb-3">
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
        </div>

        <div className="mb-3">
          <label htmlFor="Car_Producto" className="form-label">Características</label>
          <input
            type="text"
            className={`form-control ${errors.Car_Producto ? 'is-invalid' : ''}`}
            id="Car_Producto"
            name="Car_Producto"
            value={formData.Car_Producto}
            onChange={handleChange}
          />
          {errors.Car_Producto && <div className="invalid-feedback">{errors.Car_Producto}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="Pre_Promedio" className="form-label">Precio Promedio</label>
          <input
            type="number"
            step="0.01"
            className={`form-control ${errors.Pre_Promedio ? 'is-invalid' : ''}`}
            id="Pre_Promedio"
            name="Pre_Promedio"
            value={formData.Pre_Promedio}
            onChange={handleChange}
          />
          {errors.Pre_Promedio && <div className="invalid-feedback">{errors.Pre_Promedio}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="Exi_Producto" className="form-label">Existencia</label>
          <input
            type="number"
            className={`form-control ${errors.Exi_Producto ? 'is-invalid' : ''}`}
            id="Exi_Producto"
            name="Exi_Producto"
            value={formData.Exi_Producto}
            onChange={handleChange}
          />
          {errors.Exi_Producto && <div className="invalid-feedback">{errors.Exi_Producto}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="Ima_Producto" className="form-label">Imagen</label>
          <input
            type="text"
            className={`form-control ${errors.Ima_Producto ? 'is-invalid' : ''}`}
            id="Ima_Producto"
            name="Ima_Producto"
            value={formData.Ima_Producto}
            onChange={handleChange}
          />
          {errors.Ima_Producto && <div className="invalid-feedback">{errors.Ima_Producto}</div>}
        </div>

        <div className="mb-3">
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
        </div>

        <div className="mb-3">
          <label htmlFor="Id_Categoria" className="form-label">Categoría</label>
          <select
            className={`form-select ${errors.Id_Categoria ? 'is-invalid' : ''}`}
            id="Id_Categoria"
            name="Id_Categoria"
            value={formData.Id_Categoria}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map(categoria => (
              <option key={categoria.Id_Categoria} value={categoria.Id_Categoria}>
                {categoria.Nom_Categoria}
              </option>
            ))}
          </select>
          {errors.Id_Categoria && <div className="invalid-feedback">{errors.Id_Categoria}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="Pre_Anterior" className="form-label">Precio Anterior</label>
          <input
            type="number"
            step="0.01"
            className={`form-control ${errors.Pre_Anterior ? 'is-invalid' : ''}`}
            id="Pre_Anterior"
            name="Pre_Anterior"
            value={formData.Pre_Anterior}
            onChange={handleChange}
          />
          {errors.Pre_Anterior && <div className="invalid-feedback">{errors.Pre_Anterior}</div>}
        </div>

        <div className="mb-3">
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
        </div>

        <div className="mb-3">
          <label htmlFor="Pre_Producto" className="form-label">Precio del Producto</label>
          <input
            type="number"
            step="0.01"
            className={`form-control ${errors.Pre_Producto ? 'is-invalid' : ''}`}
            id="Pre_Producto"
            name="Pre_Producto"
            value={formData.Pre_Producto}
            onChange={handleChange}
          />
          {errors.Pre_Producto && <div className="invalid-feedback">{errors.Pre_Producto}</div>}
        </div>
      </div>

      <div className="text-center">
        <Button variant="primary" onClick={handleSubmit}>
          {buttonForm}
        </Button>
      </div>
    </div>
      );
    };

    export default FormProducto;