import axios from 'axios';
import { useState, useEffect } from 'react';
import FormCliente from '../Cliente/formCliente.jsx';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table.jsx';

const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/cliente/';

const CrudCliente = () => {
    const [clienteList, setClienteList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [cliente, setCliente] = useState({
        Id_Cliente: '',
        Nom_Cliente: '',
        Cor_Cliente: '',
        Tel_Cliente: '',
        Id_Carrito: ''
    });

    useEffect(() => {
        getAllCliente();
    }, []);

    const getAllCliente = async () => {
        try {
            const respuesta = await axios.get(URI);
            setClienteList(Array.isArray(respuesta.data) ? respuesta.data : []);
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener los Clientes");
        }
    };

    const getCliente = async (Id_Cliente) => {
        setButtonForm('Actualizar');
        const respuesta = await axios.get(URI + Id_Cliente);
        setCliente({
            ...respuesta.data
        });
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteCliente = (Id_Cliente) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(URI + Id_Cliente);
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
                getAllCliente(); // Refrescar la lista después de eliminar
            }
        });
    };

    const handleSuccess = () => {
        getAllCliente(); // Actualizar la lista de clientes
    };

    const titles = ['Código', 'Nombre Cliente', 'Correo Cliente', 'Teléfono Cliente', 'ID Carrito', 'Acciones'];
    const data = clienteList.map(cliente => [
        cliente.Id_Cliente,
        cliente.Nom_Cliente,
        cliente.Cor_Cliente,
        cliente.Tel_Cliente,
        cliente.Id_Carrito,
        <div>
            <button className="btn btn-warning" onClick={() => getCliente(cliente.Id_Cliente)}>Editar</button>
            <button className="btn btn-danger" onClick={() => deleteCliente(cliente.Id_Cliente)}>Borrar</button>
        </div>
    ]);

    return (
        <>
            <center><h1>Gestionar Clientes</h1></center>
            <Sidebar />
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormCliente buttonForm={buttonForm} cliente={cliente} URI={URI} updateTextButton={updateTextButton} onSuccess={handleSuccess} />
        </>
    );
};

export default CrudCliente;
