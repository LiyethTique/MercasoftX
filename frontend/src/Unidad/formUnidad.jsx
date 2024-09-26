import React, { useState, useEffect } from 'react';

const FormUnidad = ({ buttonForm, unidad, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Unidad: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (unidad) {
      setFormData(unidad);
    }
  }, [unidad]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
      
      {/* Contenedor centrado con Bootstrap */}
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : buttonForm}
        </button>
      </div>
    </>
  );
};

export default FormUnidad;
