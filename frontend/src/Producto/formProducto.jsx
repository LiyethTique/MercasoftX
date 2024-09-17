import React, { useState, useEffect } from 'react';

const FormProducto = ({ buttonForm, producto, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Producto: '',
    Car_Producto: '',
    Pre_Promedio: '',
    Exi_Producto: '',
    Ima_Producto: '',
    Fec_Vencimiento: '',
    Id_Categoria: '',
    Pre_Anterior: '',
    Uni_DeMedida: '',
    Pre_Producto: ''
  });

  useEffect(() => {
    if (producto) {
      setFormData(producto);
    }
  }, [producto]);

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
        <label htmlFor="Nom_Producto" className="form-label">Nombre del Producto</label>
        <input
          type="text"
          className="form-control"
          id="Nom_Producto"
          name="Nom_Producto"
          value={formData.Nom_Producto}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Car_Producto" className="form-label">Descripción</label>
        <input
          type="text"
          className="form-control"
          id="Car_Producto"
          name="Car_Producto"
          value={formData.Car_Producto}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Pre_Promedio" className="form-label">Precio Promedio</label>
        <input
          type="number"
          className="form-control"
          id="Pre_Promedio"
          name="Pre_Promedio"
          value={formData.Pre_Promedio}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Exi_Producto" className="form-label">Existencias</label>
        <input
          type="number"
          className="form-control"
          id="Exi_Producto"
          name="Exi_Producto"
          value={formData.Exi_Producto}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Ima_Producto" className="form-label">Imagen del Producto</label>
        <input
          type="text"
          className="form-control"
          id="Ima_Producto"
          name="Ima_Producto"
          value={formData.Ima_Producto}
          onChange={handleChange}
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
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Categoria" className="form-label">Categoría</label>
        <input
          type="number"
          className="form-control"
          id="Id_Categoria"
          name="Id_Categoria"
          value={formData.Id_Categoria}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Pre_Anterior" className="form-label">Precio Anterior</label>
        <input
          type="number"
          className="form-control"
          id="Pre_Anterior"
          name="Pre_Anterior"
          value={formData.Pre_Anterior}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Uni_DeMedida" className="form-label">Unidad de Medida</label>
        <input
          type="text"
          className="form-control"
          id="Uni_DeMedida"
          name="Uni_DeMedida"
          value={formData.Uni_DeMedida}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Pre_Producto" className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          id="Pre_Producto"
          name="Pre_Producto"
          value={formData.Pre_Producto}
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

export default FormProducto;
