// src/components/crudCategoria.jsx
import React, { useEffect, useState } from 'react';
import categoriaService from '../services/categoriaService';
import categoriaController from '../controllers/categoriaController';
import FormCategoria from './FormCategoria';
import FormQueryCategoria from './FormQueryCategoria';

const CrudCategoria = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        categoriaController.fetchCategorias(setCategorias);
    }, []);

    const handleAddCategoria = async (nomCategoria) => {
        await categoriaController.addCategoria(nomCategoria, setCategorias);
    };

    const handleUpdateCategoria = async (id) => {
        const updatedNomCategoria = prompt("Ingrese el nuevo nombre de la categoría:");
        if (updatedNomCategoria) {
            await categoriaController.updateCategoria(id, updatedNomCategoria, setCategorias);
        }
    };

    const handleDeleteCategoria = async (id) => {
        await categoriaController.deleteCategoria(id, setCategorias);
    };

    return (
        <div>
            <h1>Categorías</h1>
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.Id_Categoria}>
                        {categoria.Nom_Categoria}
                        <button onClick={() => handleUpdateCategoria(categoria.Id_Categoria)}>Editar</button>
                        <button onClick={() => handleDeleteCategoria(categoria.Id_Categoria)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <FormCategoria onAddCategoria={handleAddCategoria} />
            <FormQueryCategoria />
        </div>
    );
};

export default CrudCategoria;
