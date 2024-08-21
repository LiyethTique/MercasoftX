// src/components/FormCategoria.jsx
import React, { useState } from 'react';

const FormCategoria = ({ onAddCategoria }) => {
    const [newCategoria, setNewCategoria] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCategoria(newCategoria);
        setNewCategoria("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newCategoria}
                onChange={(e) => setNewCategoria(e.target.value)}
                placeholder="Nombre de la categoría"
            />
            <button type="submit">Agregar Categoría</button>
        </form>
    );
};

export default FormCategoria;
