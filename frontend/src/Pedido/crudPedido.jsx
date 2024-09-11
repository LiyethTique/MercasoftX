import axios from 'axios';
import { useState, useEffect } from 'react';
import FormPedido from '../Pedido/formPedido.jsx';
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import WriteTable from '../Tabla/Data-Table.jsx';

const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/pedido/';

const CrudPedido = () => {
    const [pedidoList, setPedidoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [pedido, setPedido] = useState({
        Id_Pedido: '',
        Fec_Pedido: '',
        Id_Cliente: '',
        Est_Pedido: '',
        Val_Pedido: ''
    });

    useEffect(() => {
        getAllPedido();
    }, []);

    const getAllPedido = async () => {
        try {
            const respuesta = await axios.get(URI);
            setPedidoList(Array.isArray(respuesta.data) ? respuesta.data : []);
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener los Pedidos");
        }
    };

    const getPedido = async (Id_Pedido) => {
        setButtonForm('Actualizar');
        const respuesta = await axios.get(URI + Id_Pedido);
        setPedido({
            ...respuesta.data
        });
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deletePedido = (Id_Pedido) => {
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
                await axios.delete(URI + Id_Pedido);
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
                getAllPedido(); // Refrescar la lista después de eliminar
            }
        });
    };

    const handleSuccess = () => {
        getAllPedido(); // Actualizar la lista de pedidos
    };

    const titles = ['Código', 'Fecha Pedido', 'ID Cliente', 'Estado Pedido', 'Valor Pedido', 'Acciones'];
    const data = pedidoList.map(pedido => [
        pedido.Id_Pedido,
        pedido.Fec_Pedido,
        pedido.Id_Cliente,
        pedido.Est_Pedido,
        pedido.Val_Pedido,
        <div>
            <button className="btn btn-warning" onClick={() => getPedido(pedido.Id_Pedido)}>Editar</button>
            <button className="btn btn-danger" onClick={() => deletePedido(pedido.Id_Pedido)}>Borrar</button>
        </div>
    ]);

    return (
        <>
            <center><h1>Gestionar Pedidos</h1></center>
            <Sidebar />
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormPedido buttonForm={buttonForm} pedido={pedido} URI={URI} updateTextButton={updateTextButton} onSuccess={handleSuccess} />
        </>
    );
};

export default CrudPedido;
