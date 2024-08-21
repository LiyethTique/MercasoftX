import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormResponsable from './FormResponsables';
import FormQueryResponsable from './FormQueryResponsables';
 const URI = process.env.SERVER_BACK + '/responsables'
const CrudResponsable = () => {
    const [responsables, setResponsables] = useState([]);
    const [selectedResponsable, setSelectedResponsable] = useState(null);

    useEffect(() => {
        fetchResponsables();
    }, []);

    const fetchResponsables = async () => {
        const response = await axios.get(URI); // Reemplaza con tu URL de la API
        setResponsables(response.data);
    };

    const handleCreateOrUpdate = async (responsable) => {
        if (selectedResponsable) {
            await axios.put(`https://tu-api.com/responsables/${selectedResponsable.Id_Responsable}`, responsable);
        } else {
            await axios.post('https://tu-api.com/responsables', responsable);
        }
        fetchResponsables();
        setSelectedResponsable(null);
    };

    const handleEdit = (responsable) => {
        setSelectedResponsable(responsable);
    };

    const handleDelete = async (id) => {
        await axios.delete(`https://tu-api.com/responsables/${id}`);
        fetchResponsables();
    };

    return (
        <div>
            <h1>Gestión de Responsables</h1>
            <FormResponsable onSubmit={handleCreateOrUpdate} responsable={selectedResponsable} />
            <FormQueryResponsable responsables={responsables} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default CrudResponsable;
