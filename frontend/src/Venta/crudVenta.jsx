import axios from 'axios';
import { useState, useEffect } from 'react';
import FormVenta from './formVenta';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table.jsx';

const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/venta/';

const CrudVenta = () => {
    const [ventaList, setVentaList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [venta, setVenta] = useState({
        Id_Venta: '',
        Fec_Venta: '',
        Val_Venta: '',
        Id_Pedido: ''
    });
    const [shouldRefresh, setShouldRefresh] = useState(true); // Estado adicional

    useEffect(() => {
        if (shouldRefresh) {
            getAllVenta();
            setShouldRefresh(false); // Restablece el estado
        }
    }, [shouldRefresh]); // Dependencia del estado shouldRefresh

    const getAllVenta = async () => {
        try {
            const respuesta = await axios.get(URI);
            setVentaList(Array.isArray(respuesta.data) ? respuesta.data : []);
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener las Ventas");
        }
    };

    const getVenta = async (Id_Venta) => {
        setButtonForm('Actualizar');
        const respuesta = await axios.get(URI + Id_Venta);
        setVenta({
            ...respuesta.data
        });
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteVenta = (Id_Venta) => {
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
                await axios.delete(URI + Id_Venta);
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
                setShouldRefresh(true); // Actualiza la lista después de eliminar
            }
        });
    };

    const handleSuccess = () => {
        setShouldRefresh(true); // Actualiza la lista después de crear o actualizar
    };

    const titles = ['Código', 'Fecha Venta', 'Valor Venta', 'Código Pedido', 'Acciones'];
    const data = ventaList.map(venta => [
        venta.Id_Venta,
        venta.Fec_Venta,
        venta.Val_Venta,
        venta.Id_Pedido,
        <div>
            <button className="btn btn-warning" onClick={() => getVenta(venta.Id_Venta)}>Editar</button>
            <button className="btn btn-danger" onClick={() => deleteVenta(venta.Id_Venta)}>Borrar</button>
        </div>
    ]);

    return (
        <>
            <center><h1>Gestionar Ventas</h1></center>
            <Sidebar />
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormVenta buttonForm={buttonForm} venta={venta} URI={URI} updateTextButton={updateTextButton} onSuccess={handleSuccess} />
        </>
    );
};

export default CrudVenta;