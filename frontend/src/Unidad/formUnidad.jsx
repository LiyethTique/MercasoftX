import React, { useState, useEffect } from 'react';

const FormUnidad = ({ buttonForm, unidad, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Unidad: ''
  });

  useEffect(() => {
    if (unidad) {
      setFormData(unidad);
    }
  }, [unidad]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          {buttonForm}
        </button>
      </div>
    </form>
  );
};

export default FormUnidad;
