import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URI_RESPONSABLE = process.env.REACT_APP_SERVER_BACK + '/responsable/';

const FormUsuario = ({ buttonForm, usuario, onSubmit, onClose, isEdit }) => {
  const [formData, setFormData] = useState({
    Cor_Usuario: '',
    Password_Usuario: '',
    Id_Responsable: ''
  });

  const [initialData, setInitialData] = useState({
    Cor_Usuario: '',
    Password_Usuario: '',
    Id_Responsable: ''
  });

  const [errors, setErrors] = useState({
    Cor_Usuario: '',
    Password_Usuario: '',
    Id_Responsable: ''
  });

  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    if (usuario) {
      setFormData(usuario);
      setInitialData(usuario);
    }
  }, [usuario]);

  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const response = await axios.get(URI_RESPONSABLE);
        setResponsables(response.data);
      } catch (error) {
        console.error("Error al obtener los responsables", error);
      }
    };

    fetchResponsables();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Cor_Usuario) newErrors.Cor_Usuario = 'El correo es requerido.';
    
    if (!formData.Id_Responsable) newErrors.Id_Responsable = 'El ID del responsable es requerido.';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="mb-3">
        <label htmlFor="Cor_Usuario" className="form-label">Correo</label>
        <input
          type="email"
          className={`form-control ${errors.Cor_Usuario ? 'is-invalid' : ''}`}
          id="Cor_Usuario"
          name="Cor_Usuario"
          value={formData.Cor_Usuario}
          onChange={handleChange}
        />
        {errors.Cor_Usuario && <div className="invalid-feedback">{errors.Cor_Usuario}</div>}
      </div>
      {/* Mostrar el campo de contraseña solo si no está en modo edición */}
      {!isEdit && (
        <div className="mb-3">
          <label htmlFor="Password_Usuario" className="form-label">Contraseña</label>
          <input
            type="password"
            className={`form-control ${errors.Password_Usuario ? 'is-invalid' : ''}`}
            id="Password_Usuario"
            name="Password_Usuario"
            value={formData.Password_Usuario}
            onChange={handleChange}
          />
          {errors.Password_Usuario && <div className="invalid-feedback">{errors.Password_Usuario}</div>}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="Id_Responsable" className="form-label">Responsable</label>
        <select
          className={`form-control ${errors.Id_Responsable ? 'is-invalid' : ''}`}
          id="Id_Responsable"
          name="Id_Responsable"
          value={formData.Id_Responsable}
          onChange={handleChange}
        >
          <option value="">Seleccione un responsable</option>
          {responsables.map(responsable => (
            <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
              {responsable.Nom_Responsable} - {responsable.Tip_Responsable}
            </option>
          ))}
        </select>
        {errors.Id_Responsable && <div className="invalid-feedback">{errors.Id_Responsable}</div>}
      </div>
      <div className="mb-3 text-center">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          {buttonForm}
        </button>
      </div>
    </div>
  );
};

export default FormUsuario;
