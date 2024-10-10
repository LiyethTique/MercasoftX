import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VentaForm from './formVenta';

const CrudVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [venta, setVenta] = useState({
        Fec_Venta: '',
        Val_Venta: '',
        Tip_Cliente: '',
        Id_Pedido: '',
        Id_Producto: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentVentaId, setCurrentVentaId] = useState(null);

    // Obtener todas las ventas
    const fetchVentas = async () => {
        try {
            const response = await axios.get('/api/ventas');
            setVentas(response.data);
        } catch (error) {
            console.error('Error al obtener ventas:', error);
        }
    };

    useEffect(() => {
        fetchVentas();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        });
    };

    // Crear nueva venta
    const handleCreateVenta = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/ventas', venta);
            setVentas([...ventas, response.data.venta]);
            setVenta({
                Fec_Venta: '',
                Val_Venta: '',
                Tip_Cliente: '',
                Id_Pedido: '',
                Id_Producto: ''
            });
            alert('Venta creada exitosamente');
        } catch (error) {
            console.error('Error al crear la venta:', error);
            alert('Error al crear la venta');
        }
    };

    // Editar venta
    const handleEditVenta = (venta) => {
        setVenta({
            Fec_Venta: venta.Fec_Venta,
            Val_Venta: venta.Val_Venta,
            Tip_Cliente: venta.Tip_Cliente,
            Id_Pedido: venta.Id_Pedido,
            Id_Producto: venta.Id_Producto
        });
        setIsEditing(true);
        setCurrentVentaId(venta.Id_Venta);
    };

    // Actualizar venta
    const handleUpdateVenta = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/ventas/${currentVentaId}`, venta);
            const updatedVentas = ventas.map((v) =>
                v.Id_Venta === currentVentaId ? response.data.updatedVenta : v
            );
            setVentas(updatedVentas);
            setVenta({
                Fec_Venta: '',
                Val_Venta: '',
                Tip_Cliente: '',
                Id_Pedido: '',
                Id_Producto: ''
            });
            setIsEditing(false);
            setCurrentVentaId(null);
            alert('Venta actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
            alert('Error al actualizar la venta');
        }
    };

    // Eliminar venta
    const handleDeleteVenta = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta venta?')) return;

        try {
            await axios.delete(`/api/ventas/${id}`);
            const updatedVentas = ventas.filter((v) => v.Id_Venta !== id);
            setVentas(updatedVentas);
            alert('Venta eliminada exitosamente');
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
            alert('Error al eliminar la venta');
        }
    };

    return (
        <div>
            <h1>{isEditing ? 'Editar Venta' : 'Crear Venta'}</h1>
            <form onSubmit={isEditing ? handleUpdateVenta : handleCreateVenta}>
                <div>
                    <label>Fecha de Venta:</label>
                    <input
                        type="date"
                        name="Fec_Venta"
                        value={venta.Fec_Venta}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Valor de Venta:</label>
                    <input
                        type="number"
                        step="0.01"
                        name="Val_Venta"
                        value={venta.Val_Venta}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tipo de Cliente:</label>
                    <input
                        type="text"
                        name="Tip_Cliente"
                        value={venta.Tip_Cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>ID del Pedido:</label>
                    <input
                        type="number"
                        name="Id_Pedido"
                        value={venta.Id_Pedido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>ID del Producto:</label>
                    <input
                        type="number"
                        name="Id_Producto"
                        value={venta.Id_Producto}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{isEditing ? 'Actualizar Venta' : 'Crear Venta'}</button>
            </form>

            <h2>Lista de Ventas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha de Venta</th>
                        <th>Valor de Venta</th>
                        <th>Tipo de Cliente</th>
                        <th>ID Pedido</th>
                        <th>ID Producto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((v) => (
                        <tr key={v.Id_Venta}>
                            <td>{v.Id_Venta}</td>
                            <td>{v.Fec_Venta}</td>
                            <td>{v.Val_Venta}</td>
                            <td>{v.Tip_Cliente}</td>
                            <td>{v.Id_Pedido}</td>
                            <td>{v.Id_Producto}</td>
                            <td>
                                <button onClick={() => handleEditVenta(v)}>Editar</button>
                                <button onClick={() => handleDeleteVenta(v.Id_Venta)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrudVentas;
