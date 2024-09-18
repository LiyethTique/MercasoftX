import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const FormResponsable = ({ buttonForm, responsable, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Nom_Responsable: '',
    Cor_Responsable: '',
    Tel_Responsable: '',
    Tip_Responsable: '',
    Tip_Genero: ''
  });

  const [initialData, setInitialData] = useState({
    Nom_Responsable: '',
    Cor_Responsable: '',
    Tel_Responsable: '',
    Tip_Responsable: '',
    Tip_Genero: ''
  });

  const [errors, setErrors] = useState({
    Nom_Responsable: '',
    Cor_Responsable: '',
    Tel_Responsable: '',
    Tip_Responsable: '',
    Tip_Genero: ''
  });

  useEffect(() => {
    if (responsable) {
      setFormData(responsable);
      setInitialData(responsable); // Guardar los datos iniciales
    }
  }, [responsable]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ['gmail.com', 'hotmail.com'];
    const domain = email.split('@')[1];
    return emailRegex.test(email) && validDomains.includes(domain);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^3\d{9}$/; // Debe comenzar con 3 y tener 10 dígitos
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return cleaned;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Tel_Responsable') {
      const onlyNumbers = value.replace(/\D/g, '').slice(0, 10); // Limita a 10 dígitos
      if (onlyNumbers.startsWith('3')) {
        setFormData({ ...formData, [name]: formatPhoneNumber(onlyNumbers) });
        if (errors.Tel_Responsable) {
          setErrors({ ...errors, Tel_Responsable: '' });
        }
      } else {
        setErrors({ ...errors, Tel_Responsable: 'El número de teléfono debe comenzar con 3.' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Nom_Responsable) newErrors.Nom_Responsable = 'El nombre es requerido.';
    if (!formData.Cor_Responsable) newErrors.Cor_Responsable = 'El correo es requerido.';
    if (!formData.Tel_Responsable) newErrors.Tel_Responsable = 'El teléfono es requerido.';
    if (!formData.Tip_Responsable) newErrors.Tip_Responsable = 'El tipo de responsable es requerido.';
    if (!formData.Tip_Genero) newErrors.Tip_Genero = 'El género es requerido.';

    if (formData.Cor_Responsable && !isValidEmail(formData.Cor_Responsable)) {
      newErrors.Cor_Responsable = 'Por favor, ingresa un correo electrónico válido de Gmail o Hotmail.';
    }

    const phoneOnlyNumbers = formData.Tel_Responsable.replace(/\D/g, '');
    if (formData.Tel_Responsable && !isValidPhone(phoneOnlyNumbers)) {
      newErrors.Tel_Responsable = 'El número de teléfono debe tener exactamente 10 dígitos y comenzar con 3.';
    }

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
        <label htmlFor="Nom_Responsable" className="form-label">Nombre</label>
        <input
          type="text"
          className={`form-control ${errors.Nom_Responsable ? 'is-invalid' : ''}`}
          id="Nom_Responsable"
          name="Nom_Responsable"
          value={formData.Nom_Responsable}
          onChange={handleChange}
        />
        {errors.Nom_Responsable && <div className="invalid-feedback">{errors.Nom_Responsable}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Cor_Responsable" className="form-label">Correo</label>
        <input
          type="email"
          className={`form-control ${errors.Cor_Responsable ? 'is-invalid' : ''}`}
          id="Cor_Responsable"
          name="Cor_Responsable"
          value={formData.Cor_Responsable}
          onChange={handleChange}
        />
        {errors.Cor_Responsable && <div className="invalid-feedback">{errors.Cor_Responsable}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Tel_Responsable" className="form-label">Teléfono</label>
        <input
          type="text"
          className={`form-control ${errors.Tel_Responsable ? 'is-invalid' : ''}`}
          id="Tel_Responsable"
          name="Tel_Responsable"
          value={formData.Tel_Responsable}
          onChange={handleChange}
          inputMode="numeric"
          pattern="\d*"
        />
        {errors.Tel_Responsable && <div className="invalid-feedback">{errors.Tel_Responsable}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Tip_Responsable" className="form-label">Tipo de Responsable</label>
        <select
          name="Tip_Responsable"
          id="Tip_Responsable"
          className={`form-control ${errors.Tip_Responsable ? 'is-invalid' : ''}`}
          value={formData.Tip_Responsable}
          onChange={handleChange}
        >
          <option value="">Selecciona uno...</option>
          <option value="aprendiz">Aprendiz</option>
          <option value="instructor">Instructor</option>
        </select>
        {errors.Tip_Responsable && <div className="invalid-feedback">{errors.Tip_Responsable}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Tip_Genero" className="form-label">Género</label>
        <select
          name="Tip_Genero"
          id="Tip_Genero"
          className={`form-control ${errors.Tip_Genero ? 'is-invalid' : ''}`}
          value={formData.Tip_Genero}
          onChange={handleChange}
        >
          <option value="">Selecciona uno...</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
        {errors.Tip_Genero && <div className="invalid-feedback">{errors.Tip_Genero}</div>}
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

export default FormResponsable;
