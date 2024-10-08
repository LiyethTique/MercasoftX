import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const FormCliente = ({ buttonForm, cliente, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Nom_Cliente: '',
    Cor_Cliente: '',
    Tel_Cliente: '',
  });

  const [initialData, setInitialData] = useState({
    Nom_Cliente: '',
    Cor_Cliente: '',
    Tel_Cliente: '',
  });

  const [errors, setErrors] = useState({
    Nom_Cliente: '',
    Cor_Cliente: '',
    Tel_Cliente: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado para controlar el envío

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
      setInitialData(cliente); // Guardar los datos iniciales
    }
  }, [cliente]);

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

    if (name === 'Tel_Cliente') {
      const onlyNumbers = value.replace(/\D/g, '').slice(0, 10); // Limita a 10 dígitos
      if (onlyNumbers.startsWith('3')) {
        setFormData({ ...formData, [name]: formatPhoneNumber(onlyNumbers) });
        if (errors.Tel_Cliente) {
          setErrors({ ...errors, Tel_Cliente: '' });
        }
      } else {
        setErrors({ ...errors, Tel_Cliente: 'El número de teléfono debe comenzar con 3.' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Nom_Cliente) newErrors.Nom_Cliente = 'El nombre es requerido.';
    if (!formData.Cor_Cliente) newErrors.Cor_Cliente = 'El correo es requerido.';
    if (!formData.Tel_Cliente) newErrors.Tel_Cliente = 'El teléfono es requerido.';

    if (formData.Cor_Cliente && !isValidEmail(formData.Cor_Cliente)) {
      newErrors.Cor_Cliente = 'Por favor, ingresa un correo electrónico válido de Gmail o Hotmail.';
    }

    const phoneOnlyNumbers = formData.Tel_Cliente.replace(/\D/g, '');
    if (formData.Tel_Cliente && !isValidPhone(phoneOnlyNumbers)) {
      newErrors.Tel_Cliente = 'El número de teléfono debe tener exactamente 10 dígitos y comenzar con 3.';
    }

    return newErrors;
  };

  const hasChanges = () => {
    return Object.keys(formData).some(key => formData[key] !== initialData[key]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Evitar múltiples envíos mientras se está procesando.

  

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true); // Bloquear el botón de enviar.

    try {
      await onSubmit(formData); // Realizar la solicitud al servidor.
      Swal.fire({
        icon: 'success',
        title: 'Cliente registrado exitosamente',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el cliente',
        text: 'Ocurrió un error al enviar los datos',
      });
    } finally {
      setIsSubmitting(false); // Liberar el botón después de finalizar el envío.
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose(); // Llama a la función de cierre pasada por props
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="mb-3">
        <label htmlFor="Nom_Cliente" className="form-label">Nombre</label>
        <input
          type="text"
          className={`form-control ${errors.Nom_Cliente ? 'is-invalid' : ''}`}
          id="Nom_Cliente"
          name="Nom_Cliente"
          value={formData.Nom_Cliente}
          onChange={handleChange}
        />
        {errors.Nom_Cliente && <div className="invalid-feedback">{errors.Nom_Cliente}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Cor_Cliente" className="form-label">Correo</label>
        <input
          type="email"
          className={`form-control ${errors.Cor_Cliente ? 'is-invalid' : ''}`}
          id="Cor_Cliente"
          name="Cor_Cliente"
          value={formData.Cor_Cliente}
          onChange={handleChange}
        />
        {errors.Cor_Cliente && <div className="invalid-feedback">{errors.Cor_Cliente}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Tel_Cliente" className="form-label">Teléfono</label>
        <input
          type="text"
          className={`form-control ${errors.Tel_Cliente ? 'is-invalid' : ''}`}
          id="Tel_Cliente"
          name="Tel_Cliente"
          value={formData.Tel_Cliente}
          onChange={handleChange}
          inputMode="numeric"
          pattern="\d*"
        />
        {errors.Tel_Cliente && <div className="invalid-feedback">{errors.Tel_Cliente}</div>}
      </div>
      <div className="mb-3 text-center">
        <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : buttonForm}
        </Button>
      </div>
    </div>
  );
};

export default FormCliente;
