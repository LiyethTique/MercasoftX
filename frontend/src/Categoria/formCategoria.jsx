import React, { useState, useEffect } from 'react';

const FormCategoria = ({ buttonForm, categoria, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Categoria: ''
  });

  useEffect(() => {
    if (categoria) {
      setFormData(categoria);
    }
  }, [categoria]);

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
        <label htmlFor="Nom_Categoria" className="form-label">Nombre Categoría</label>
        <input
          type="text"
          className="form-control"
          id="Nom_Categoria"
          name="Nom_Categoria"
          value={formData.Nom_Categoria}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormCategoria;
