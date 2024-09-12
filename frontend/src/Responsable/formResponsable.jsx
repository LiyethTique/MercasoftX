import React, { useState, useEffect } from 'react';

const FormResponsable = ({ buttonForm, responsable, URI, updateTextButton, setIsFormVisible, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Responsable: '',
    Cor_Responsable: '',
    Tel_Responsable: '',
    Tip_Responsable: '',
    Tip_Genero: ''
  });

  useEffect(() => {
    if (responsable) {
      setFormData(responsable);
    }
  }, [responsable]);

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
        <label htmlFor="Nom_Responsable" className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="Nom_Responsable"
          name="Nom_Responsable"
          value={formData.Nom_Responsable}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Cor_Responsable" className="form-label">Correo</label>
        <input
          type="email"
          className="form-control"
          id="Cor_Responsable"
          name="Cor_Responsable"
          value={formData.Cor_Responsable}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Tel_Responsable" className="form-label">Teléfono</label>
        <input
          type="text"
          className="form-control"
          id="Tel_Responsable"
          name="Tel_Responsable"
          value={formData.Tel_Responsable}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Tip_Responsable" className="form-label">Tipo de Responsable</label>
        <select
          name="Tip_Responsable"
          id="Tip_Responsable"
          className="form-control"
          value={formData.Tip_Responsable}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona uno...</option>
          <option value="aprendiz">Aprendiz</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="Tip_Genero" className="form-label">Género</label>
        <select
          name="Tip_Genero"
          id="Tip_Genero"
          className="form-control"
          value={formData.Tip_Genero}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona uno...</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormResponsable;
