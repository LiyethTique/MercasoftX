import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormCliente = ({ buttonForm, cliente, URI, updateTextButton, setIsFormVisible, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Cliente: '',
    Cor_Cliente: '',
    Tel_Cliente: '',
    Id_Carrito: ''
  });

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que el número de teléfono tenga exactamente 10 dígitos y empiece con '3'
    if (!/^(3\d{9})$/.test(formData.Tel_Cliente)) {
      Swal.fire({
        icon: 'info',
        title: 'Número de Teléfono Inválido',
        text: 'El número de teléfono debe tener exactamente 10 dígitos y comenzar con 3.',
      });
      return;
    }

    // Validar que se hayan hecho cambios en el formulario
    if (!isModified) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin Cambios',
        text: 'Debe realizar al menos un cambio en el formulario para actualizar el registro.',
      });
      return;
    }

    // Si pasa las validaciones, llamar a onSubmit
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="Nom_Cliente" className="form-label">Nombre Cliente</label>
        <input
          type="text"
          className="form-control"
          id="Nom_Cliente"
          name="Nom_Cliente"
          value={formData.Nom_Cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Cor_Cliente" className="form-label">Correo Cliente</label>
        <input
          type="email"
          className="form-control"
          id="Cor_Cliente"
          name="Cor_Cliente"
          value={formData.Cor_Cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Tel_Cliente" className="form-label">Teléfono Cliente</label>
        <input
          type="text" // Cambiado a text para permitir la validación personalizada
          className="form-control"
          id="Tel_Cliente"
          name="Tel_Cliente"
          value={formData.Tel_Cliente}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              handleChange(e);
            }
          }}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Carrito" className="form-label">ID Carrito</label>
        <input
          type="number"
          className="form-control"
          id="Id_Carrito"
          name="Id_Carrito"
          value={formData.Id_Carrito}
          onChange={handleChange}
        />
      </div>

      {/* Botón de enviar o actualizar alineado a la izquierda */}
      <div className="d-flex justify-content-start">
        <button type="submit" className="btn btn-primary" disabled={!isModified}>
          {buttonForm}
        </button>
      </div>
    </form>
  );
};

export default FormCliente;