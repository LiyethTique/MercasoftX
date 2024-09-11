import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import FormCarrito from './formCarrito';
import Sidebar from '../Sidebar/Sidebar'

import Swal from 'sweetalert2';

// Esta es la URI a la que se conectará el backend
const URI = process.env.SERVER_BACK + '/carrito/'; // Asegúrate de que esta variable esté configurada correctamente

const CrudCarrito = () => {
    const [carritoList, setCarritoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [carrito, setCarrito] = useState({
        Id_Carrito: '',
        Can_Producto: ''
    });

    useEffect(() => {
        getAllCarritos();
    }, []);

    const getAllCarritos = useCallback(async () => {
        try {
            const respuesta = await axios.get(URI);
            setCarritoList(respuesta.data);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Hubo un problema al obtener los carritos.',
                icon: 'error'
            });
        }
    }, []);

    const getCarrito = useCallback(async (idCarrito) => {
        setButtonForm('Actualizar');
        try {
            const respuesta = await axios.get(URI + idCarrito);
            setCarrito(respuesta.data);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Hubo un problema al obtener el carrito.',
                icon: 'error'
            });
        }
    }, []);

    const updateTextButton = (texto) => {
        setButtonForm(texto);
        if (texto === 'Enviar') {
            setCarrito({ Id_Carrito: '', Can_Producto: '' }); // Limpiar el estado del carrito si es necesario
        }
    };

    const deleteCarrito = async (idCarrito) => {
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
                    await axios.delete(URI + idCarrito);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "El registro ha sido borrado.",
                        icon: "success"
                    });
                    getAllCarritos(); // Refresh the list after deletion
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: error.response?.data?.message || 'Hubo un problema al borrar el carrito.',
                        icon: 'error'
                    });
                }
            }
        });
    };

    return (
        <>
        <Sidebar />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID Carrito</th>
                        <th>Can_Producto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {carritoList.map((carrito) => (
                        <tr key={carrito.Id_Carrito}>
                            <td>{carrito.Id_Carrito}</td>
                            <td>{carrito.Can_Producto}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => getCarrito(carrito.Id_Carrito)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => deleteCarrito(carrito.Id_Carrito)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormCarrito buttonForm={buttonForm} carrito={carrito} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryCarrito URI={URI} getCarrito={getCarrito} deleteCarrito={deleteCarrito} />
        </>
    );
};

export default CrudCarrito;