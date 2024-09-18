import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const FormEntrada = ({ buttonForm, entrada, URI, updateTextButton, setIsFormVisible, onSubmit }) => {
  const [formData, setFormData] = useState({
    Fec_Entrada: '',
    Hor_Entrada: '',
    Id_Unidad: '',
    Id_Producto: '',
    Id_Responsable: '',
    Can_Entrada: '',
    Fec_Vencimiento: ''
  });

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (entrada) {
      setFormData(entrada);
    }
  }, [entrada]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        <label htmlFor="Fec_Entrada" className="form-label">Fecha de Entrada</label>
        <input
          type="date"
          className="form-control"
          id="Fec_Entrada"
          name="Fec_Entrada"
          value={formData.Fec_Entrada}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Hor_Entrada" className="form-label">Hora de Entrada</label>
        <input
          type="time"
          className="form-control"
          id="Hor_Entrada"
          name="Hor_Entrada"
          value={formData.Hor_Entrada}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Unidad" className="form-label">Nombre de la Unidad</label>
        <input
          type="text"
          className="form-control"
          id="Id_Unidad"
          name="Id_Unidad"
          value={formData.Id_Unidad}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Producto" className="form-label">Nombre del Producto</label>
        <input
          type="text"
          className="form-control"
          id="Id_Producto"
          name="Id_Producto"
          value={formData.Id_Producto}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Responsable" className="form-label">Nombre del Responsable</label>
        <input
          type="text"
          className="form-control"
          id="Id_Responsable"
          name="Id_Responsable"
          value={formData.Id_Responsable}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Can_Entrada" className="form-label">Cantidad Entrada</label>
        <input
          type="number"
          className="form-control"
          id="Can_Entrada"
          name="Can_Entrada"
          value={formData.Can_Entrada}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Fec_Vencimiento" className="form-label">Fecha de Vencimiento</label>
        <input
          type="date"
          className="form-control"
          id="Fec_Vencimiento"
          name="Fec_Vencimiento"
          value={formData.Fec_Vencimiento}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-start">
        <button type="submit" className="btn btn-primary" disabled={!isModified}>
          {buttonForm}
        </button>
      </div>
    </form>
  );
};

export default FormEntrada;