import axios from 'axios'; // Corrección en el import
import { useState, useEffect } from 'react';
import FormVenta from './FormVenta';
import FormQueryVenta from './FormQueryVenta';
import Swal from 'sweetalert2';

// Asegúrate de que la variable de entorno esté correctamente definida
const URI = process.env.SERVER_BACK + "/venta/";
console.log(URI);

const CrudVenta = () => {
    const [ventaList, setVentaList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [venta, setVenta] = useState({
        Id_Venta: '',
        Fec_Venta: '',
        Can_Venta: '',
        Val_Venta: ''
    });

    useEffect(() => {
        getAllVenta();
    }, []);

    const getAllVenta = async () => {
        try {
            const respuesta = await axios.get(URI);
            setVentaList(respuesta.data);
        } catch (error) {
            console.error("Error fetching ventas:", error);
            Swal.fire({
                title: "Error",
                text: error.response ? error.response.data.message : "No response received from server. Please check your backend.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const getVenta = async (idVenta) => {
        setButtonForm('Actualizar');
        console.log('idVenta: ' + idVenta);
        try {
            const respuesta = await axios.get(`${URI}${idVenta}`);
            console.log(respuesta.data);
            setVenta(respuesta.data); // Suponiendo que respuesta.data es un objeto de venta
        } catch (error) {
            console.error("Error fetching venta:", error);
            Swal.fire({
                title: "Error",
                text: "Could not fetch venta data.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const updateVenta = async () => {
        try {
            const { Id_Venta } = venta; // Asegúrate de que estás utilizando la propiedad correcta
            await axios.put(`${URI}${Id_Venta}`, venta);
            Swal.fire({
                title: "¡Actualizado!",
                text: "El registro ha sido actualizado.",
                icon: "success"
            });
            getAllVenta();

            setVenta({
                Id_Venta: '',
                Fec_Venta: '',
                Can_Venta: '',
                Val_Venta: ''
            });
            setButtonForm('Enviar');
        } catch (error) {
            console.error("Error updating venta", error);
            Swal.fire({ // Corrección de Swal.Fire a Swal.fire
                title: "Error de Servidor",
                text: error.response ? error.response.data.message : "No se recibió respuesta del servidor. Intentelo nuevamente.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    const deleteVenta = async (idVenta) => {
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
                    await axios.delete(`${URI}${idVenta}`);
                    Swal.fire({
                        title: "¡Borrado!",
                        text: "El registro ha sido borrado.",
                        icon: "success"
                    });
                    getAllVenta(); // Refrescar la lista de ventas después de borrar
                } catch (error) {
                    console.error("Error deleting venta:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Could not delete venta.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                }
            }
        });
    };

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha Venta</th>
                        <th>Cantidad Venta</th>
                        <th>Valor Venta</th>
                        <th>Codigo Pedido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventaList.map((venta) => (
                        <tr key={venta.Id_Venta}>
                            <td>{venta.Id_Venta}</td>
                            <td>{venta.Fec_Venta}</td>
                            <td>{venta.Can_Venta}</td>
                            <td>{venta.Val_Venta}</td>
                            <td>{venta.Id_Pedido}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => getVenta(venta.Id_Venta)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => deleteVenta(venta.Id_Venta)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FormVenta buttonForm={buttonForm} venta={venta} URI={URI} updateTextButton={updateTextButton} />
            <hr />
            <FormQueryVenta URI={URI} getVenta={getVenta} deleteVenta={deleteVenta} updateVenta={updateVenta} buttonForm={buttonForm} />
        </>
    );
};

export default CrudVenta;
