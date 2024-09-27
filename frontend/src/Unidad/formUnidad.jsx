import React, { useState, useEffect } from 'react';

const FormUnidad = ({ buttonForm, unidad, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Unidad: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para deshabilitar el botón

  useEffect(() => {
    if (unidad) {
      setFormData(unidad);
    }
  }, [unidad]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Si ya está en proceso de envío, no permitir más envíos
    setIsSubmitting(true); // Deshabilitar el botón
    try {
      await onSubmit(formData); // Asumir que onSubmit es una función asíncrona
    } finally {
      setIsSubmitting(false); // Rehabilitar el botón después del envío
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="Nom_Unidad" className="form-label">Nombre de la Unidad</label>
        <input
          type="text"
          className="form-control"
          id="Nom_Unidad"
          name="Nom_Unidad"
          value={formData.Nom_Unidad}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : buttonForm}
      </button>
    </form>
  );
};

export default FormUnidad;
