import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FormCliente = ({ buttonForm, cliente = {}, handleSuccess }) => {
    // Cambia la URI del backend según sea necesario
    const URI = process.env.SERVER_BACK || 'http://localhost:3002' + '/cliente/';

    const [clienteData, setClienteData] = useState({
        Nom_Cliente: '',
        Cor_Cliente: '',
        Tel_Cliente: '',
        Id_Carrito: ''
    });

    useEffect(() => {
        // Solo actualiza si los datos del cliente han cambiado
        setClienteData(prevData => {
            const newClienteData = {
                Nom_Cliente: cliente.Nom_Cliente || '',
                Cor_Cliente: cliente.Cor_Cliente || '',
                Tel_Cliente: cliente.Tel_Cliente || '',
                Id_Carrito: cliente.Id_Carrito || ''
            };
            // Compara el estado previo con el nuevo estado para evitar actualizaciones innecesarias
            if (JSON.stringify(prevData) !== JSON.stringify(newClienteData)) {
                return newClienteData;
            }
            return prevData;
        });
    }, [cliente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClienteData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (buttonForm === 'Actualizar') {
                if (!cliente.Id_Cliente) {
                    throw new Error("ID de cliente no proporcionado.");
                }
                await axios.put(`${URI}${cliente.Id_Cliente}`, clienteData);
                Swal.fire({
                    title: "¡Actualizado!",
                    text: "El cliente ha sido actualizado exitosamente.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                });
            } else {
                await axios.post(URI, clienteData);
                Swal.fire({
                    title: "¡Creado!",
                    text: "El cliente ha sido creado exitosamente.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                });
            }
            handleSuccess(); // Refrescar datos en el componente padre
            clearForm(); // Limpiar formulario después de la operación
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Error al guardar el cliente",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK"
            });
        }
    };

    const clearForm = () => {
        setClienteData({
            Nom_Cliente: '',
            Cor_Cliente: '',
            Tel_Cliente: '',
            Id_Carrito: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="Nom_Cliente" className="form-label">Nombre Cliente</label>
                <input
                    type="text"
                    className="form-control"
                    id="Nom_Cliente"
                    name="Nom_Cliente"
                    value={clienteData.Nom_Cliente || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="Cor_Cliente" className="form-label">Correo Cliente</label>
                <input
                    type="email"
                    className="form-control"
                    id="Cor_Cliente"
                    name="Cor_Cliente"
                    value={clienteData.Cor_Cliente || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="Tel_Cliente" className="form-label">Teléfono Cliente</label>
                <input
                    type="text"
                    className="form-control"
                    id="Tel_Cliente"
                    name="Tel_Cliente"
                    value={clienteData.Tel_Cliente || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="Id_Carrito" className="form-label">ID Carrito</label>
                <input
                    type="number"
                    className="form-control"
                    id="Id_Carrito"
                    name="Id_Carrito"
                    value={clienteData.Id_Carrito || ''}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">{buttonForm}</button>
        </form>
    );
};

export default FormCliente;