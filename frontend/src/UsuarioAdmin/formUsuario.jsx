import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URI_RESPONSABLE = process.env.REACT_APP_SERVER_BACK + '/responsable/';

const FormUsuario = ({ buttonForm, usuario, onSubmit, onClose, isEdit }) => {
  const [formData, setFormData] = useState({
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

  // Cargar datos del usuario cuando se edita
  useEffect(() => {
    if (isEdit && usuario) {
      setFormData({
        Cor_Usuario: usuario.Cor_Usuario || '',
        Password_Usuario: '',
        Id_Responsable: usuario.Id_Responsable || ''
      });
    }
  }, [isEdit, usuario]);

  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(URI_RESPONSABLE, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setResponsables(response.data);
      } catch (error) {
        console.error('Error al obtener los responsables', error);
      }
    };

    fetchResponsables();
  }, []);

  // Función para validar si el email tiene un dominio permitido
  const isEmailDomainValid = (email) => {
    const validDomains = ['gmail.com', 'hotmail.com'];
    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      return false;
    }
    const domain = emailParts[1].toLowerCase();
    return validDomains.includes(domain);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación para el correo electrónico
    if (!formData.Cor_Usuario) {
      newErrors.Cor_Usuario = 'El campo de correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formData.Cor_Usuario)) {
      newErrors.Cor_Usuario = 'El formato del correo electrónico es inválido. Ejemplo: usuario@gmail.com o usuario@hotmail.com';
    } else if (!isEmailDomainValid(formData.Cor_Usuario)) {
      newErrors.Cor_Usuario = 'El dominio del correo debe ser "gmail.com" o "hotmail.com".';
    }

    // Validación para la contraseña (solo si no es edición)
    if (!isEdit && !formData.Password_Usuario) {
      newErrors.Password_Usuario = 'El campo de contraseña es obligatorio.';
    }

    // Validación para el responsable
    if (!formData.Id_Responsable) {
      newErrors.Id_Responsable = 'Debe seleccionar un responsable.';
    }

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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Cor_Usuario" className="form-label">Correo</label>
          {errors.Cor_Usuario && <div className="text-danger mb-2">{errors.Cor_Usuario}</div>}
          <input
            type="email"
            className={`form-control ${errors.Cor_Usuario ? 'is-invalid' : ''}`}
            id="Cor_Usuario"
            name="Cor_Usuario"
            value={formData.Cor_Usuario}
            onChange={handleChange}
          />
        </div>

        {!isEdit && (
          <div className="mb-3">
            <label htmlFor="Password_Usuario" className="form-label">Contraseña</label>
            {errors.Password_Usuario && <div className="text-danger mb-2">{errors.Password_Usuario}</div>}
            <input
              type="password"
              className={`form-control ${errors.Password_Usuario ? 'is-invalid' : ''}`}
              id="Password_Usuario"
              name="Password_Usuario"
              value={formData.Password_Usuario}
              onChange={handleChange}
            />
          </div>
        )}

          <div className="mb-3">
            <label htmlFor="Id_Responsable" className="form-label">Responsable</label>
            {errors.Id_Responsable && <div className="text-danger mb-2">{errors.Id_Responsable}</div>}
            <select
              className={`form-control ${errors.Id_Responsable ? 'is-invalid' : ''}`}
              id="Id_Responsable"
              name="Id_Responsable"
              value={formData.Id_Responsable}
              onChange={handleChange}
            >
              <option value="">Seleccione un responsable</option>
              {responsables.map((responsable) => (
                <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
                  {responsable.Nom_Responsable} - {responsable.Tip_Responsable}
                </option>
              ))}
            </select>
          </div>

        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary">
            {buttonForm}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUsuario;