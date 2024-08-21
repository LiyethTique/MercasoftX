import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormPedido from './FormPedido';
import FormQueryPedido from './FormQueryPedido';

const CrudPedido = () => {
    const [pedidos, setPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        const response = await axios.get('https://tu-api.com/pedidos'); // Reemplaza con tu URL de la API
        setPedidos(response.data);
    };

    const handleCreateOrUpdate = async (pedido) => {
        if (selectedPedido) {
            await axios.put(`https://tu-api.com/pedidos/${selectedPedido.Id_Pedido}`, pedido);
        } else {
            await axios.post('https://tu-api.com/pedidos', pedido);
        }
        fetchPedidos();
        setSelectedPedido(null);
    };

    const handleEdit = (pedido) => {
        setSelectedPedido(pedido);
    };

    const handleDelete = async (id) => {
        await axios.delete(`https://tu-api.com/pedidos/${id}`);
        fetchPedidos();
    };

    return (
        <div>
            <h1>Gestión de Pedidos</h1>
            <FormPedido onSubmit={handleCreateOrUpdate} pedido={selectedPedido} />
            <FormQueryPedido pedidos={pedidos} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default CrudPedido;
