// src/Area/FormArea.jsx

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './formArea.css';

const FormArea = ({ formData, onInputChange, onSubmit, buttonForm, errors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const areaOptions = [
    { value: '', label: 'Selecciona uno' },
    { value: 'Agroindustria', label: 'AgroIndustria' },
    { value: 'Pecuaria', label: 'Pecuaria' },
    { value: 'Agricola', label: 'Agricola' },
    { value: 'Gestion Ambiental', label: 'Gestion Ambiental' },
  ];

  const handleSelect = (value) => {
    onInputChange({ target: { name: 'Nom_Area', value } });
    setIsOpen(false);
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="Nom_Area" className="form-label">Nombre del Área</label>
        <div className={`select-container ${errors.Nom_Area ? 'is-invalid' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <div className="selected">
            {formData.Nom_Area || 'Seleccione'}
            <span className={`arrow ${isOpen ? 'up' : 'down'}`}>&#9662;</span>
          </div>
          {isOpen && (
            <div className="options">
              {areaOptions.map((option) => (
                <div
                  key={option.value}
                  className="option"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {errors.Nom_Area && <div className="invalid-feedback">{errors.Nom_Area}</div>}
      </div>
      <div className="text-center">
        <Button variant="primary" onClick={onSubmit}>
          {buttonForm}
        </Button>
      </div>
    </>
  );
};

export default FormArea;
