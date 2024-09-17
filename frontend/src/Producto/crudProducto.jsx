// CrudProducto.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import FormProducto from './formProducto';  
import Sidebar from '../Sidebar/Sidebar';
import Swal from 'sweetalert2';


const URI = (process.env.SERVER_BACK || 'http://localhost:3002') + '/producto/';

const CrudProducto = () => {
    const [productoList, setProductoList] = useState([]);
    const [buttonForm, setButtonForm] = useState('Enviar');
    const [producto, setProducto] = useState({
        Id_Producto: '',
        Nom_Producto: '',
        Car_Producto: '',
        Pre_Promedio: '',
        Exi_Producto: '',
        Ima_Producto: '',
        Fec_Vencimiento: '',
        Id_Categoria: '',
        Pre_Anterior: '',
        Uni_DeMedida: '',
        Pre_Producto: ''
    });

    useEffect(() => {
        getAllProducto();
    }, []);

    const getAllProducto = async () => {
        try {
            const respuesta = await axios.get(URI);
            setProductoList(Array.isArray(respuesta.data) ? respuesta.data : []);
        } catch (error) {
            alert(error.response?.data?.message || "Error al obtener los Productos");
        }
    };

    const getProducto = async (Id_Producto) => {
        setButtonForm('Actualizar');
        const respuesta = await axios.get(URI + Id_Producto);
        setProducto({
            ...respuesta.data
        });
    };

    const updateTextButton = (texto) => {
        setButtonForm(texto);
    };

    const deleteProducto = (Id_Producto) => {
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
                await axios.delete(URI + Id_Producto);
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El registro ha sido borrado.",
                    icon: "success"
                });
                getAllProducto(); // Refrescar la lista después de eliminar
            }
        });
    };

    const handleSuccess = () => {
        getAllProducto(); // Actualizar la lista de productos
    };

    const titles = ['Código', 'Nombre Producto', 'Descripción', 'Precio Promedio', 'Existencia', 'Imagen', 'Fecha Vencimiento', 'Categoría', 'Precio Anterior', 'Unidad de Medida', 'Precio Producto', 'Acciones'];
    const data = productoList.map(producto => [
        producto.Id_Producto,
        producto.Nom_Producto,
        producto.Car_Producto,
        producto.Pre_Promedio,
        producto.Exi_Producto,
        producto.Ima_Producto,
        producto.Fec_Vencimiento,
        producto.Id_Categoria,
        producto.Pre_Anterior,
        producto.Uni_DeMedida,
        producto.Pre_Producto,
        <div>
            <button className="btn btn-warning" onClick={() => getProducto(producto.Id_Producto)}>Editar</button>
            <button className="btn btn-danger" onClick={() => deleteProducto(producto.Id_Producto)}>Borrar</button>
        </div>
    ]);

    return (
        <>
            <center><h1>Gestionar Productos</h1></center>
            <Sidebar />
            <WriteTable titles={titles} data={data} />
            <hr />
            <FormProducto buttonForm={buttonForm} producto={producto} URI={URI} updateTextButton={updateTextButton} onSuccess={handleSuccess} />
        </>
    );
};

export default CrudProducto;
