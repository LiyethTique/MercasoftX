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
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        getAllCliente();
    }, []);

    const getAllCliente = async () => {
        try {
            const respuesta = await axios.get(URI);
            setClienteList(Array.isArray(respuesta.data) ? respuesta.data : []);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Error al obtener los Clientes",
                icon: "error"
            });
        }
    };

    const getCliente = async (Id_Cliente) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(`${URI}${Id_Cliente}`);
            setCliente(respuesta.data);
            setIsFormVisible(true);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error al obtener los detalles del cliente",
                icon: "error"
            });
        }
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
                try {
                    await axios.delete(`${URI}${Id_Cliente}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "El registro ha sido borrado.",
                        icon: "success"
                    });
                    getAllCliente();
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Error al borrar el cliente",
                        icon: "error"
                    });
                }
            }
        });
    };

    const handleSuccess = () => {
        getAllCliente();
        setIsFormVisible(false);
    };

    const titles = ['Código', 'Nombre Cliente', 'Correo Cliente', 'Teléfono Cliente', 'ID Carrito', 'Acciones'];
    const data = clienteList.map(cliente => [
        cliente.Id_Cliente,
        cliente.Nom_Cliente,
        cliente.Cor_Cliente,
        cliente.Tel_Cliente,
        cliente.Id_Carrito,
        <div key={cliente.Id_Cliente}>
            <button className="btn btn-warning" onClick={() => getCliente(cliente.Id_Cliente)}>Editar</button>
            <button className="btn btn-danger" onClick={() => deleteCliente(cliente.Id_Cliente)}>Borrar</button>
        </div>
    ]);

    const moduleName = "Gestionar Clientes";

    return (
        <>
            <center><h1>{moduleName}</h1></center>
            <Sidebar />
            <WriteTable titles={titles} data={data} />

            {isFormVisible && (
                <div className="modal fade show d-block" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{buttonForm === 'Actualizar' ? 'Editar Cliente' : 'Registrar Cliente'}</h5>
                                <button type="button" className="btn-close" onClick={() => setIsFormVisible(false)}></button>
                            </div>
                            <div className="modal-body">
                                <FormCliente
                                    buttonForm={buttonForm}
                                    cliente={cliente}  // Corregido para usar 'cliente'
                                    handleSuccess={handleSuccess}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CrudCliente;