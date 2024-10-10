import React, { useState } from 'react';
import axios from 'axios';

const VentaForm = () => {
    const [venta, setVenta] = useState({
        Fec_Venta: '',
        Val_Venta: '',
        Tip_Cliente: '',
        Id_Pedido: '',
        Id_Producto: ''
    });

    const handleChange = (e) => {
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/ventas', venta);
            alert('Venta creada exitosamente');
            console.log(response.data);
        } catch (error) {
            console.error('Error al crear la venta:', error);
            alert('Error al crear la venta');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Fecha de Venta:</label>
                <input type="date" name="Fec_Venta" value={venta.Fec_Venta} onChange={handleChange} required />
            </div>
            <div>
                <label>Valor de Venta:</label>
                <input type="number" step="0.01" name="Val_Venta" value={venta.Val_Venta} onChange={handleChange} required />
            </div>
            <div>
                <label>Tipo de Cliente:</label>
                <input type="text" name="Tip_Cliente" value={venta.Tip_Cliente} onChange={handleChange} required />
            </div>
            <div>
                <label>ID del Pedido:</label>
                <input type="number" name="Id_Pedido" value={venta.Id_Pedido} onChange={handleChange} required />
            </div>
            <div>
                <label>ID del Producto:</label>
                <input type="number" name="Id_Producto" value={venta.Id_Producto} onChange={handleChange} required />
            </div>
            <button type="submit">Crear Venta</button>
        </form>
    );
};

export default VentaForm;
