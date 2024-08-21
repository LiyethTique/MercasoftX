// src/components/FormQueryCategoria.jsx
import React, { useState } from 'react';

const FormQueryCategoria = () => {
    const [query, setQuery] = useState("");

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
        // Aquí puedes agregar lógica para filtrar las categorías basadas en la consulta
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Buscar categorías..."
            />
        </div>
    );
};

export default FormQueryCategoria;
