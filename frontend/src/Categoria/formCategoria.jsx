import React, { useState, useEffect } from 'react';

const categorias = {
  PORCINOS: [
    "Piensos y alimentos para cerdos",
    "Suplementos nutricionales",
    "Equipos de crianza",
    "Productos de salud animal",
    "Materiales de manejo y transporte"
  ],
  CAPRINOS: [
    "Piensos y alimentos para cabras",
    "Suplementos nutricionales",
    "Equipos de ordeño",
    "Productos de salud animal",
    "Materiales de manejo y transporte"
  ],
  CUNICULTURA: [
    "Piensos y alimentos para conejos",
    "Suplementos nutricionales",
    "Equipos de crianza",
    "Productos de salud animal",
    "Materiales de manejo y transporte"
  ],
  AVICULTURA: [
    "Piensos y alimentos para aves",
    "Suplementos nutricionales",
    "Equipos de incubación",
    "Productos de salud animal",
    "Materiales de manejo y transporte"
  ],
  GANADERIA: [
    "Piensos y alimentos para ganado",
    "Suplementos nutricionales",
    "Equipos de ordeño",
    "Productos de salud animal",
    "Materiales de manejo y transporte"
  ],
  OVINOS: [
    "Piensos y alimentos para ovejas",
    "Suplementos nutricionales",
    "Equipos de manejo y esquila",
    "Productos de salud animal",
    "Materiales de manejo y transporte"
  ],
  PISCICULTURA: [
    "Piensos y alimentos para peces",
    "Suplementos nutricionales",
    "Equipos de cultivo acuático",
    "Productos de salud animal",
    "Materiales de manejo y transporte"
  ],
  APICULTURA: [
    "Piensos y alimentos para abejas",
    "Suplementos nutricionales",
    "Equipos de cosecha de miel",
    "Productos de salud de las abejas",
    "Materiales de manejo y transporte"
  ],
  PLANTA_CONCENTRADOS: [
    "Concentrados de alimentos",
    "Suplementos nutricionales",
    "Equipos de procesamiento",
    "Ingredientes para mezclas",
    "Materiales de empaque"
  ],
  LABORATORIO_REPRODUCCION_BOVINA: [
    "Equipos de inseminación artificial",
    "Suplementos reproductivos",
    "Productos de salud reproductiva",
    "Equipos de diagnóstico",
    "Materiales de laboratorio"
  ]
};

const FormCategoria = ({ buttonForm, categoria, URI, updateTextButton, setIsFormVisible, onSubmit }) => {
  const [categoriaPrincipal, setCategoriaPrincipal] = useState('');
  const [subcategoria, setSubcategoria] = useState('');

  const handleCategoriaChange = (e) => {
    setCategoriaPrincipal(e.target.value);
    setSubcategoria(''); // Reset subcategoría al cambiar la categoría principal
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ Nom_Categoria: subcategoria });
  };

  useEffect(() => {
    if (categoria && categoria.Nom_Categoria) {
      // Encuentra la categoría principal y subcategoría
      for (const [key, values] of Object.entries(categorias)) {
        if (values.includes(categoria.Nom_Categoria)) {
          setCategoriaPrincipal(key);
          setSubcategoria(categoria.Nom_Categoria);
          break;
        }
      }
    }
  }, [categoria]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="categoriaPrincipal" className="form-label">Categoría Principal</label>
        <select
          id="categoriaPrincipal"
          className="form-control"
          value={categoriaPrincipal}
          onChange={handleCategoriaChange}
          required
        >
          <option value="">Seleccionar...</option>
          {Object.keys(categorias).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="subcategoria" className="form-label">Subcategoría</label>
        <select
          id="subcategoria"
          className="form-control"
          value={subcategoria}
          onChange={(e) => setSubcategoria(e.target.value)}
          required
          disabled={!categoriaPrincipal}
        >
          <option value="">Seleccionar...</option>
          {categoriaPrincipal && categorias[categoriaPrincipal].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormCategoria;