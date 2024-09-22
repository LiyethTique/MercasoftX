import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './formCategoria.css';

const FormCategoria = ({ buttonForm, categoria, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Nom_Categoria: ''
  });

  const [initialData, setInitialData] = useState({
    Nom_Categoria: ''
  });

  const [errors, setErrors] = useState({
    Nom_Categoria: ''
  });

  useEffect(() => {
    if (categoria) {
      setFormData(categoria);
      setInitialData(categoria); // Guardar los datos iniciales
    }
  }, [categoria]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' }); // Limpiar el error si el campo cambia
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedNomCategoria = formData.Nom_Categoria.trim(); // Eliminar espacios en blanco

    // Expresión regular para permitir solo letras y espacios
    const lettersOnlyRegex = /^[A-Za-z\s]+$/;

    if (!trimmedNomCategoria) {
      newErrors.Nom_Categoria = 'El nombre de la categoría es requerido y no puede contener solo espacios.';
    } else if (trimmedNomCategoria.length < 3) {
      newErrors.Nom_Categoria = 'El nombre debe tener al menos 3 caracteres.';
    } else if (!lettersOnlyRegex.test(trimmedNomCategoria)) {
      newErrors.Nom_Categoria = 'El nombre solo puede contener letras y espacios.';
    }

    return newErrors;
  };

  const hasChanges = () => {
    return formData.Nom_Categoria !== initialData.Nom_Categoria;
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevenir el comportamiento por defecto
      handleSubmit(e); // Llamar a la función de envío
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="mb-3">
        <label htmlFor="Nom_Categoria" className="form-label">Nombre Categoría</label>
        <input
          type="text"
          className={`form-control ${errors.Nom_Categoria ? 'is-invalid' : ''}`}
          id="Nom_Categoria"
          name="Nom_Categoria"
          value={formData.Nom_Categoria}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Manejar el evento de tecla
        />
        {errors.Nom_Categoria && <div className="invalid-feedback">{errors.Nom_Categoria}</div>}
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

export default FormCategoria;
